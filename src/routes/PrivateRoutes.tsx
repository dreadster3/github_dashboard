import { Route, Routes } from 'react-router-dom';
import Home from '../app/home/Home';
import WorkflowView from '../app/workflow/WorkflowView';
import WorkflowRunView from '../app/workflow_run/WorkflowRunView';
import Layout from '../components/Layout';

function PrivateRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route
                    path="/workflows/:workflowId/runs"
                    element={<WorkflowView />}
                />
                <Route
                    path="/workflows/:workflowId/runs/:runId"
                    element={<WorkflowRunView />}
                />
                {/* <Route path="*" element={<TestView />} /> */}
            </Route>
        </Routes>
    );
}

export default PrivateRoutes;
