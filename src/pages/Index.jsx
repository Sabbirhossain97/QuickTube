
import { useState } from "react";
import Header from "../components/Header";
import ChannelInput from "../components/ChannelInput";
import VideoGrid from "../components/VideoGrid";

const Index = () => {
  const [channelId, setChannelId] = useState("");
  const [maxResults, setMaxResults] = useState(25);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Discover YouTube Channels
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter a YouTube channel ID to browse all their videos
            </p>
          </div>
          
          <ChannelInput 
            channelId={channelId}
            setChannelId={setChannelId}
            maxResults={maxResults}
            setMaxResults={setMaxResults}
          />
          
          {channelId && (
            <VideoGrid 
              channelId={channelId} 
              maxResults={maxResults}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
