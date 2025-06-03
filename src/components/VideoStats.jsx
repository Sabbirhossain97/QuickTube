
const VideoStats = ({ filteredCount, totalCount, currentPage, totalPages }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-foreground">
        {filteredCount === totalCount 
          ? `Latest Videos (${filteredCount})`
          : `Filtered Videos (${filteredCount} of ${totalCount})`
        }
      </h2>
      {totalPages > 1 && (
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
      )}
    </div>
  );
};

export default VideoStats;
