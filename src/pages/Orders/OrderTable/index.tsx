import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';
import {useNavigate} from 'react-router-dom';

export type OrderData = {
  _id?: string;
  orderNumber?: string;
  status?: 'pending' | 'completed';
  customer?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  items?: number;
  vendor?: {
    _id?: string;
    name?: string;
  };
  totalAmount?: number;
  deliveryStatus?: 'pending' | 'delivered';
};

interface OrderProps {
  tableData: OrderData[];
  isLoading: boolean;
  pagination: {
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  page: number;
  setPage: (page: number) => void;
  limit: number;
  claimStatus?: 'Claimed' | 'Unclaimed';
  setClaimStatus?: (status: 'Claimed' | 'Unclaimed') => void;
}

const OrderTable = ({
  tableData,
  isLoading,
  pagination,
  page,
  setPage,
  limit,
  claimStatus,
  setClaimStatus,
}: OrderProps) => {
  const navigate = useNavigate();
  const orders = tableData || [];
  const {totalPages, hasNextPage, hasPrevPage} = pagination;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <GenericTable
      data={orders || []}
      columns={columns}
      pageSize={limit}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      showPagination
      isLoading={isLoading}
      className="!mt-0"
      emptyState={{
        title: 'No orders yet',
        description: 'All orders will be displayed here',
      }}
      customToolbar={
        <TableToolbar
          claimStatus={claimStatus}
          setClaimStatus={setClaimStatus}
        />
      }
      onRowClick={row => {
        navigate(`/order/summary/${row?._id}`);
      }}
    />
  );
};

export default OrderTable;
