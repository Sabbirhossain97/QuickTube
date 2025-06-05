import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import VideoFilters from "./VideoFilters";
import VideoStats from "./VideoStats";
import VideoList from "./VideoList";
import VideoPagination from "./VideoPagination";
import ChannelInfo from "./ChannelInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

const API_KEY = import.meta.env.VITE_API_KEY
const MAX_RESULTS = 50;
const ITEMS_PER_PAGE = 20;

const VideoGrid = ({ channelId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [allVideos, setAllVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isLoadingMoreVideos, setIsLoadingMoreVideos] = useState(false);

  const fetchChannelData = async () => {
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet,statistics&id=${channelId}&key=${API_KEY}`
    );

    if (!channelResponse.ok) {
      throw new Error("Failed to fetch channel information");
    }

    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error("Channel not found");
    }

    const channelInfo = channelData.items[0];
    const uploadsPlaylistId = channelInfo.contentDetails.relatedPlaylists.uploads;

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${MAX_RESULTS}&key=${API_KEY}`
    );

    if (!videosResponse.ok) {
      throw new Error("Failed to fetch videos");
    }

    const videosData = await videosResponse.json();

    setAllVideos(videosData.items || []);
    setNextPageToken(videosData.nextPageToken || null);

    return {
      channelInfo: channelInfo,
      videos: videosData.items || [],
      uploadsPlaylistId: uploadsPlaylistId
    };
  };

  const fetchMoreVideos = async (pageToken, uploadsPlaylistId) => {
    setIsLoadingMoreVideos(true);

    try {
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${MAX_RESULTS}&pageToken=${pageToken}&key=${API_KEY}`
      );

      if (!videosResponse.ok) {
        throw new Error("Failed to fetch more videos");
      }

      const videosData = await videosResponse.json();

      setAllVideos(prev => [...prev, ...(videosData.items || [])]);
      setNextPageToken(videosData.nextPageToken || null);
    } catch (error) {
      console.error("Error fetching more videos:", error);
    } finally {
      setIsLoadingMoreVideos(false);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["channelData", channelId],
    queryFn: fetchChannelData,
    enabled: !!channelId,
  });

  const channelInfo = data?.channelInfo || null;
  const uploadsPlaylistId = data?.uploadsPlaylistId || null;

  const filteredVideos = useMemo(() => {
    if (!allVideos) return [];

    let filtered = allVideos;

    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter(video => {
        const videoDate = new Date(video.snippet.publishedAt);

        if (dateRange.from && videoDate < dateRange.from) {
          return false;
        }

        if (dateRange.to) {
          const endOfDay = new Date(dateRange.to);
          endOfDay.setHours(23, 59, 59, 999);
          if (videoDate > endOfDay) {
            return false;
          }
        }
        return true;
      });
    }

    return filtered;
  }, [allVideos, searchTerm, dateRange]);

  const hasFilters = searchTerm || dateRange.from || dateRange.to;
  const filteredTotalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
  const totalChannelVideos = channelInfo ? parseInt(channelInfo.statistics.videoCount) : 0;
  const unfilteredTotalPages = Math.ceil(totalChannelVideos / ITEMS_PER_PAGE);
  const totalPages = hasFilters ? filteredTotalPages : unfilteredTotalPages;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  useEffect(() => {
    if (searchTerm || dateRange.from || dateRange.to) {
      setIsFiltering(true);
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, dateRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateRange]);

  useEffect(() => {
    setAllVideos([]);
    setNextPageToken(null);
    setCurrentPage(1);
  }, [channelId]);

  const handlePageChange = async (page) => {
    setIsPaginating(true);

    if (!hasFilters) {
      const requiredVideos = page * ITEMS_PER_PAGE;
      const availableVideos = allVideos.length;

      if (requiredVideos > availableVideos && nextPageToken && uploadsPlaylistId) {
        await fetchMoreVideos(nextPageToken, uploadsPlaylistId);
      }
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setIsPaginating(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-lg font-medium text-muted-foreground">Loading channel data...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error.message || "Failed to load videos. Please check the channel ID and try again."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!allVideos || allVideos.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No videos found for this channel.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {channelInfo && <ChannelInfo channelInfo={channelInfo} />}

      <VideoFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <VideoStats
        filteredCount={filteredVideos.length}
        totalCount={totalChannelVideos}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {isFiltering || isPaginating || isLoadingMoreVideos ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              {isFiltering ? "Filtering videos..." : isLoadingMoreVideos ? "Loading more videos..." : "Loading page..."}
            </p>
          </div>
        </div>
      ) : (
        <VideoList videos={currentVideos} />
      )}

      <VideoPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default VideoGrid;
