import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import Reservation from '@pages/Reservation';
import Schedule from '@pages/Schedule';
import Permisos from '@pages/Permisos';
import About from '@pages/About';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/users',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Users />
        </ProtectedRoute>
        ),
      },
      {
        path: '/reservation', // Nueva ruta para Reservación
        element: <Reservation /> // Componente que se renderizará en esta ruta
      },
      {
        path: '/schedule', // Nueva ruta para Reservación
        element: <Schedule /> // Componente que se renderizará en esta ruta
      },
      {
        path: '/permisos', // Nueva ruta para Reservación
        element: <Permisos /> // Componente que se renderizará en esta ruta
      },
      {
        path: '/about',
        element: <About/>
      }
    ]
  },
  {
    path: '/auth',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)