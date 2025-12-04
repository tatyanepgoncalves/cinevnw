import h from "./Hero.module.scss";

// Importar Swiper components e estilos
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

// Estilos base do Swiper (essenciais)
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Importar os dados
import filmesData from '../../db/movies.json';



export const Hero = () => {
  const filmeEmDestaque = filmesData.filmes;

  return (
    <section id="home" className={h.HeroWrapper}>
      <Swiper 
          modules={[Autoplay, EffectFade, Pagination]} 
          effect="fade"
          slidesPerView={1} 
          loop={true} 
          autoplay={{ delay: 5000, disableOnInteraction: false }} className={h.HeroSwiper}
          >
          {filmeEmDestaque.map((movie, index) => (
            <SwiperSlide key={index} className={h.HeroSlide}>
              <div className={h.SlideBackground} style={{backgroundImage: `url(${movie.src})` }}>
                {/* Gradiente de sobreposição (definido no CSS) */}
                <div className={h.overlay}></div>
                {/* Conteúdo do Slide */}
                <div className={h.HeroContent}>
                    <span className={h.tagline}>{movie.tagline || 'Filme em Cartaz'}</span>
                    <h1>{movie.title}</h1>
                    <p className={h.description}>{movie.description}</p>
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
