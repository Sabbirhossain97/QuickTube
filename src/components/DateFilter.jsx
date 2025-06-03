
import { useState } from "react";
import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const DateFilter = ({ dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date, type) => {
    if (type === 'from') {
      onDateRangeChange({ ...dateRange, from: date });
    } else {
      onDateRangeChange({ ...dateRange, to: date });
    }
  };

  const clearDateRange = () => {
    onDateRangeChange({ from: null, to: null });
  };

  const hasDateFilter = dateRange.from || dateRange.to;

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            {hasDateFilter ? 'Date Range Set' : 'Filter by Date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">From Date</label>
                  <div className="mt-1">
                    <CalendarComponent
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => handleDateSelect(date, 'from')}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">To Date</label>
                  <div className="mt-1">
                    <CalendarComponent
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => handleDateSelect(date, 'to')}
                      className="rounded-md border"
                      disabled={(date) => dateRange.from && date < dateRange.from}
                    />
                  </div>
                </div>
                <Button onClick={() => setIsOpen(false)} className="w-full">
                  Apply Filter
                </Button>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
      
      {hasDateFilter && (
        <Button variant="ghost" size="sm" onClick={clearDateRange}>
          <X className="h-4 w-4" />
        </Button>
      )}
      
      {hasDateFilter && (
        <div className="text-sm text-muted-foreground">
          {dateRange.from && format(dateRange.from, 'MMM d, yyyy')}
          {dateRange.from && dateRange.to && ' - '}
          {dateRange.to && format(dateRange.to, 'MMM d, yyyy')}
        </div>
      )}
    </div>
  );
};

export default DateFilter;
