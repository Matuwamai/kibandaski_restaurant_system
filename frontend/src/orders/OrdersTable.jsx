import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdVerified } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { useGlobalContext } from "../context/context";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../redux/actions/orderActions";

export default function OrdersTable({ list }) {
  const { openOrderViewModal } = useGlobalContext();
  const dispatch = useDispatch();

  const handleViewOrder = (id) => {
    openOrderViewModal(id);
  };

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
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
            TABLE#{params.row.table_no}
          </h6>
        );
      },
    },
    {
      field: "customer_name",
      headerName: "Customer",
      width: 150,
      renderCell: (params) => {
        return (
          <h6 className='text-gray-600 my-auto'>{params.row.customer_name}</h6>
        );
      },
    },
    {
      field: "order_details",
      headerName: "Order Details",
      width: 300,
      renderCell: (params) => {
        const order_desc = (params.row.order_items || [])
          .map((item) => item.title)
          .join(", ");
        return <h6 className='text-gray-600 my-auto'>{order_desc}</h6>;
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
        const date = new Date(params.row.created_at).toLocaleString();
        return (
          <h6 className='bg-slate-100 px-2 py-1 rounded-md text-blue-300 my-auto'>
            {moment(params.row.created_at).fromNow()}
          </h6>
        );
      },
    },
    {
      field: "is_completed",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.is_completed ? (
              <div className='w-32 flex gap-2 items-center justify-center bg-green-400 text-white px-4 py-1 rounded font-semibold'>
                <MdVerified style={{ fontSize: "18px" }} />
                <h6 className='my-auto'>Completed</h6>
              </div>
            ) : (
              <div className='w-32 flex gap-2 items-center justify-center bg-orange-300 text-red-500 px-4 py-1 rounded font-semibold'>
                <CgDanger style={{ fontSize: "18px" }} />
                <h6 className='my-auto'>Pending</h6>
              </div>
            )}
          </>
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
