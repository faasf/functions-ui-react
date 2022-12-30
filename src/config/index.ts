export const config = {
    auth: {
        clientId: process.env.REACT_APP_AUTH_CLIENT_ID || 'admin-ui',
        redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI || 'http://app.functions.local/authentication/callback',
        scopes: process.env.REACT_APP_AUTH_SCOPES || 'openid profile functions',
        authority: process.env.REACT_APP_AUTH_AUTHORITY || 'http://keycloak.local/auth/realms/faas',
    },
    functionServiceUrl: process.env.REACT_APP_FUNCTIONS_SERVICE_URL || 'http://functions.local/',
    logsServiceUrl: process.env.REACT_APP_LOGS_SERVICE_URL || 'http://functions.local/as',
}


// export const config = {
//     auth: {
//         clientId: process.env.REACT_APP_AUTH_CLIENT_ID || 'admin-ui',
//         redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI || 'http://localhost:3000/authentication/callback',
//         scopes: process.env.REACT_APP_AUTH_SCOPES || 'openid profile functions',
//         authority: process.env.REACT_APP_AUTH_AUTHORITY || 'http://localhost:8081/auth/realms/faas',
//     },
//     functionServiceUrl: process.env.REACT_APP_FUNCTIONS_SERVICE_URL || 'http://localhost:8080',
//     logsServiceUrl: process.env.REACT_APP_LOGS_SERVICE_URL || 'http://localhost:8003',
// }