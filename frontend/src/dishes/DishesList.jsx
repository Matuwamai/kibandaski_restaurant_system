import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showMealDeleteAlert } from "../redux/slices/mealsSlices";
export default function DishesList({ list }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(showMealDeleteAlert(id));
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
      field: "title",
      headerName: "Meals & Dishes  Title",
      width: 180,
      renderCell: (params) => {
        return <h6 className='text-gray-600 my-auto'>{params.row.title}</h6>;
      },
    },
    {
      field: "details",
      headerName: "Description",
      width: 400,
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
          <h6 className='w-12 text-end px-2 py-1 text-blue-300 my-auto'>
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
          <h6 className='bg-slate-100 px-3 py-1 text-blue-300 my-auto'>
            KES {params.row.price}
          </h6>
        );
      },
    },
    {
      field: "is_ready",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.row.is_ready ? (
              <h6 className='mx-auto bg-green-100 px-5 py-1 text-green-500'>
                Ready
              </h6>
            ) : (
              <h6 className='mx-auto bg-orange-100 px-3 py-1 text-orange-500'>
                Not Ready
              </h6>
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
            <Link
              to={`/meals-and-dishes/${params.row.id}`}
              className='border text-green-400 cursor-pointer p-2 rounded'
            >
              <EditIcon />
            </Link>
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
