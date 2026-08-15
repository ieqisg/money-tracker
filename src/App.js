import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LandingPage from "./pages/landing/Landing";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./layout/dashboardLayout";
export default function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/auth", element: _jsx(Auth, {}) }), _jsx(Route, { element: _jsx(DashboardLayout, {}), children: _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }) })] }));
}
