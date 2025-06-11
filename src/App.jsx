import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import Layout from './components/layout/Layout';
import AdminRoute from './components/auth/AdminRoute';
import Home from './pages/Home';
import Custom from './pages/Custom';
import Charm from './pages/Charm';
import Login from './pages/Login';
import NewTrending from './pages/NewTrending';
import ProductDetail from './pages/ProductDetail';
import CharmDetail from './pages/CharmDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Admin from './pages/admin/Admin';
import Register from './pages/Register';
import Account from './pages/Account';
import ReviewQR from './pages/ReviewQR';

// Import admin page components
import Dashboard from './pages/admin/Dashboard';
import CustomerReview from './pages/admin/CustomerReview';
import ProductStock from './pages/admin/ProductStock';
import Settings from './pages/admin/Settings';
import Payment from './pages/admin/Payment';
import Accounts from './pages/admin/Accounts';
import Help from './pages/admin/Help';
import ProductList from './pages/admin/ProductList';
import ProductAdd from './pages/admin/ProductAdd';
import EditProduct from './pages/admin/EditProduct';
import ManageCharm from './pages/admin/ManageCharm';
// Import Charm management pages
import AddCharm from './pages/admin/AddCharm';
import EditCharm from './pages/admin/EditCharm';
import AdminCharmDetail from './pages/admin/CharmDetail';
import ManageCategories from './pages/admin/ManageCategories';
import ManageOrders from './pages/admin/ManageOrders';
import ViewGifs from './pages/admin/ViewGifs';
import ManageCharmCategory from './pages/admin/ManageCharmCategory';
import ManageMaterial from './pages/admin/ManageMaterial';
import ManageTheme from './pages/admin/ManageTheme';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" element={<ProductList />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="manage-charm" element={<ManageCharm />} />
            <Route path="charm-detail/:id" element={<AdminCharmDetail />} />
            <Route path="customer-review" element={<CustomerReview />} />
            <Route path="product-stock" element={<ProductStock />} />
            <Route path="settings" element={<Settings />} />
            <Route path="payment" element={<Payment />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="help" element={<Help />} />
             {/* Add a default route for /admin */}
            <Route index element={<Dashboard />} /> {/* Redirect or show default admin page */}
            {/* Add route for Add Product page */}
            <Route path="add-product" element={<ProductAdd />} />
            {/* Add routes for Charm management pages */}
            <Route path="add-charm" element={<AddCharm />} />
            <Route path="edit-charm/:id" element={<EditCharm />} />
            <Route path="manage-categories" element={<ManageCategories />} />
            <Route path="manage-orders" element={<ManageOrders />} />
            <Route path="view-gifs" element={<ViewGifs />} />
            <Route path="manage-charm-category" element={<ManageCharmCategory />} />
            <Route path="manage-material" element={<ManageMaterial />} />
            <Route path="manage-theme" element={<ManageTheme />} />
          </Route>

          {/* Client Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="custom" element={<Custom />} />
            <Route path="charm" element={<Charm />} />
            <Route path="new-trending" element={<NewTrending />} />
            <Route path="about" element={<div>About Page</div>} />
            <Route path="contact" element={<div>Contact Page</div>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="account" element={<Account />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="charm/:id" element={<CharmDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success" element={<OrderSuccess />} />
            <Route path="review-qr" element={<ReviewQR />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
