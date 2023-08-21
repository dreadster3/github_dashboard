import { ReactNode, createContext, useContext, useState } from 'react';

interface IAuthentication {
    getIsAuthenticated: () => boolean;
}

interface ITokenAuthentication extends IAuthentication {
    token: string;
    setToken: (token: string) => void;
}

const authenticationContext = createContext<ITokenAuthentication>({
    token: '',
    setToken: () => {},
    getIsAuthenticated: () => false,
});

const useAuth = () => {
    return useContext(authenticationContext);
};

function AuthenticationProvider({ children }: { children: ReactNode }) {
    const [token] = useState<string>(import.meta.env.VITE_GITHUB_PAT);

    const handleSetToken = () => {
        throw new Error('Forbidden');
    };

    const authentication = {
        token,
        setToken: handleSetToken,
        getIsAuthenticated: () => token !== '',
    };

    return (
        <authenticationContext.Provider value={authentication}>
            {children}
        </authenticationContext.Provider>
    );
}

export { useAuth, AuthenticationProvider };
