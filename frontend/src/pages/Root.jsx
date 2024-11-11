import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { AuthProvider } from '@context/AuthContext';

function Root()  {
return (
    <AuthProvider>
        <PageRoot/>
    </AuthProvider>
);
}

function PageRoot() {
return (
    <>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
    </>
);
}

export default Root;