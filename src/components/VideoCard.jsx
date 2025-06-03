
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const VideoCard = ({ video }) => {
  const { snippet } = video;
  const videoId = snippet.resourceId.videoId;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCardClick = () => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  // Get the highest quality thumbnail available
  const thumbnail = snippet.thumbnails.maxres || 
                   snippet.thumbnails.high || 
                   snippet.thumbnails.medium || 
                   snippet.thumbnails.default;

  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-card border-border"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={thumbnail.url}
            alt={snippet.title}
            className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Badge variant="secondary" className="bg-background/90">
              <ExternalLink className="h-3 w-3" />
            </Badge>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200">
            {snippet.title}
          </h3>
          
          <p className="text-xs text-muted-foreground">
            {formatDate(snippet.publishedAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
