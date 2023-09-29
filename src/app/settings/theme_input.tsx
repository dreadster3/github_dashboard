'use client';

import icons from '@/constants/icons';
import { useTheme } from '@/providers/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Option, Select } from '@material-tailwind/react';
import clsx from 'clsx';
import React from 'react';

const theme_options = [
    {
        value: 'default',
        label: 'System Default',
    },
    {
        value: 'mocha',
        label: 'Mocha',
    },
    {
        value: 'macchiato',
        label: 'Macchiato',
    },
    {
        value: 'frappe',
        label: 'Frappe',
    },
    {
        value: 'latte',
        label: 'Latte',
    },
];

const is_dark_default = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

function ThemeInput() {
    const { theme, set_theme } = useTheme();

    return (
        <Select
            label={'Theme'}
            value={theme}
            onChange={(value) => set_theme(value ?? 'default')}
            selected={(element) =>
                element &&
                React.cloneElement(element, {
                    disabled: true,
                    className:
                        'flex items-center opacity-100 px-0 gap-2 pointer-events-none',
                })
            }
        >
            {theme_options.map((theme) => (
                <Option
                    className={clsx(
                        'flex gap-2',
                        theme.value == 'default'
                            ? is_dark_default()
                                ? 'ctp-mocha'
                                : 'ctp-latte'
                            : `ctp-${theme.value}`,
                    )}
                    key={theme.value}
                    value={theme.value}
                >
                    <FontAwesomeIcon
                        className="text-ctp-base rounded-full border border-ctp-overlay0"
                        icon={icons.s_circle}
                    />
                    {theme.label}
                </Option>
            ))}
        </Select>
    );
}

export default ThemeInput;
