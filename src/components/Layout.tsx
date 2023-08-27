import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="h-screen bg-gray-200">
            <Link to="/">HOME</Link>
            <Outlet />
        </div>
    );
}

export default Layout;
