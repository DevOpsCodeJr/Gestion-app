import Link from "next/link";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        Bienvenido a Gestion App
        <Link href="/auth/login" className="mt-4 bg-teal-500 py-2 px-6 rounded-full hover:bg-teal-600 transition-all cursor-pointer">Log In</Link>
      </div>
    </section>
  )
}
