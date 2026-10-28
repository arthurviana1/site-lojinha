import Imagem from './Imagem.jsx'
import AdminIconButton from './AdminIconButton.jsx'

export default function SecaoCategorias({ categorias, onSelectCategory, onShowAll, adminMode = false, onAdd, onEdit, onDelete }) {
  return (
    <section className="catalog-section categories-section container-fluid" id="categorias">
      <div className="section-heading d-flex align-items-center justify-content-between">
        <h2>Explorar categorias</h2>
        <button type="button" className="text-link btn" onClick={onShowAll}>Ver tudo <span aria-hidden="true">›</span></button>
        {adminMode && <AdminIconButton action="add" label="Adicionar categoria" onClick={onAdd} />}
      </div>
      <div className="category-grid row row-cols-2 row-cols-sm-3 row-cols-lg-5">
        {categorias.map((categoria) => (
          <div className="col admin-store-item" key={categoria.name}>
            <button className="category-item" type="button" onClick={() => onSelectCategory(categoria.name)}>
              <Imagem src={categoria.image} alt={categoria.name} label={categoria.name} className="category-image" />
              <span>{categoria.name}</span>
            </button>
            {adminMode && (
              <div className="admin-item-actions">
                <AdminIconButton action="edit" label={`Editar categoria ${categoria.name}`} onClick={() => onEdit(categoria)} />
                <AdminIconButton action="delete" label={`Excluir categoria ${categoria.name}`} onClick={() => onDelete(categoria)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}