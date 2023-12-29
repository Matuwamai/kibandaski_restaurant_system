import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CustomersList() {
  const columns = [
    {
      field: "id",
      headerName: "S/NO",
      width: 100,
      renderCell: (params) => {
        return (
          <h6 className='text-gray-600 uppercase my-auto'>{params.row.id}</h6>
        );
      },
    },
    {
      field: "username",
      headerName: "Customer",
      width: 250,
      renderCell: (params) => {
        return <h6 className='text-gray-600 my-auto'>{params.row.username}</h6>;
      },
    },
    {
      field: "phone_no",
      headerName: "Phone No",
      width: 150,
      renderCell: (params) => {
        return <h6 className='text-gray-600 my-auto'>{params.row.phone_no}</h6>;
      },
    },
    {
      field: "orders",
      headerName: "Orders",
      width: 80,
      renderCell: (params) => {
        return (
          <h6 className='bg-red-500 px-2 py-1 rounded-md text-white flex justify-center items-center mx-auto'>
            11
          </h6>
        );
      },
    },
    {
      field: "points",
      headerName: "Points",
      width: 100,
      renderCell: (params) => {
        return (
          <h6 className='bg-green-400 px-2 py-1 rounded-md text-white my-auto mx-auto'>
            1000
          </h6>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Date Joined",
      width: 150,
      renderCell: (params) => {
        return (
          <h6 className='bg-slate-100 px-2 py-1 rounded-md text-blue-300 my-auto'>
            {params.row.created_at}
          </h6>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => {
        return (
          <div className='w-full flex justify-center'>
            <div className='border text-red-400 cursor-pointer p-2 rounded'>
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
      username: "Wamae",
      phone_no: "0740924507",
      created_at: "8thth Nov 2023",
    },
    {
      id: 2,
      username: "JohnDoe",
      phone_no: "0739127837",
      created_at: "10th Nov 2023",
    },
    {
      id: 3,
      username: "janembithi",
      phone_no: "0710387837",
      created_at: "11th Nov 2023",
    },
  ];

  return (
    <div className=''>
      <div className='bg-white  w-max'>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          // checkboxSelection
          showColumnVerticalBorder
          showCellVerticalBorder
        />
      </div>
    </div>
  );
}
