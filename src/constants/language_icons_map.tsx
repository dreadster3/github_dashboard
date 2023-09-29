import {
    CSharpIcon,
    CppIcon,
    HclIcon,
    JavaIcon,
    LatexIcon,
    LuaIcon,
    PhpIcon,
    PythonIcon,
    RustIcon,
    ShellIcon,
    TypescriptIcon,
} from '@/icons/devicons';

const language_icon_map: Map<string, any> = new Map(
    Object.entries({
        rust: <RustIcon />,
        php: <PhpIcon />,
        python: <PythonIcon />,
        'c#': <CSharpIcon />,
        typescript: <TypescriptIcon />,
        hcl: <HclIcon />,
        shell: <ShellIcon />,
        lua: <LuaIcon />,
        java: <JavaIcon />,
        'c++': <CppIcon />,
        tex: <LatexIcon />,
        // TODO: Add more icons
        // javascript: <JavascriptIcon />,
        // html: <HtmlIcon />,
        // go: <GoIcon />,
        // zig: <ZigIcon />,
    }),
);

export default language_icon_map;
