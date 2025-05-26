import React, {useEffect, useMemo} from 'react';
import {Badge} from '@/components/ui/badge';
import {ColumnDef} from '@tanstack/react-table';
import {TableColumnHeader} from '@/components/organisms/GenericTable/TableColumnHeader';
import {nigerianCurrencyFormat} from '@/lib/utils';
import ImageComponent from '@/components/organisms/ImageComponent.tsx';
import {useNavigate} from 'react-router-dom';
import {useIsMobile} from '@/hooks/use-mobile';
import emptyStateImage from '@/assets/images/transactionEmptyState.svg';
// import {gaRecordEvent} from '@/analytics';
import {z} from 'zod';
import {GenericTable} from '@/components/organisms/GenericTable';

export const productTableSchema = z.object({
  _id: z.string(),
  previewMedia: z.string(),
  title: z.string(),
  category: z.string(),
  menu: z.string(),
  stockQuantity: z.number(),
  status: z.enum(['published', 'draft', 'out-of-stock', 'unpublished']),
  price: z.number(),
});

type ProductTableType = z.infer<typeof productTableSchema>;

const renderVariant = (status: string) => {
  switch (status) {
    case 'published':
      return 'positive';
    case 'draft':
      return 'warning';
    case 'out-of-stock':
      return 'negative';
    case 'unpublished':
      return 'info';
    default:
      return 'outline';
  }
};

export const columns: ColumnDef<ProductTableType, unknown>[] = [
  {
    accessorKey: 'title',
    header: ({column}) => (
      <TableColumnHeader column={column} title="PRODUCT" />
    ),
    cell: ({row}) => {
      return (
        <div className="flex items-center gap-[0.8519rem] mr-[18rem]">
          <ImageComponent
            src={row.original.previewMedia}
            alt={row.original.title}
            className="w-[1.5625rem] h-[1.5625rem] !rounded-sm"
            imageClass="w-[1.5625rem] h-[1.5625rem] !rounded-sm"
            placeholderClass="w-[0.8rem]"
          />
          <span>{row.original.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({column}) => (
      <TableColumnHeader column={column} title="CATEGORY" />
    ),
    cell: ({row}) => row.original.category,
  },
  {
    accessorKey: 'stockQuantity',
    header: ({column}) => (
      <TableColumnHeader column={column} title="SOLD" />
    ),
    cell: ({row}) => row.original.stockQuantity,
  },
  {
    accessorKey: 'price',
    header: ({column}) => (
      <TableColumnHeader column={column} title="PRICE" />
    ),
    cell: ({row}) => nigerianCurrencyFormat(row.original.price),
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
      <TableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({row}) => {
      const status = row.original.status;
      const statusMap = {
        published: 'Published',
        draft: 'Draft',
        'out-of-stock': 'Out of stock',
        unpublished: 'Unpublished',
      };
      return (
        <Badge variant={renderVariant(status)}>{statusMap[status]}</Badge>
      );
    },
  },
];

type Props = {
  products: ProductTableType[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  refetch: () => void;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

const AllProducts = ({
  products,
  isLoading,
  page,
  totalPages,
  refetch,
  pageSize,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}: Props) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleRowClick = (row: ProductTableType) => {
    // gaRecordEvent('PRODUCT', 'product_clicked');
    navigate(`/products/product-detail/${row._id}`);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <React.Fragment>
      {isMobile ? (
        // <MobileProductTable
        //   className="mt-4 mb-16"
        //   data={products || []}
        //   isLoading={isLoading}
        //   totalPages={totalPages}
        //   onPageChange={onPageChange}
        //   pageSize={pageSize}
        //   hasNextPage={hasNextPage}
        //   currentPage={page}
        //   hasPrevPage={hasPrevPage}
        //   columns={columns}
        //   onRowClick={handleRowClick}
        //   emptyState={{
        //     title: 'No Transactions Yet',
        //     description: 'All transactions will be displayed here',
        //     imageSrc: (
        //       <img
        //         src={emptyStateImage}
        //         alt="Empty State"
        //         className="w-[6rem] object-cover"
        //       />
        //     ),
        //   }}
        // />
        <div></div>
      ) : (
        <GenericTable
          className="mt-4"
          data={products || []}
          columns={columns}
          onRowClick={row => handleRowClick(row)}
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      )}
    </React.Fragment>
  );
};

export default AllProducts;
