import {TableCell, TableRow, TableFooter} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useState, FormEvent, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

interface PaginationProps {
  columns: readonly unknown[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const Pagination = ({
  columns,
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) => {
  const [pageInput, setPageInput] = useState(currentPage.toString());
  const navigate = useNavigate();
  const location = useLocation();

  // Update pageInput when currentPage changes from parent component
  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  // Handle page change and update URL
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      // Get current query parameters and preserve them
      const searchParams = new URLSearchParams(location.search);
      // Update or add the page parameter
      searchParams.set('page', page.toString());

      // Update URL while preserving other query parameters
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });

      // Call parent handler
      onPageChange(page);
    }
  };

  const handlePageSubmit = (e: FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  // Initialize page from URL on component mount - also update to handle existing params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (
        !isNaN(page) &&
        page >= 1 &&
        page <= totalPages &&
        page !== currentPage
      ) {
        // Only call onPageChange, don't update URL here
        onPageChange(page);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={columns.length}>
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <form
              onSubmit={handlePageSubmit}
              className="flex items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Go to:
                </span>
                <Input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={pageInput}
                  onChange={e => setPageInput(e.target.value)}
                  className="w-12 h-8"
                  onBlur={() => {
                    if (pageInput === '')
                      setPageInput(currentPage.toString());
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!hasPrevPage}
                  type="button"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasNextPage}
                  type="button"
                >
                  Next
                </Button>
              </div>
            </form>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};
