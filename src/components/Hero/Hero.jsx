import { useState, useEffect } from 'react';
import h from "./Hero.module.scss";
//  // Use esta linha no seu ambiente local (Vite)

// Mock temporário para evitar erro de referência de classes SASS no ambiente de desenvolvimento
// Lembre-se de remover este mock e descomentar a linha acima no seu projeto local.
// const h = {
//   HeroWrapper: 'hero-wrapper',
//   loading: 'loading-message',
//   error: 'error-message',
//   HeroSwiper: 'hero-swiper',
//   HeroSlide: 'hero-slide',
//   SlideBackground: 'slide-background',
//   overlay: 'overlay',
//   HeroContent: 'hero-content',
//   tagline: 'tagline',
//   description: 'description',
//   buttonPrimary: 'button-primary',
// };



import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';



export const Hero = () => {
  
  // Constantes de API e Imagem
  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
  const API_KEY = import.meta.env.VITE_PUBLIC_TMDB_API_KEY;

  // Estados
  const [heroMovies, setHeroMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito para buscar dados na API do TMDB
  useEffect(() => {
    const fetchHeroMovies = async () => {
      if (!API_KEY) {
        setError("Erro: A chave de API do TMDB não foi configurada. Verifique seu arquivo .env.local.");
        setIsLoading(false);
        return;
      }
      
      try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erro de rede (${response.status}) ao buscar dados.`);
        }

        const data = await response.json();
        
        // Filtra para garantir que apenas filmes com imagem de fundo sejam usados e limita a 5
        const validMovies = data.results.filter(movie => movie.backdrop_path).slice(0, 5);
        setHeroMovies(validMovies);
        
      } catch (e) {
        // O erro é tratado no backoff, mas deixamos o console.error para debug
        console.error("Erro capturado durante a busca:", e);
        throw e; // Lança o erro para ser pego pelo backoff
      }
    };

    // Função para tentar a busca com retries (Exponential Backoff simples)
    const fetchWithRetry = async (retries = 3) => {
        try {
            await fetchHeroMovies();
            setIsLoading(false); 
        } catch (error) {
            if (retries > 0) {
                // Não logamos o retry como um erro, apenas informamos no console para debug
                setTimeout(() => fetchWithRetry(retries - 1), 2000);
            } else {
                setError("Falha ao carregar os filmes após múltiplas tentativas. Verifique sua chave de API e a conexão.");
                setIsLoading(false);
            }
        }
    };

    fetchWithRetry();

  }, [API_KEY]); 


  // Renderização de estados
  if (isLoading) {
    return <section id="home" className={h.HeroWrapper}><div className={h.loading}>Carregando filmes em destaque...</div></section>;
  }

  if (error) {
    return <section id="home" className={h.HeroWrapper}><div className={h.error}>{error}</div></section>;
  }
  
  if (heroMovies.length === 0) {
    return <section id="home" className={h.HeroWrapper}><div className={h.error}>Nenhum filme encontrado para o destaque.</div></section>;
  }


  return (
    <section id="home" className={h.HeroWrapper}>
      <Swiper 
          modules={[Autoplay, EffectFade, Pagination]} 
          effect="fade"
          slidesPerView={1} 
          loop={true} 
          autoplay={{ delay: 5000, disableOnInteraction: false }} 
          className={h.HeroSwiper}
      >
          {heroMovies.map((movie) => (
            <SwiperSlide key={movie.id} className={h.HeroSlide}>
              <div 
                className={h.SlideBackground} 
                style={{
                  backgroundImage: `url(${TMDB_IMAGE_BASE_URL}${movie.backdrop_path})` 
                }}
              >
                {/* Gradiente de sobreposição (definido no CSS) */}
                <div className={h.overlay}></div>
                
                {/* Conteúdo do Slide */}
                <div className={h.HeroContent}>
                    {/* Exibe a nota do filme */}
                    <span className={h.tagline}>Nota TMDB: {movie.vote_average.toFixed(1)}/10</span>
                    <h1>{movie.title}</h1>
                    {/* Usa a sinopse do TMDB (overview) */}
                    <p className={h.description}>{movie.overview}</p>
                    <button className={h.buttonPrimary}>
                        Ver Detalhes
                    </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}