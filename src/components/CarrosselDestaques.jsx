import Imagem from './Imagem.jsx'

export default function CarrosselDestaques({ activeSlide, onChangeSlide, slides }) {
  const destaque = slides[activeSlide]

  return (
    <section className="hero container-fluid" id="inicio" aria-label="Destaques da loja">
      <button className="carousel-arrow carousel-previous btn" type="button" aria-label="Destaque anterior" onClick={() => onChangeSlide((activeSlide + slides.length - 1) % slides.length)}>‹</button>
      <div className="hero-content row align-items-center">
        <div className="hero-copy col-12 col-md-5" key={destaque.title}>
          <span className="eyebrow">LOJINHA A GRACIOSA</span>
          <h1>{destaque.title}</h1>
          <p>{destaque.description}</p>
        </div>
        <div className="col-12 col-md-7">
          <Imagem key={destaque.image} src={destaque.image} alt={destaque.title} label="Imagem de destaque" className="hero-image" />
        </div>
      </div>
      <button className="carousel-arrow carousel-next btn" type="button" aria-label="Próximo destaque" onClick={() => onChangeSlide((activeSlide + 1) % slides.length)}>›</button>
      <div className="carousel-dots" aria-label="Escolher destaque">
        {slides.map((item, index) => (
          <button key={item.title} type="button" className={index === activeSlide ? 'active' : ''} aria-label={`Mostrar destaque ${index + 1}: ${item.title}`} aria-current={index === activeSlide ? 'true' : undefined} onClick={() => onChangeSlide(index)} />
        ))}
      </div>
    </section>
  )
}