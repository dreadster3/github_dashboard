import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

function Layout() {
    return (
        <div className="ctp-mocha">
            <div className="flex min-h-screen bg-ctp-base ">
                <div className="flex w-full flex-row">
                    <SideNav />
                    <div className="h-full w-full pt-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
