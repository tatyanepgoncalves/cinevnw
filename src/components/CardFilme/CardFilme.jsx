import s from "./CardFilme.module.scss";


export const CardFilme = (props) => {
  return (
    <article className={s.Card}>
      <img src={props.src} alt={props.alt} />
      <div className={s.CardElement}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </article>
  )
}
