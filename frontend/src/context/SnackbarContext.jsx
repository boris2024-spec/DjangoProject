import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const SnackbarContext = createContext({
    showSnackbar: () => { },
});

const PENDING_KEY = 'pending_snackbar';

export function SnackbarProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');

    const showSnackbar = (nextMessage, nextSeverity = 'info') => {
        setMessage(nextMessage);
        setSeverity(nextSeverity);
        setOpen(true);
    };

    useEffect(() => {
        const raw = localStorage.getItem(PENDING_KEY);
        if (!raw) return;

        try {
            const data = JSON.parse(raw);
            if (data?.message) {
                showSnackbar(data.message, data.severity || 'info');
            }
        } finally {
            localStorage.removeItem(PENDING_KEY);
        }
    }, []);

    const value = useMemo(() => ({ showSnackbar }), []);

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3500}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpen(false)} severity={severity} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export function useSnackbar() {
    return useContext(SnackbarContext);
}

export function setPendingSnackbar(message, severity = 'info') {
    localStorage.setItem(PENDING_KEY, JSON.stringify({ message, severity }));
}
