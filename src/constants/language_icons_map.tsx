import CppIcon from '@/icons/devicons/cpp';
import CSharpIcon from '@/icons/devicons/csharp';
import HclIcon from '@/icons/devicons/hcl';
import JavaIcon from '@/icons/devicons/java';
import LatexIcon from '@/icons/devicons/latex';
import LuaIcon from '@/icons/devicons/lua';
import PhpIcon from '@/icons/devicons/php';
import PythonIcon from '@/icons/devicons/python';
import RustIcon from '@/icons/devicons/rust';
import ShellIcon from '@/icons/devicons/shell';
import TypescriptIcon from '@/icons/devicons/typescript';

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
