import FormSignup from '@/components/SignupPage/FormSignup'

export default function SignupPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <section className="w-xs space-y-6 p-4 md:w-md">
        <h1 className="text-center font-bold font-poppins text-3xl text-zinc-50 md:text-5xl">
          Cadastrar
        </h1>

        <FormSignup />
      </section>
    </main>
  )
}
