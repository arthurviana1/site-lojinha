import Imagem from './Imagem.jsx'

export default function SecaoCategorias({ categorias, onSelectCategory, onShowAll }) {
  return (
    <section className="catalog-section categories-section container-fluid" id="categorias">
      <div className="section-heading d-flex align-items-center justify-content-between">
        <h2>Explorar categorias</h2>
        <button type="button" className="text-link btn" onClick={onShowAll}>Ver tudo <span aria-hidden="true">›</span></button>
      </div>
      <div className="category-grid row row-cols-2 row-cols-sm-3 row-cols-lg-5">
        {categorias.map((categoria) => (
          <div className="col" key={categoria.name}>
            <button className="category-item" type="button" onClick={() => onSelectCategory(categoria.name)}>
              <Imagem src={categoria.image} alt={categoria.name} label={categoria.name} className="category-image" />
              <span>{categoria.name}</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}