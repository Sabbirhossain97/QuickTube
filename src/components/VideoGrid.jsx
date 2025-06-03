
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const API_KEY = "AIzaSyCJWTCNvoP3QfPQHyw1DqaFiStxP8ws__U";

const VideoGrid = ({ channelId, maxResults }) => {
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Latest Videos ({videos.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
