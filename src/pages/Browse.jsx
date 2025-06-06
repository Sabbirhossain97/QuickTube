
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "../components/Header";
import ChannelInput from "../components/ChannelInput";
import VideoGrid from "../components/VideoGrid";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";

const Browse = () => {
  const [channelId, setChannelId] = useState("");

  return (
    <ThemeProvider defaultTheme="light" storageKey="quicktube-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="w-full max-w-[1280px] mx-auto px-4 py-20 flex-1">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-foreground">
                  QuickTube Video Browser
                </h1>
                <p className="text-lg text-muted-foreground">
                  Filter and browse YouTube channel videos quickly with advanced search and date filtering
                </p>
              </div>

              <ChannelInput
                channelId={channelId}
                setChannelId={setChannelId}
              />

              {channelId && (
                <VideoGrid
                  channelId={channelId}
                />
              )}
            </div>
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default Browse;
