import { Link, useNavigate } from 'react-router-dom'
import { useSignup } from '@/hooks/useSignup'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export default function FormSignup() {
  const navigate = useNavigate()

  const {
    handleAdd,
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    loading,
    error,
  } = useSignup()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      handleAdd()
      navigate('/home')
    } catch (err) {
      // O tratamento de erro (toast) já acontece dentro do useSignup,
      console.error('Falha no cadastro e navegação: ', err)
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {/* Exibe erros do Firebase/Validação */}
      {/** biome-ignore lint/nursery/noLeakedRender: it's necessary */}
      {error && (
        <p className="border border-red-700 p-3 text-red-600">Erro: {error}</p>
      )}

      <Label htmlFor="username">Nome do usuário</Label>
      <Input
        className="mt-2 mb-4"
        disabled={loading}
        id="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome completo..."
        type="text"
        value={name}
      />

      <Label htmlFor="email">E-mail</Label>
      <Input
        className="mt-2 mb-4"
        disabled={loading}
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email..."
        type="email"
        value={email}
      />

      <Label htmlFor="password">Senha</Label>
      <Input
        className="mt-2 mb-8"
        disabled={loading}
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Digite sua senha..."
        type="password"
        value={password}
      />

      <div className="space-y-2">
        <Button
          className="uppercase tracking-wider"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>

        <p className="text-center text-xs text-zinc-400">
          Já possui conta?{' '}
          <Link className="font-medium hover:underline" to="/">
            Acesse a conta.
          </Link>
        </p>
      </div>
    </form>
  )
}
