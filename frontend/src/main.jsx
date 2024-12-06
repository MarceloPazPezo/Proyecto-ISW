import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Error404 from '@pages/Error404';
import Teachers from '@pages/Teachers';
import AsignarTimeBlock from '@pages/AsignarTimeBlock.jsx';
import Horarios from '@pages/Horarios';
// import CopyTeacher from '@pages/TeachersCopy';
import Root from '@pages/Root';
import Reservation from './pages/reservas/Reservation';
import MyReservation from './pages/reservas/MisReservas';
import Classrooms from '@pages/Classrooms'; 
import Subjects from '@pages/Subjects';
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
        path: '/teachers',
        element: (
        <ProtectedRoute allowedRoles={['administrador', 'director', 'jefe de utp']}>
          <Teachers />
        </ProtectedRoute>
        ),
      },
      {
        path: '/asignarBloque',
        element: (
        <ProtectedRoute allowedRoles={['administrador', 'director', 'jefe de utp']}>
          <AsignarTimeBlock />
        </ProtectedRoute>
        ),
      },
      {
        path: '/bloquesHorario',
        element: (
        <ProtectedRoute allowedRoles={['administrador', 'director', 'jefe de utp']}>
          <Horarios />
        </ProtectedRoute>
        ),
      },
      {
        path: '/classrooms',
        element: (
        <ProtectedRoute allowedRoles={['administrador', 'director']}>
          <Classrooms />
        </ProtectedRoute>
        ),
      },
      {
        path: '/subjects',
        element: (
        <ProtectedRoute allowedRoles={['administrador', 'director']}>
          <Subjects />
        </ProtectedRoute>
        ),
      },
      {
        path: '/reservation', 
        element: (
        <ProtectedRoute allowedRoles={['administrador', 'director', 'docente', 'encargado']}>
          <Reservation />
        </ProtectedRoute>
        )
      },
      {
        path: '/myreservation',
        element: (
          <ProtectedRoute allowedRoles={['docente']}>
            <MyReservation />
          </ProtectedRoute>
        )
      },
      {
        path: '/schedule', 
        element: <Schedule />       
      },
      {
        path: '/permisos', 
        element: <Permisos /> 
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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)