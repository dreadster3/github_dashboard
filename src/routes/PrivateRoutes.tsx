import { Route, Routes } from 'react-router-dom';
import Home from '../app/home/Home';
import Layout from '../components/Layout';

function PrivateRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default PrivateRoutes;
