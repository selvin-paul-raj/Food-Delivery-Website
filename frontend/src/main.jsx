
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import router from './Router/Router.jsx'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <RouterProvider router={router}/>
  </AuthProvider>
)
