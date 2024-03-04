import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Orders from "./screens/Orders";
import Customers from "./screens/Customers";
import DashboardLayout from "./layout";
import MealsAndDishes from "./screens/MealsAndDishes";
import MealsView from "./dishes/MealsView";
import Tables from "./screens/Tables";
import Login from "./auth/Login";
import Home from "./client/Home";
import Cart from "./client/Cart";
import Transactions from "./screens/Transactions";
import Staff from "./screens/Staff";
import Reports from "./reports/Reports";
import Settings from "./settings/Settings";
import Add from "./staff/Add";
import Edit from "./staff/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  markOrderCompleted,
  updateOrdersList,
} from "./redux/slices/orderSlices";
import { useEffect } from "react";
import { addEventSource } from "./redux/slices/globalSlices";
import { setTransactionInfo } from "./redux/slices/paymentSlice";
import { jwtDecode } from "jwt-decode";
import PaymentSuccess from "./screens/PaymentSuccess";

//  const eventSource = new WebSocket(
//    "wss://kibandaski-restaurant-system.onrender.com/ws/sse/"
//  );

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo?.access){
      const decoded = jwtDecode(userInfo?.access);
      const eventSource = new WebSocket(
        `ws://127.0.0.1:8000/ws/sse/?user_id=${decoded.id}`
      );
      // ws://127.0.0.1:8000/ws/sse/ => FOR USE IN DEVELOPMENT
      // wss://kibandaski-restaurant-system.onrender.com/ws/sse/ => FOR PRODUCTION
      dispatch(addEventSource(eventSource.channelName));
      eventSource.onmessage = (event) => {
        // Handle the received event data as needed
        const emmittedData = JSON.parse(event.data);
        console.log(emmittedData);
        if (emmittedData?.type === "send_order") {
          dispatch(updateOrdersList(JSON.parse(emmittedData.data)));
        } else if (emmittedData?.type === "complete_order") {
          dispatch(markOrderCompleted());
        } else if (
          emmittedData?.data?.type === "incomplete_transaction"
        ) {
          dispatch(setTransactionInfo(emmittedData?.data));
        }
      };

      eventSource.onerror = (error) => {
        console.error("Error:", error);
        // Handle errors if necessary
      };

      // Clean up the EventSource on component unmount
      return () => {
        eventSource.close();
      };
    }
  }, [dispatch, userInfo]);


  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/client/' element={<Home />} />
        <Route path='/client/:table_no' element={<Home />} />
        <Route path='/client/cart' element={<Cart />} />
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/page/:pageNo' element={<Orders />} />
          <Route
            path='/orders/:orderId/payments/:referenceCode/validation'
            element={<PaymentSuccess />}
          />
          <Route path='/customers' element={<Customers />} />
          <Route path='/staff' element={<Staff />} />
          <Route path='/staff/new' element={<Add />} />
          <Route path='/staff/:id/edit' element={<Edit />} />
          <Route path='/meals-and-dishes' element={<MealsAndDishes />} />
          <Route path='/meals-and-dishes/:id' element={<MealsView />} />
          <Route path='/restaurant-tables' element={<Tables />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/transactions/page/:pageNo' element={<Transactions />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

