import { addDoc, collection } from 'firebase/firestore'
import type React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { db } from '@/firebaseConnection'

// Tipagem objeto de retorno do Hook
type UseSignupResult = {
  handleAdd: () => Promise<void>
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  loading: boolean // Adicionando estado de carregamento
  error: string | null // Adicionando estado de erro
}

export const useSignup = (): UseSignupResult => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  

  async function handleAdd(): Promise<void> {
    setLoading(true)
    setError(null)

    // Validação básica
    if (!(name && email && password)) {
      setError('Todos os campos são obrigatórios.')
      toast.error('Preencha todos os campos!')
      setLoading(false)
      return
    }

    try {
      await addDoc(collection(db, 'users'), {
        name,
        email,
        // Atenção: É **fortemente recomendado** não armazenar senhas em texto puro!
        // Use Firebase Authentication para lidar com credenciais.
        password,
      })

      toast.success('Usuário cadastrado com sucesso!')

      // Limpar campos
      setName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      // Garantir que o erro seja tratado como um objeto de erro (ex: `FirebaseError`)
      const erroMessage =
        err instanceof Error
          ? err.message
          : 'Erro desconhecido ao cadastrar usuário.'
      setError(erroMessage)
      toast.error(`Error: ${erroMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    handleAdd,
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    loading,
    error,
  }
}
