import { Route, Routes } from 'react-router-dom';
import FunctionsEditor from '../pages/FunctionsEditor';
import Home from '../pages/Home';
import { OidcSecure } from '@axa-fr/react-oidc';
import Logs from '../pages/Logs';

const AppRoutes = () => (
    <Routes>
        {/* <Route path="/" element={<OidcSecure><Home /></OidcSecure>} /> */}
        <Route path="/functions" element={<OidcSecure><FunctionsEditor /></OidcSecure>} />
        <Route path="/logs" element={<OidcSecure><Logs /></OidcSecure>} />
    </Routes>
);

export default AppRoutes;
