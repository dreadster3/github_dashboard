import React, { ReactElement, createContext, useContext } from 'react';
import { SideNavButton, SideNavSeparator } from '../components/SideNav';

interface ISideBarNavigationContext {
    is_open: boolean;
    set_is_open: (is_open: boolean) => void;
    menu_items: ReactElement<
        (typeof SideNavButton | typeof SideNavSeparator)[]
    >;
    set_menu_items: (
        menu_items: ReactElement<
            (typeof SideNavButton | typeof SideNavSeparator)[]
        >,
    ) => void;
}

const side_bar_navigation_context = createContext<ISideBarNavigationContext>({
    is_open: false,
    set_is_open: () => {},
    menu_items: <></>,
    set_menu_items: () => {},
});

const useSideBarNavigation = () => {
    return useContext(side_bar_navigation_context);
};

function SideBarNavigationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [is_open, set_is_open] = React.useState<boolean>(true);
    const [menu_items, set_menu_items] = React.useState<
        ReactElement<(typeof SideNavButton | typeof SideNavSeparator)[]>
    >(<></>);

    const context_value: ISideBarNavigationContext = {
        is_open,
        set_is_open,
        menu_items,
        set_menu_items,
    };

    return (
        <side_bar_navigation_context.Provider value={context_value}>
            {children}
        </side_bar_navigation_context.Provider>
    );
}

export { SideBarNavigationProvider, useSideBarNavigation };
