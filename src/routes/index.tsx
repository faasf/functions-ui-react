import { Route, Routes } from 'react-router-dom';
import FunctionsEditor from '../pages/FunctionsEditor';
import Home from '../pages/Home';
import { OidcSecure } from '@axa-fr/react-oidc';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<OidcSecure><Home /></OidcSecure>} />
        <Route path="/functions" element={<OidcSecure><FunctionsEditor /></OidcSecure>} />
    </Routes>
);

export default AppRoutes;
