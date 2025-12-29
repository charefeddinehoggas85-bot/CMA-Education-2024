'use client';
import { useState } from 'react';
export function useLocalStorage(key, initialValue) {
    var _a = useState(function () {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            var item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.error("Error reading localStorage key \"".concat(key, "\":"), error);
            return initialValue;
        }
    }), storedValue = _a[0], setStoredValue = _a[1];
    var setValue = function (value) {
        try {
            var valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        }
        catch (error) {
            console.error("Error setting localStorage key \"".concat(key, "\":"), error);
        }
    };
    return [storedValue, setValue];
}
