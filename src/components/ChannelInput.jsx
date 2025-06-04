
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChannelInput = ({ channelId, setChannelId, maxResults, setMaxResults }) => {
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
          
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-foreground">
              Max Results:
            </label>
            <Select 
              value={maxResults.toString()} 
              onValueChange={(value) => setMaxResults(parseInt(value))}
              disabled={isSearching}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChannelInput;
