import h from "./Header.module.scss";
import { useState, useEffect } from "react"
import { Bell, Search, User } from "lucide-react";

export const Header = () => {
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


  return (
    <header className={`${h.Header} ${isScrolled ? h.HeaderScrolled : ""}`}>
      <div className={h.HeaderContainer}>

        <div className={h.HeaderLeft}>
          <section className={h.logo}><a href="#">CineVnw</a></section>
          
          <nav className={h.menu}>
            <a href="#home">Início</a>
            <a href="#movies">Filmes</a>
          </nav>
        </div>



        <div className={h.HeaderRight}>
          <Search size={18} className={h.Search}/>
          <Bell size={18} className={h.Notifications} />
          <User  className={h.Avatar}/>
        </div>

      </div>
    </header>
  )
}
