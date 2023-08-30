import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

function Layout() {
    return (
        <div className="flex-1 min-h-screen bg-gray-200">
            <div className="flex flex-row">
                <SideNav />
                <div className="pt-10 w-full h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
