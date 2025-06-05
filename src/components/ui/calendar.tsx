import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import 'react-day-picker/dist/style.css';
import { startOfToday } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  ...props
}: CalendarProps) {
  const today = startOfToday();
  return (
    <DayPicker
      mode="single"
      className={cn("py-2 px-2", className)}
      animate
      startMonth={new Date(2004, 0)}
      showOutsideDays
      captionLayout="dropdown-years"
      weekStartsOn={0}
      disabled={{after: today}}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
