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
};

export default theme;
