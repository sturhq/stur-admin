import {TableCell, TableRow, TableFooter} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useState, FormEvent} from 'react';

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

  const handlePageSubmit = (e: FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

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
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={!hasPrevPage}
                  type="button"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage + 1)}
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
