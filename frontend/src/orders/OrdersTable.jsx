import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdVerified } from "react-icons/md";
import { useGlobalContext } from "../context/context";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../redux/actions/orderActions";
import { showOrderDeleteAlert } from "../redux/slices/orderSlices";

export default function OrdersTable({ list }) {
  const { openOrderViewModal } = useGlobalContext();
  const dispatch = useDispatch();

  const handleViewOrder = (id) => {
    openOrderViewModal(id);
  };

  const handleDeleteOrder = (id) => {
    dispatch(showOrderDeleteAlert(id));
  };

  const handleUpdateStatus = (id) => {
    dispatch(updateOrderStatus(id));
  };

  const columns = [
    {
      field: "is_completed",
      headerName: "Order Status",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.is_completed ? (
              <div className='flex gap-2 items-center justify-center bg-slate-50 text-green-300 px-4 py-1 rounded font-semibold'>
                <MdVerified style={{ fontSize: "18px" }} />
                <h6 className='my-auto'>Completed</h6>
              </div>
            ) : (
              <button
                className='w-32 flex gap-2 items-center justify-center bg-slate-200 text-gray-600'
                onClick={() => handleUpdateStatus(params.row.id)}
              >
                Close
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "id",
      headerName: "Order NO",
      width: 100,
      renderCell: (params) => {
        return (
          <h6 className='text-gray-600 uppercase my-auto'>
            ORDER#{params.row.id}
          </h6>
        );
      },
    },
    {
      field: "table_no",
      headerName: "Table NO",
      width: 100,
      renderCell: (params) => {
        return (
          <h6 className='text-gray-600 uppercase my-auto'>
            {params.row.table_no === 0
              ? "Over C"
              : `TABLE#${params.row.table_no}`}
          </h6>
        );
      },
    },
    {
      field: "customer_name",
      headerName: "Customer",
      width: 100,
      renderCell: (params) => {
        return (
          <h6 className='text-gray-600 my-auto'>{params.row.customer_name}</h6>
        );
      },
    },
    {
      field: "order_details",
      headerName: "Order Details",
      width: 220,
      renderCell: (params) => {
        const order_desc = (params.row.orderItems || [])
          .map((item) => item.title)
          .join(", ");
        return <h6 className='text-gray-600 my-auto'>{order_desc}</h6>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      renderCell: (params) => {
        return (
          <h6 className='text-blue-300'>KES {params.row.amount.toFixed(2)}</h6>
        );
      },
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.payment_method === "MPESA" ? (
              <img
                src='/assets/mpesa.png'
                alt='mpesa'
                className='w-20 h-10 img-contain'
              />
            ) : (
              <h5 className='text-gray-600 uppercase text-center my-auto'>
                Cash
              </h5>
            )}
          </>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        return (
          <h6 className='bg-slate-100 px-2 py-1 rounded-md text-blue-300 my-auto'>
            {moment(params.row.created_at).fromNow()}
          </h6>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return (
          <div className='w-full flex gap-3'>
            <div className='border text-blue-300 cursor-pointer p-2 rounded'>
              <RemoveRedEyeIcon
                onClick={() => handleViewOrder(params.row.id)}
              />
            </div>
            <div className='border text-green-400 cursor-pointer p-2 rounded'>
              <EditIcon />
            </div>
            <div
              className='border text-red-400 cursor-pointer p-2 rounded'
              onClick={() => handleDeleteOrder(params.row.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className='bg-white '>
        <DataGrid
          rows={list}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          showColumnVerticalBorder
          showCellVerticalBorder
        />
      </div>
    </>
  );
}
