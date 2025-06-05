import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const ChannelInput = ({ setChannelId }) => {
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsSearching(true);
      setChannelId(inputValue.trim());
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  return (
    <Card className="w-full">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter YouTube Channel ID ..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full placeholder:text-sm"
                disabled={isSearching}
              />
            </div>
            <Button type="submit" className="px-6 transition duration-300 hover:bg-zinc-900/80 dark:hover:bg-zinc-300" disabled={isSearching}>
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
