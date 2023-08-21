function useLocalStorage(
    key: string,
): [() => string | null, (value: string | undefined) => void] {
    const setValue = (value: string | undefined) => {
        if (!value) {
            localStorage.removeItem(key);
            return;
        }

        localStorage.setItem(key, value);
    };

    const getValue = (): string | null => {
        return localStorage.getItem(key);
    };

    return [getValue, setValue];
}

export default useLocalStorage;
