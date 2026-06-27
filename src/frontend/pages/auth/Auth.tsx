import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AnimatePresence, motion } from "framer-motion";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(() => {
    const savedAuth = localStorage.getItem('authChoice')
    return savedAuth ? JSON.parse(savedAuth) : false
  })



  useEffect(() => {
    localStorage.setItem('authChoice', JSON.stringify(isRegister))
  }, [isRegister])

  return (
    <div
      className={`h-screen overflow-hidden md:grid transition-[grid-template-columns] duration-500 ease-in-out ${isRegister
        ? "md:grid-cols-[100%_0%]"
        : "md:grid-cols-[40%_60%] lg:grid-cols-[30%_70%]"
        }`}
    >
      <section
        className={`relative flex justify-center h-full overflow-y-auto transition-colors duration-500 ease-in-out bg-[#3b5704] ${isRegister ? "items-start py-10 lg:py-14" : "items-center"
          }`}
      >
        <AnimatePresence mode="wait">
          {isRegister ? (
            <motion.div
              key="register"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center px-4"
            >
              <RegisterForm onLogin={() => setIsRegister(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center px-4"
            >
              <LoginForm onRegister={() => setIsRegister(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <aside
        className={`hidden md:flex items-center justify-center p-6 bg-[#edffcc] overflow-hidden transition-opacity duration-300 ${isRegister ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <picture>
          <source media="(min-width: 1024px)" srcSet="/logo-lg.png" />
          <source media="(min-width: 768px)" srcSet="/logo-md.png" />
          <img
            src="/logo-lg.png"
            alt="Finance Illustration"
            className="w-full h-full object-cover rounded-3xl"
          />
        </picture>
      </aside>
    </div>
  );
}
