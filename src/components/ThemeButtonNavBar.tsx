import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, ListItem, ListItemSuffix } from '@material-tailwind/react';
import icons from '../constants/icons';
import useLocalStorage from '../hooks/useLocalStorage';
import Accordion from './core/accordion/Accordion';
import AccordionBody from './core/accordion/AccordionBody';
import AccordionHeader from './core/accordion/AccordionHeader';

interface IThemeButtonNavBarProps {
    open: boolean;
    onClick?: () => void;
}

function ThemeButtonNavBar({ onClick, open }: IThemeButtonNavBarProps) {
    const [, set_theme] = useLocalStorage('theme');

    const handle_set_theme = (theme: string) => {
        set_theme(theme);
        document.documentElement.className = theme;
        onClick?.();
    };

    return (
        <Accordion
            open={open}
            icon={
                <FontAwesomeIcon
                    icon={icons.s_circle}
                    className="text-ctp-base"
                />
            }
        >
            <ListItem className="h-12 hover:bg-ctp-subtext1  hover:text-ctp-base">
                <AccordionHeader
                    onClick={onClick}
                    className="border-none text-ctp-text"
                >
                    Theme
                </AccordionHeader>
            </ListItem>
            <AccordionBody>
                <List className="min-w-max text-ctp-text">
                    <ListItem
                        onClick={() => handle_set_theme('ctp-mocha')}
                        className="flex justify-between"
                    >
                        Mocha
                        <ListItemSuffix className="ctp-mocha m-0">
                            <FontAwesomeIcon
                                icon={icons.s_circle}
                                className="text-ctp-base"
                            />
                        </ListItemSuffix>
                    </ListItem>
                    <ListItem
                        onClick={() => handle_set_theme('ctp-macchiato')}
                        className="flex justify-between"
                    >
                        Macchiato
                        <ListItemSuffix className="ctp-macchiato m-0">
                            <FontAwesomeIcon
                                icon={icons.s_circle}
                                className="rounded-full border border-black text-ctp-base"
                            />
                        </ListItemSuffix>
                    </ListItem>
                    <ListItem
                        onClick={() => handle_set_theme('ctp-frappe')}
                        className="flex justify-between"
                    >
                        Frappe
                        <ListItemSuffix className="ctp-frappe m-0">
                            <FontAwesomeIcon
                                icon={icons.s_circle}
                                className="rounded-full border border-black text-ctp-base"
                            />
                        </ListItemSuffix>
                    </ListItem>
                    <ListItem
                        onClick={() => handle_set_theme('ctp-latte')}
                        className="flex justify-between"
                    >
                        Latte
                        <ListItemSuffix className="ctp-latte m-0">
                            <FontAwesomeIcon
                                icon={icons.s_circle}
                                className="rounded-full border border-black text-ctp-base"
                            />
                        </ListItemSuffix>
                    </ListItem>
                </List>
            </AccordionBody>
        </Accordion>
    );
}

export default ThemeButtonNavBar;
