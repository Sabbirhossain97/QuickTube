
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import SearchBar from "./SearchBar";
import DateFilter from "./DateFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const API_KEY = "AIzaSyCJWTCNvoP3QfPQHyw1DqaFiStxP8ws__U";
const ITEMS_PER_PAGE = 12;

const VideoGrid = ({ channelId, maxResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchChannelUploads = async () => {
    console.log("Fetching channel details for:", channelId);
    
    // First, get the uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
    );
    
    if (!channelResponse.ok) {
      throw new Error("Failed to fetch channel information");
    }
    
    const channelData = await channelResponse.json();
    console.log("Channel data:", channelData);
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error("Channel not found");
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    console.log("Uploads playlist ID:", uploadsPlaylistId);
    
    // Then, get the videos from the uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error("Failed to fetch videos");
    }
    
    const videosData = await videosResponse.json();
    console.log("Videos data:", videosData);
    
    return videosData.items || [];
  };

  const { data: videos, isLoading, error } = useQuery({
    queryKey: ["channelVideos", channelId, maxResults],
    queryFn: fetchChannelUploads,
    enabled: !!channelId,
  });

  // Filter and search videos
  const filteredVideos = useMemo(() => {
    if (!videos) return [];

    let filtered = videos;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
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
  }, [videos, searchTerm, dateRange]);

  // Pagination
  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useState(() => {
    setCurrentPage(1);
  }, [searchTerm, dateRange]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
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

  if (!videos || videos.length === 0) {
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
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <DateFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          {filteredVideos.length === videos.length 
            ? `Latest Videos (${filteredVideos.length})`
            : `Filtered Videos (${filteredVideos.length} of ${videos.length})`
          }
        </h2>
        {totalPages > 1 && (
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>
      
      {/* Video Grid */}
      {currentVideos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                          }}
                          isActive={currentPage === pageNum}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No videos found matching your search criteria. Try adjusting your filters.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default VideoGrid;
