const theme = {
    spinner: {
        valid: {
            colors: ['gray'],
        },
        styles: {
            colors: {
                gray: {
                    color: 'text-ctp-base',
                },
            },
        },
    },
    iconButton: {
        defaultProps: {
            color: 'blue',
        },
        valid: {
            colors: ['blue'],
        },
        styles: {
            variants: {
                filled: {
                    blue: {
                        background: 'bg-ctp-blue',
                        color: 'text-ctp-base',
                    },
                },
                text: {
                    blue: {
                        color: 'text-ctp-text',
                    },
                },
            },
        },
    },
    button: {
        defaultProps: {
            color: 'blue',
        },
        valid: {
            colors: ['blue'],
        },
        styles: {
            variants: {
                filled: {
                    blue: {
                        background: 'bg-ctp-blue',
                        color: 'text-ctp-base',
                    },
                },
                text: {
                    blue: {
                        color: 'text-ctp-text',
                    },
                },
            },
        },
    },
    checkbox: {
        defaultProps: {
            color: 'blue',
        },
        valid: {
            colors: ['blue'],
        },
        styles: {
            colors: {
                blue: {
                    background: 'checked:bg-ctp-blue',
                    border: 'border-ctp-overlay2 checked:border-ctp-blue',
                },
            },
        },
    },
    select: {
        styles: {
            base: {
                select: {
                    color: 'text-ctp-text',
                    disabled:
                        'disabled:bg-ctp-overlay0 disabled:border-0 disabled:text-ctp-base',
                },
                menu: {
                    bg: 'bg-ctp-base',
                    color: 'text-ctp-text',
                },
                option: {
                    initial: {
                        background:
                            'hover:bg-ctp-overlay0 focus:bg-blue-gray-50',
                        color: 'hover:text-ctp-text focus:text-blue-gray-900',
                    },
                    active: {
                        bg: 'bg-ctp-blue bg-opacity-80',
                        color: 'text-ctp-base',
                    },
                },
            },
        },
    },
};

export default theme;
