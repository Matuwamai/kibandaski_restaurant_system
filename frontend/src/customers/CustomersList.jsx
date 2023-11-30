import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import { useGlobalContext } from "../context/context";

export default function CustomersList() {
  const { openOrderViewModal } = useGlobalContext();

  const handleViewOrder = (id) => {
    openOrderViewModal();
  };
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
      width: 150,
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
    <>
      <div className='bg-white'>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          // checkboxSelection
          //   showColumnVerticalBorder
          //   showCellVerticalBorder
        />
      </div>
    </>
  );
}
