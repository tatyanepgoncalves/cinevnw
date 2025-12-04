import h from "./Header.module.scss";
import { useHeader } from "../../hooks/useHeader"
import { Bell, Search, User } from "lucide-react";

export const Header = () => {
  const { isScrolled } = useHeader();


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
