import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import ProtectedRouter from './ProtectedRouter';
import Home from "../pages/home/Home"
import Menu from "../pages/shop/Menu"
import CartItems from "../pages/shop/CartItems"
import Profile from '../component/updateUser/Profile';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/dashboad/admin/Dashboard';
import Users from '../pages/dashboad/admin/Users';
import AdminProtectedRouter from './AdminProtectedRouter';
import ManageMenu from '../pages/dashboad/admin/ManageMenu';
import Orders from '../pages/shop/Orders';
import PlaceOrder from '../pages/shop/PlaceOrder';
import Verify from '../pages/shop/Verify';
import FavoriteMenu from '../pages/shop/FavoriteMenu';
import AdminOrders from '../pages/dashboad/admin/AdminOrders';
// Inside your router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />, 
      },
      {
        path: '/update-profile',
        element: <ProtectedRouter><Profile /></ProtectedRouter>, 
      },
      {
        path: '/cart-items',
        element: <ProtectedRouter><CartItems /></ProtectedRouter>, 
      },
      {
        path: '/order',
        element: <ProtectedRouter><Orders /></ProtectedRouter>, 
      }
      ,
      {
        path: '/place-order',
        element: <ProtectedRouter><PlaceOrder /></ProtectedRouter>, 
      }
      ,
      {
        path: '/verify',
        element: <ProtectedRouter><Verify /></ProtectedRouter>, 
      }
      ,
      {
        path: '/fav-menu',
        element: <ProtectedRouter><FavoriteMenu /></ProtectedRouter>, 
      }
    ]
  },
  {
    path: 'dashboard',
    element: <AdminProtectedRouter><DashboardLayout /></AdminProtectedRouter>,
    children: [
      {
        path: '',
        element:  <AdminProtectedRouter><Dashboard /></AdminProtectedRouter>,
      },
      {
        path: 'users',
        element: <AdminProtectedRouter><Users /></AdminProtectedRouter>, 
      },
      {
        path: 'list-menu',
        element: <AdminProtectedRouter><ManageMenu/></AdminProtectedRouter>, 
      }
      ,
      {
        path: 'list-order',
        element: <AdminProtectedRouter><AdminOrders/></AdminProtectedRouter>, 
      }
    ]
  }
]);

export default router;
