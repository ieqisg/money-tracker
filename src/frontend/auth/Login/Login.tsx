import LoginForm from "./LoginForm"

export default function Login() {
  return (
    <div className="h-screen md:grid md:grid-cols-[40%_60%] lg:grid-cols-[30%_70%] text-black overflow-hidden">
      <section className=" md:bg-[#3B5704]">
        <LoginForm />
      </section>

      <aside className="hidden md:flex items-center justify-center p-6 bg-[#edffcc]">
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
  )
}
