
import { useState } from "react";
import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, startOfToday } from "date-fns";

const DateFilter = ({ dateRange, onDateRangeChange }) => {
  const today = startOfToday();
  const [isOpen, setIsOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const handleDateSelect = (date, type) => {
    if (type === 'from') {
      setTempDateRange({ ...tempDateRange, from: date });
    } else {
      setTempDateRange({ ...tempDateRange, to: date });
    }
  };

  const applyFilter = () => {
    onDateRangeChange(tempDateRange);
    setIsOpen(false);
  };

  const clearDateRange = () => {
    const clearedRange = { from: null, to: null };
    setTempDateRange(clearedRange);
    onDateRangeChange(clearedRange);
  };

  const hasDateFilter = dateRange.from || dateRange.to;
  console.log(dateRange)

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            {hasDateFilter ? 'Date Range Set' : 'Filter by Date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="top" avoidCollisions={false}>
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div>
                  <label className="text-sm font-medium">From Date</label>
                  <div className="mt-1">
                    <CalendarComponent
                      selected={tempDateRange.from}
                      onSelect={(date) => handleDateSelect(date, 'from')}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">To Date</label>
                  <div className="mt-1">
                    <CalendarComponent
                      selected={tempDateRange.to}
                      onSelect={(date) => handleDateSelect(date, 'to')}
                      className="rounded-md border"
                      disabled={(date) =>
                        (tempDateRange.from && date < tempDateRange.from) ||
                        date > today
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <Button onClick={applyFilter} className="w-[250px] mt-4">
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
