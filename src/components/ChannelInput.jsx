
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const ChannelInput = ({ channelId, setChannelId }) => {
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsSearching(true);
      setChannelId(inputValue.trim());
      
      // Reset loading state after a short delay
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter YouTube Channel ID (e.g., UCJuZXwEbOO0umQCobhkTt_A)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full"
                disabled={isSearching}
              />
            </div>
            <Button type="submit" className="px-6" disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChannelInput;
