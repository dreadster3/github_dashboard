import { BrowserRouter } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { useAuth } from '../providers/AuthenticationProvider';

function AppRoutes() {
    const { getIsAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            {getIsAuthenticated() ? <PrivateRoutes /> : <PublicRoutes />}
        </BrowserRouter>
    );
}

export default AppRoutes;
