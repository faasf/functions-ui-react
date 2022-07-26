import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { OidcProvider } from '@axa-fr/react-oidc';
import createCache from '@emotion/cache';
import { theme } from './theme';
import { Layout } from './components/Layout';

const clientSideEmotionCache = createCache({ key: 'css' });

const configuration = {
    client_id: 'react',
    redirect_uri: 'http://localhost:3000/authentication/callback',
    silent_redirect_uri: 'http://localhost:3000/authentication/silent-callback', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
    scope: 'openid profile functions',
    authority: 'http://localhost:8081/realms/test',
    // service_worker_relative_url:'/OidcServiceWorker.js',
    // service_worker_only:true,
};

const App = () => {
    return (
        <CacheProvider value={clientSideEmotionCache}>
            <OidcProvider configuration={configuration} >
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <BrowserRouter>
                        <Layout>
                            <AppRoutes />
                        </Layout>
                    </BrowserRouter>
                </ThemeProvider>
            </OidcProvider>
        </CacheProvider >
    );
};

export default App;
