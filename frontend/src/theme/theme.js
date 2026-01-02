import { createTheme } from '@mui/material/styles';

import { getScrollbarStyles } from './scrollbar';

export function createAppTheme(mode) {
    const baseTheme = createTheme({
        palette: {
            mode,
        },
        shape: {
            borderRadius: 12,
        },
    });

    return createTheme(baseTheme, {
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    ...getScrollbarStyles(baseTheme),
                },
            },
        },
    });
}
