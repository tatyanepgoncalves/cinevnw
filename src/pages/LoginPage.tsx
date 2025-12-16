import Form from '@/components/LoginPage/Form'

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <section className="w-xs space-y-6 p-4 md:w-md">
        <h1 className="text-center font-bold font-poppins text-3xl text-zinc-50 md:text-5xl">
          Conectar
        </h1>

        <Form />
      </section>
    </main>
  )
}
