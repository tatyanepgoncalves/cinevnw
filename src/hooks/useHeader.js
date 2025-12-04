import { useEffect, useState } from "react"

export const useHeader = () => {
  // Estado para controlar se o background do Header deve ser escuro
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Define isScrilled como true se a rolagem for maior que 80px
      if (window.scrollY > 80) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

    }
    // Add o listener
    window.addEventListener("scroll", handleScroll)

    // remove o listener ao desmontar o componente (cleanup)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []) // O array vazio garante que o efeito só seja executado uma vez

  return {
    isScrolled, 
    setIsScrolled
  }
}