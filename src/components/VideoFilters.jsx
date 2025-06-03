
import SearchBar from "./SearchBar";
import DateFilter from "./DateFilter";

const VideoFilters = ({ searchTerm, onSearchChange, dateRange, onDateRangeChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <DateFilter dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
    </div>
  );
};

export default VideoFilters;
