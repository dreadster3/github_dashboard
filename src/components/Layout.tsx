import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="flex-1 min-h-screen bg-gray-200">
            <div className="w-full">
                <Link to="/">HOME</Link>
            </div>
            <Outlet />
        </div>
    );
}

export default Layout;
