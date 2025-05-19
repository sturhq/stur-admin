import {z} from 'zod';
import {ColumnDef} from '@tanstack/react-table';
import {Badge} from '@/components/ui/badge';
import {TableColumnHeader} from '@/components/organisms/GenericTable/TableColumnHeader';
import ImageComponent from '@/components/organisms/ImageComponent.tsx';

export const tableSchema = z.object({
  previewMedia: z.string(),
  title: z.string(),
  category: z.string(),
  menu: z.string(),
  stockQuantity: z.number(),
  status: z.enum(['published', 'draft', 'out-of-stock']),
  price: z.number(),
});

type TableColumnType = z.infer<typeof tableSchema>;

export const columns: ColumnDef<TableColumnType>[] = [
  {
    accessorKey: 'title',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Product" />
    ),
    cell: ({row}) => {
      const title = row.getValue('title') as string;

      return (
        <div className="flex items-center gap-3">
          <ImageComponent
            src={row.original.previewMedia}
            alt="Product Image"
            className="w-[1.5625rem] h-[1.5625rem] !rounded-sm"
            imageClass="w-[1.5625rem] h-[1.5625rem] !rounded-sm"
            placeholderClass="w-[0.8rem]"
          />
          <span>{title}</span>
        </div>
      );
    },
  },

  {
    accessorKey: 'category',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Category" />
    ),
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'stockQuantity',
    header: ({column}) => (
      <TableColumnHeader column={column} title="In Stock" />
    ),
    cell: info => info.getValue(),
  },

  {
    accessorKey: 'price',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Price" />
    ),
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({row}) => {
      const status = row.getValue('status') as
        | 'published'
        | 'draft'
        | 'out-of-stock';
      const statusMap = {
        published: 'Published',
        draft: 'Draft',
        'out-of-stock': 'Out of Stock',
      };
      const variantMap: Record<
        typeof status,
        | 'positive'
        | 'negative'
        | 'destructive'
        | 'info'
        | 'outline'
        | 'default'
        | 'warning'
      > = {
        published: 'positive',
        draft: 'negative',
        'out-of-stock': 'destructive',
      };
      return (
        <Badge
          variant={variantMap[status as keyof typeof variantMap]}
          className="capitalize"
        >
          {statusMap[status]}
        </Badge>
      );
    },
  },
];
