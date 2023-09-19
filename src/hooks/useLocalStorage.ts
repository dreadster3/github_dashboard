'use client';

function useLocalStorage(
    key: string,
): [() => string | null, (value: string | undefined) => void] {
    const setValue = (value: string | undefined) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            if (!value) {
                localStorage.removeItem(key);
                return;
            }

            localStorage.setItem(key, value);
        }
    };

    const getValue = (): string | null => {
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem(key);
        }

        return null;
    };

    return [getValue, setValue];
}

export default useLocalStorage;
