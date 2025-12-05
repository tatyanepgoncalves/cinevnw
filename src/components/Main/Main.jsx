import { CardFilme } from "../CardFilme/CardFilme"
import m from "./Main.module.scss";
import filmesData from "../../db/movies.json"
import { useState, useEffect } from "react";

export const Main = () => {
  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300'; // Tamanho w300 é ideal para cards
  const API_KEY = import.meta.env.VITE_PUBLIC_TMDB_API_KEY;

  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
      const fetchMovies = async () => {
          if (!API_KEY) {
              setError("Erro: A chave de API do TMDB não foi configurada. Verifique seu arquivo .env.local.");
              setIsLoading(false);
              return;
          }
          
          try {
              // Usando o endpoint 'now_playing' (Em Cartaz) para esta seção
              const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`;
              const response = await fetch(url);

              if (!response.ok) {
                  throw new Error(`Erro de rede (${response.status}) ao buscar dados.`);
              }

              const data = await response.json();
              
              // Filtra para garantir que apenas filmes com poster sejam usados
              const validMovies = data.results.filter(movie => movie.poster_path);
              setMoviesList(validMovies);
              
          } catch (e) {
              console.error("Erro capturado durante a busca:", e);
              throw e; 
          }
      };

      // Função para tentar a busca com retries
      const fetchWithRetry = async (retries = 3) => {
          try {
              await fetchMovies();
              setIsLoading(false); 
          } catch (error) {
              if (retries > 0) {
                  setTimeout(() => fetchWithRetry(retries - 1), 2000);
              } else {
                  setError("Falha ao carregar a lista de filmes após múltiplas tentativas.");
                  setIsLoading(false);
              }
          }
      };

      fetchWithRetry();

    }, [API_KEY]); 

    // Renderização de estados
    if (isLoading) {
        return (
            <main className={m.Main}><div className={m.loading}>Carregando filmes em cartaz...</div></main>
        );
    }

    if (error) {
        return (
            <main className={m.Main}><div className={m.error}>{error}</div></main>
        );
    }

    if (moviesList.length === 0) {
        return (
             <main className={m.Main}><div className={m.error}>Nenhum filme encontrado no momento.</div></main>
        );
    }
  return (
    <main className={m.Main}>
      <div className={m.MainContainer}>
        <h1>Filmes em cartaz</h1>

        <section className={m.movies} id="movies">
            {moviesList.map((movie) => (
              <CardFilme 
                key={movie.id}
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                title={movie.title}
                description={movie.overview || 'Sinopse indisponível.'}
              />
            )) }
        </section>
      </div>
    </main>
  )
}
