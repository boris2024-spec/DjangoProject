import React, { createContext, useContext, useMemo, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { createAppTheme } from '../theme/theme';

const STORAGE_KEY = 'app_theme_mode';

const ThemeModeContext = createContext({
    mode: 'light',
    toggleMode: () => { },
});

export function ThemeModeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved === 'dark' || saved === 'light' ? saved : 'light';
    });

    const toggleMode = () => {
        setMode((prev) => {
            const next = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem(STORAGE_KEY, next);
            return next;
        });
    };

    const theme = useMemo(() => createAppTheme(mode), [mode]);
    const value = useMemo(() => ({ mode, toggleMode }), [mode]);

    return (
        <ThemeModeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}

export function useThemeMode() {
    return useContext(ThemeModeContext);
}
