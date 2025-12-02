import h from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={h.Header}>
      <div>
        <section className={h.logo}><a href="#">CineVnw</a></section>
        
        <nav className={h.menu}>
          <a href="#home">Início</a>
          <a href="#movies">Filmes</a>
        </nav>

      </div>
    </header>
  )
}
