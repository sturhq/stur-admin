import {z} from 'zod';
import {Badge} from '@/components/ui/badge';
import {ColumnDef} from '@tanstack/react-table';
import {TableColumnHeader} from '@/components/organisms/GenericTable/TableColumnHeader';
import {StoreData} from '.';
import {ellipsizeText} from '@/lib/utils';

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
    cell: info => {
      ellipsizeText(info.getValue() as string, 35);
    },
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
        | 'Unverified'
        | 'Blocked';
      const statusMap = {
        Verified: 'Verified',
        Unverified: 'Unverified',
        Blocked: 'Blocked',
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
        Unverified: 'warning',
        Blocked: 'destructive',
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
