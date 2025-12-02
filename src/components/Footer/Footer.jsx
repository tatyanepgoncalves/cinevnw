import f from "./Footer.module.scss"

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={f.Footer}>
      <div className={f.footerContainer}>
        <p>{year} - Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
