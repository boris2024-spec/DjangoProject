import { alpha } from '@mui/material/styles';

export function getScrollbarStyles(theme) {
    const track = theme.palette.background.default;
    const thumb = alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.25 : 0.2);
    const thumbHover = alpha(
        theme.palette.text.primary,
        theme.palette.mode === 'dark' ? 0.35 : 0.3
    );

    return {
        '*': {
            scrollbarColor: `${thumb} ${track}`,
            scrollbarWidth: 'thin',
        },
        '*::-webkit-scrollbar': {
            width: 10,
            height: 10,
        },
        '*::-webkit-scrollbar-track': {
            backgroundColor: track,
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: thumb,
            borderRadius: 8,
            border: `2px solid ${track}`,
        },
        '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: thumbHover,
        },
    };
}
