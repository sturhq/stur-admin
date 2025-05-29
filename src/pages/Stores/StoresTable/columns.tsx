import {z} from 'zod';
import {Badge} from '@/components/ui/badge';
import {ColumnDef} from '@tanstack/react-table';
import {TableColumnHeader} from '@/components/organisms/GenericTable/TableColumnHeader';
import {Copy} from 'lucide-react';
import {toast} from '@/hooks/use-toast';
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
    accessorKey: 'storeUrl',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Stur Link" />
    ),
    cell: info => {
      const storeUrl = info.getValue() as string;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm">{storeUrl}</span>
          {storeUrl && (
            <span
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(storeUrl);
                toast({
                  description: 'Store link copied to clipboard',
                  variant: 'default',
                });
              }}
            >
              <Copy className="h-4 w-4" stroke="#5433EB" />
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({row}) => {
      const status = row.getValue('status') as
        | 'Active'
        | 'Pending'
        | 'Blocked'
        | 'Inactive';
      const statusMap = {
        Active: 'Active',
        Pending: 'Pending',
        Blocked: 'Blocked',
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
        Active: 'positive',
        Pending: 'negative',
        Blocked: 'destructive',
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
