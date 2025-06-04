import {z} from 'zod';
import {Badge} from '@/components/ui/badge';
import {ColumnDef} from '@tanstack/react-table';
import {TableColumnHeader} from '@/components/organisms/GenericTable/TableColumnHeader';
import {StoreData} from '.';

export const tableSchema = z.object({
  storeName: z.string(),
  category: z.string(),
  phone: z.string(),
  storeUrl: z.string(),
  status: z.enum(['Active', 'pending', 'blocked']),
  plan: z.enum(['premium', 'standard']),
});

export const columns: ColumnDef<StoreData>[] = [
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
    cell: info =>
      (info.getValue() as string)
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase()),
  },
  {
    accessorKey: 'phoneNumber',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Phone" />
    ),
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Email" />
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
        | 'Verified'
        | 'Pending'
        | 'Inactive';
      const statusMap = {
        Verified: 'Verified',
        Pending: 'Pending',
        Inactive: 'Inactive',
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
        Verified: 'positive',
        Pending: 'warning',
        Inactive: 'default',
      };
      return (
        <Badge variant={variantMap[status]}>{statusMap[status]}</Badge>
      );
    },
  },

  {
    accessorKey: 'plan',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Plan" />
    ),
    cell: ({row}) => {
      const plan = row.getValue('plan') as 'Premium' | 'Standard';
      const planMap = {
        Premium: 'Premium',
        Standard: 'Standard',
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
        Premium: 'info',
        Standard: 'outline',
      };
      return <Badge variant={variantMap[plan]}>{planMap[plan]}</Badge>;
    },
  },
];
