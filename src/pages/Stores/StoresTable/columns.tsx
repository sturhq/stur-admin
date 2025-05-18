import {z} from 'zod';
import {Badge} from '@/components/ui/badge';
import {ColumnDef} from '@tanstack/react-table';
import {TableColumnHeader} from '@/components/organisms/GenericTable/TableColumnHeader';

export const tableSchema = z.object({
  storeName: z.string(),
  category: z.string(),
  phone: z.string(),
  sturLink: z.string(),
  status: z.enum(['completed', 'pending', 'blocked']),
  plan: z.enum(['premium', 'standard']),
});

type TableColumnType = z.infer<typeof tableSchema>;

export const columns: ColumnDef<TableColumnType>[] = [
  {
    accessorKey: 'storeName',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Store Name" />
    ),
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'category',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Category" />
    ),
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'phone',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Phone" />
    ),
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'sturLink',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Stur Link" />
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
        | 'completed'
        | 'pending'
        | 'blocked';
      const statusMap = {
        completed: 'Completed',
        pending: 'Pending',
        blocked: 'Blocked',
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
        completed: 'positive',
        pending: 'negative',
        blocked: 'destructive',
      };
      return (
        <Badge variant={variantMap[status]}>
          {statusMap[status].charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },

  {
    accessorKey: 'plan',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Plan" />
    ),
    cell: ({row}) => {
      const plan = row.getValue('plan') as 'premium' | 'standard';
      const planMap = {
        premium: 'Premium',
        standard: 'Standard',
      };
      const variantMap: Record<
        typeof plan,
        | 'positive'
        | 'negative'
        | 'destructive'
        | 'info'
        | 'outline'
        | 'default'
        | 'warning'
      > = {
        premium: 'info',
        standard: 'outline',
      };
      return (
        <Badge variant={variantMap[plan]}>
          {planMap[plan].charAt(0).toUpperCase() + plan.slice(1)}
        </Badge>
      );
    },
  },
];
