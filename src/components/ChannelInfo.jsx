
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Video, Eye } from "lucide-react";

const ChannelInfo = ({ channelInfo }) => {
  const { snippet, statistics } = channelInfo;
  
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-shrink-0">
            <img
              src={snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url}
              alt={snippet.title}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{snippet.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {snippet.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {formatNumber(statistics.subscriberCount)} subscribers
              </Badge>
              
              <Badge variant="secondary" className="flex items-center gap-1">
                <Video className="h-3 w-3" />
                {formatNumber(statistics.videoCount)} videos
              </Badge>
              
              <Badge variant="secondary" className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatNumber(statistics.viewCount)} views
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelInfo;
