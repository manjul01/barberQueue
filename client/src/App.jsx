import CustomerLoginPage from "./components/CustomerLoginPage";
import CustomerSignupPage from "./components/CustomerSignupPage";
import Home from "./components/Home";
import OrdersPage from "./components/OrdersPage";
import QueuePage from "./components/QueuePage";
import ShopLoginPage from "./components/ShopLoginPage";
import ShopSignup from "./components/ShopSignup";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop-signup" element={<ShopSignup />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route path="/customer-login" element={<CustomerLoginPage />} />
          <Route path="/customer-signup" element={<CustomerSignupPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/queue" element={<QueuePage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
