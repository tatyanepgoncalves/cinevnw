import { CardFilme } from "../CardFilme/CardFilme"
import m from "./Main.module.scss";
import filmesData from "../../db/movies.json"

export const Main = () => {
  return (
    <main className={m.Main}>
      <div className={m.MainContainer}>
        <h1>Filmes em cartaz</h1>

        <section className={m.movies} id="movies">
            {filmesData.filmes.map((movie, index) => (
              <CardFilme 
                key={index}
                src={movie.src}
                alt={movie.alt}
                title={movie.title}
                description={movie.description}
              />
            )) }
        </section>
      </div>
    </main>
  )
}
