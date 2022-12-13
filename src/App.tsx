import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { OidcProvider } from '@axa-fr/react-oidc';
import createCache from '@emotion/cache';
import { theme } from './theme';
import { Layout } from './components/Layout';
import { config } from './config';

const clientSideEmotionCache = createCache({ key: 'css' });

const configuration = {
    client_id: config.auth.clientId,
    redirect_uri: config.auth.redirectUri,
    scope: config.auth.scopes,
    authority: config.auth.authority,
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
