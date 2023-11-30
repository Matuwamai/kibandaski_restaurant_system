import GridViewIcon from "@mui/icons-material/GridView";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { GiCook, GiChefToque } from "react-icons/gi";
import { FaUtensils, FaDollarSign } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdTableRestaurant } from "react-icons/md";

export const sideLinks = [
  {
    id: 0,
    url: "/",
    iconClass: <GridViewIcon />,
    title: "Dashboard",
  },
  {
    id: 1,
    url: "/orders",
    iconClass: <AddShoppingCartOutlinedIcon />,
    title: "Orders",
  },
  {
    id: 2,
    url: "/meals-and-dishes",
    iconClass: <FaUtensils style={{ fontSize: "22px" }} />,
    title: "Meals & Dishes",
  },
  {
    id: 3,
    url: "/transactions",
    iconClass: <FaDollarSign style={{ fontSize: "26px" }} />,
    title: "Revenue",
  },
  {
    id: 4,
    url: "/customers",
    iconClass: <PeopleAltOutlinedIcon />,
    title: "Customers",
  },
  {
    id: 5,
    url: "/cooks",
    iconClass: <GiCook style={{ fontSize: "26px" }} />,
    title: "Chefs & Cooks",
  },
  {
    id: 6,
    url: "/waiters",
    iconClass: <GiChefToque style={{ fontSize: "26px" }} />,
    title: "Waiters",
  },
  {
    id: 7,
    url: "/restaurant-tables",
    iconClass: <MdTableRestaurant style={{ fontSize: "26px" }} />,
    title: "Tables & Seats",
  },
  {
    id: 8,
    url: "/settings",
    iconClass: <IoSettings style={{ fontSize: "22px" }} />,
    title: "Settings",
  },
];
