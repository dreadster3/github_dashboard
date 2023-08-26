import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="h-screen bg-gray-200">
            <Outlet />
        </div>
    );
}

export default Layout;
