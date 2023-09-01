import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

function Layout() {
    return (
        <div className="flex min-h-screen bg-gray-200 dark:bg-neutral-900">
            <div className="flex flex-row w-full">
                <SideNav />
                <div className="pt-10 w-full h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
