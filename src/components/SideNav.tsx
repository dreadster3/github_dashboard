import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WorkflowStatusLabel from '../app/home/data_table/WorkflowStatusLabel';
import icons from '../constants/icons';
import useGetWorkflows from '../hooks/useGetWorkflows';

interface ISideNavButtonProps {
    icon?: React.ReactNode;
    text: string;
    to: string;
}

function SideNavButton({ icon, text, to }: ISideNavButtonProps) {
    return (
        <a
            href={to}
            className="flex flex-row items-center h-12 text-gray-500 transition-transform duration-200 ease-in transform hover:text-gray-800 hover:translate-x-2"
        >
            <span className="inline-flex justify-center items-center w-12 h-12 text-lg text-gray-400">
                {icon}
            </span>
            <span className="text-sm font-medium">{text}</span>
        </a>
    );
}

function SideNavSeparator() {
    return <div className="border-t"></div>;
}

function SideNav() {
    const constant_buttons: ISideNavButtonProps[] = [
        {
            icon: <FontAwesomeIcon icon={icons.s_home} />,
            text: 'Home',
            to: '/',
        },
    ];

    const { data: workflows } = useGetWorkflows();

    return (
        <div className="flex overflow-hidden flex-col w-52 h-full min-h-screen bg-white rounded-xl">
            <div className="flex justify-center items-center h-20 shadow-md">
                <h1 className="text-3xl text-blue-500 uppercase">GitDash</h1>
            </div>
            <div className="flex flex-col">
                {constant_buttons.map((button) => (
                    <SideNavButton key={button.text} {...button} />
                ))}
                <SideNavSeparator />
                {workflows?.workflows.map((workflow) => (
                    <SideNavButton
                        key={workflow.id}
                        text={workflow.name}
                        to={`/workflows/${workflow.id}/runs`}
                        icon={<WorkflowStatusLabel workflow_id={workflow.id} />}
                    />
                ))}
            </div>
        </div>
    );
}

export default SideNav;
