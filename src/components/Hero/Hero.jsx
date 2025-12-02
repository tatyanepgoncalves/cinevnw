import h from "./Hero.module.scss";

// Dados do filme em destaque (pode ser obtido de um JSON ou API)
const filmeEmDestaque = {
  title: "Oppenheimer",
  tagline: "A história que mudou o mundo para sempre.",
  description: "O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas durante o Projeto Manhattan, levando ao desenvolvimento da bomba atômica.",
  buttonText: "Ver Detalhes",
  // Usaremos uma imagem de fundo (background-image) no CSS
};

export const Hero = () => {
  return (
    <section id="home" className={h.Hero}>
      <div className={h.HeroContainer}>
        <span className={h.tagline}>{filmeEmDestaque.tagline}</span>
        <h1>{filmeEmDestaque.title}</h1>
        <p className={h.description}>{filmeEmDestaque.description}</p>
        <button className={h.buttonPrimary}>
          {filmeEmDestaque.buttonText}
        </button>
        
        {/* O gradiente e a imagem de fundo serão tratados no SCSS */}
      </div>
    </section>
  )
}
