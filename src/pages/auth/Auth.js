import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AnimatePresence, motion } from "framer-motion";
export default function Auth() {
    const [authChoice, setAuthChoice] = useState(() => {
        const savedAuth = sessionStorage.getItem('isRegister');
        return savedAuth ? JSON.parse(savedAuth) : false;
    });
    useEffect(() => {
        sessionStorage.setItem('isRegister', JSON.stringify(authChoice));
    }, [authChoice]);
    return (_jsxs("div", { className: `h-screen overflow-hidden md:grid transition-[grid-template-columns] duration-500 ease-in-out ${authChoice
            ? "md:grid-cols-[100%_0%]"
            : "md:grid-cols-[40%_60%] lg:grid-cols-[30%_70%]"}`, children: [_jsx("section", { className: `relative flex justify-center h-full overflow-y-auto transition-colors duration-500 ease-in-out bg-[#3b5704] ${authChoice ? "items-start py-10 lg:py-14" : "items-center"}`, children: _jsx(AnimatePresence, { mode: "wait", children: authChoice ? (_jsx(motion.div, { initial: { x: 100, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -100, opacity: 0 }, transition: { duration: 0.4 }, className: "w-full flex justify-center px-4", children: _jsx(RegisterForm, { onLogin: () => setAuthChoice(false) }) }, "register")) : (_jsx(motion.div, { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 100, opacity: 0 }, transition: { duration: 0.4 }, className: "w-full flex justify-center px-4", children: _jsx(LoginForm, { onRegister: () => setAuthChoice(true) }) }, "login")) }) }), _jsx("aside", { className: `hidden md:flex items-center justify-center p-6 bg-[#edffcc] overflow-hidden transition-opacity duration-300 ${authChoice ? "opacity-0 pointer-events-none" : "opacity-100"}`, children: _jsxs("picture", { children: [_jsx("source", { media: "(min-width: 1024px)", srcSet: "/logo-lg.png" }), _jsx("source", { media: "(min-width: 768px)", srcSet: "/logo-md.png" }), _jsx("img", { src: "/logo-lg.png", alt: "Finance Illustration", className: "w-full h-full object-cover rounded-3xl" })] }) })] }));
}
