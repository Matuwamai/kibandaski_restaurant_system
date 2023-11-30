import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useGlobalContext } from "../context/context";

export default function OrdersList() {
  const { openOrderViewModal } = useGlobalContext();

  const handleViewOrder = (id) => {
    openOrderViewModal();
  };
  const columns = [
    {
      field: "id",
      headerName: "Order NO",
      width: 90,
    },
    {
      field: "username",
      headerName: "Customer",
      width: 100,
    },
    {
      field: "order_details",
      headerName: "Order Details",
      width: 250,
    },
    {
      field: "created_at",
      headerName: "Date",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => {
        return (
          <div className='flex gap-3'>
            <div className='text-green-500 cursor-pointer'>
              <RemoveRedEyeIcon
                onClick={() => handleViewOrder(params.row.id)}
              />
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
      order_details: "Chapo Mix - Sukuma/Cabbage",
      created_at: "10th Nov 2023",
    },
    {
      id: 2,
      username: "John Doe",
      order_details: "Ugali Nyama - Supu ya matumbo",
      created_at: "24th Oct 2023",
    },
    {
      id: 3,
      username: "Havard",
      order_details: "Mchele mix sukuma - supu ya cabbage",
      created_at: "8th Oct 2023",
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
          showColumnVerticalBorder
          showCellVerticalBorder
        />
      </div>
    </>
  );
}
