import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { ThemeModeProvider } from './context/ThemeContext.jsx';
import { SnackbarProvider } from './context/SnackbarContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeModeProvider>
            <SnackbarProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthProvider>
            </SnackbarProvider>
        </ThemeModeProvider>
    </React.StrictMode>
);
