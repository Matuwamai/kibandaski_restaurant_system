import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdVerified } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMeal } from "../redux/actions/mealsActions";
export default function DishesList({ list }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteMeal(id));
  };
  const columns = [
    {
      field: "id",
      headerName: "S/NO",
      width: 80,
      renderCell: (params) => {
        return (
          <h6 className='text-gray-600 uppercase my-auto'>{params.row.id}</h6>
        );
      },
    },
    {
      field: "meal_url",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return (
          <img
            src={params.row.media_url}
            alt='meals'
            className='w-24 h-10 img-cover'
          />
        );
      },
    },
    {
      field: "details",
      headerName: "Meal Details",
      width: 350,
      renderCell: (params) => {
        return <h6 className='text-gray-600 my-auto'>{params.row.details}</h6>;
      },
    },
    {
      field: "qty",
      headerName: "Quantity",
      width: 80,
      renderCell: (params) => {
        return (
          <h6 className='bg-slate-100 w-12 text-center px-2 py-1 rounded-md text-blue-300 my-auto'>
            {params.row.qty}
          </h6>
        );
      },
    },
    {
      field: "meal_price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        return (
          <h6 className='bg-slate-100 px-2 py-1 rounded-md text-blue-300 my-auto'>
            KES {params.row.price}
          </h6>
        );
      },
    },
    {
      field: "is_ready",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.is_ready ? (
              <div className='w-32 flex gap-2 items-center justify-center bg-green-400 text-white px-4 py-1 rounded font-semibold'>
                <MdVerified style={{ fontSize: "18px" }} />
                <h6 className='my-auto'>Ready</h6>
              </div>
            ) : (
              <div className='w-32 flex gap-2 items-center justify-center bg-slate-200 text-white px-4 py-1 rounded font-semibold'>
                <CgDanger style={{ fontSize: "18px" }} />
                <h6 className='my-auto'>Ready</h6>
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
            <Link
              to={`/meals-and-dishes/${params.row.id}`}
              className='border text-blue-300 cursor-pointer p-2 rounded'
            >
              <RemoveRedEyeIcon />
            </Link>
            <div className='border text-green-400 cursor-pointer p-2 rounded'>
              <EditIcon />
            </div>
            <div
              className='border text-red-400 cursor-pointer p-2 rounded'
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      meal_details: "Chapo Mix - Sukuma/Cabbage",
      meal_price: 70,
      qty: 1,
      is_ready: true,
    },
    {
      id: 2,
      meal_details: "Ugali Nyama - Supu ya matumbo",
      meal_price: 100,
      qty: 1,
      is_ready: false,
    },
    {
      id: 3,
      meal_details: "Mchele mix sukuma - supu ya cabbage",
      meal_price: 50,
      qty: 1,
      is_ready: true,
    },
    {
      id: 4,
      meal_details: "Chips Mwitu",
      meal_price: 100,
      qty: 1,
      is_ready: true,
    },
    {
      id: 5,
      meal_details: "Chapo Choma - Supu ya Maharagwe",
      meal_price: 20,
      qty: 1,
      is_ready: true,
    },
    {
      id: 6,
      meal_details: "Chapo Choma - Supu ya Ndengu",
      meal_price: 20,
      qty: 1,
      is_ready: true,
    },
    {
      id: 7,
      meal_details: "Chai",
      meal_price: 10,
      qty: 1,
      is_ready: true,
    },
    {
      id: 8,
      meal_details: "Mandazi",
      meal_price: 10,
      qty: 1,
      is_ready: true,
    },
    {
      id: 9,
      meal_details: "Chapati",
      meal_price: 20,
      qty: 1,
      is_ready: true,
    },
  ];

  return (
    <>
      <div className='bg-white'>
        <DataGrid
          rows={list}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          // checkboxSelection
          showColumnVerticalBorder
          showCellVerticalBorder
        />
      </div>
    </>
  );
}
