import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Orders from "./screens/Orders";
import Employees from "./screens/Employees";
import Customers from "./screens/Customers";
import DashboardLayout from "./layout";
import MealsAndDishes from "./screens/MealsAndDishes";
import MealsView from "./dishes/MealsView";
import Tables from "./screens/Tables";
import Login from "./auth/Login";
import Home from "./client/Home";
import Cart from "./client/Cart";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/client/' element={<Home />} />
        <Route path='/client/cart' element={<Cart />} />
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/meals-and-dishes' element={<MealsAndDishes />} />
          <Route path='/meals-and-dishes/:id' element={<MealsView />} />
          <Route path='/restaurant-tables' element={<Tables />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// const handleSpeak = () => {
//   const text = "A new order has been made at table number 10. PLease check...";

//   const value = new SpeechSynthesisUtterance(text);
//   value.rate = 0.9;
//   window.speechSynthesis.speak(value);
// };

// useEffect(() => {
//   // Set up an interval to call handleSpeak every 5 seconds (adjust the time interval as needed)
//   const intervalId = setInterval(() => {
//     handleSpeak();
//   }, 5000); // 5000 milliseconds = 5 seconds

//   // Clean up the interval when the component is unmounted
//   return () => clearInterval(intervalId);
// }, []); // Empty dependency array ensures that the effect runs only once when the component mounts
