import { Route, Routes } from 'react-router-dom';
import Home from '../app/home/Home';

function PrivateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default PrivateRoutes;
