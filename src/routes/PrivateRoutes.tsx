import { Route, Routes } from 'react-router-dom';
import Home from '../app/home/Home';
import Layout from '../components/Layout';
import WorkflowView from '../app/workflow/WorkflowView';

function PrivateRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/workflow/:id" element={<WorkflowView />} />
            </Route>
        </Routes>
    );
}

export default PrivateRoutes;
