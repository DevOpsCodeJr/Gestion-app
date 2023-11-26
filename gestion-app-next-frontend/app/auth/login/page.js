'use client'

import { useAuth } from "@/app/lib/hooks/useAuth"
import { login } from "./inout"
import { useForm } from "@/app/lib/hooks/useForm"
import { useRouter } from 'next/navigation'

export default function Login() {
    const { form, changed } = useForm({})
    const { setAuth } = useAuth()

    const router = useRouter()

    const loginUser = async (e) => {
        e.preventDefault()
        let userToLogin = form

        const res = await login(userToLogin, setAuth)
        if (res === 200) {
            router.push('/dashboard')
        }
    }
    return (
        <section className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="font-extrabold text-2xl text-sky">Gestion App</h1>
            <form
                onSubmit={loginUser}
                className="mt-4 w-80 bg-slate-600 py-4 px-4 rounded-xl text-center"
            >
                <h1 className="text-dark text-lg">Iniciar Sesion</h1>
                <div>
                    <div className="mt-3.5">
                        <input
                            className="py-2 px-4 rounded-xl shadow-sm placeholder-slate-400 text-gray-700 focus:outline-none invalid:text-red-600"
                            type="email"
                            name="email"
                            onChange={changed}
                            placeholder="Correo Electronico"
                        />
                    </div>
                    <div className="my-2.5">
                        <input
                            className="py-2 px-4 rounded-xl shadow-sm placeholder-slate-400 text-gray-700 focus:outline-none"
                            type="password"
                            name="password"
                            onChange={changed}
                            placeholder="Contrasenia"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <input
                        type="submit"
                        value="Iniciar Sesion"
                        className="w-36 mt-1 py-2 px-4 bg-sky rounded-pill btn text-dark font-extrabold"
                    />
                </div>
            </form>
        </section>
    )
}