import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="min-h-screen bg-gray-200 pb-32">
            <Link to="/">HOME</Link>
            <Outlet />
        </div>
    );
}

export default Layout;
