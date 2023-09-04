import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

function Layout() {
    return (
        <div className="ctp-mocha">
            <div className="flex min-h-screen bg-ctp-base ">
                <div className="flex flex-row w-full">
                    <SideNav />
                    <div className="pt-10 w-full h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
