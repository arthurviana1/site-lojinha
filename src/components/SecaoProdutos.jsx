import Imagem from './Imagem.jsx'
import AdminIconButton from './AdminIconButton.jsx'

export default function SecaoProdutos({ produtos, onSelectProduct, onShowAll, adminMode = false, onAdd, onEdit, onDelete }) {
  return (
    <section className="catalog-section products-section container-fluid" id="produtos">
      <div className="section-heading d-flex align-items-center justify-content-between">
        <h2>Produtos em alta</h2>
        <button type="button" className="text-link btn" onClick={onShowAll}>Ver tudo <span aria-hidden="true">›</span></button>
        {adminMode && <AdminIconButton action="add" label="Adicionar produto" onClick={onAdd} />}
      </div>
      <div className="product-grid row row-cols-2 row-cols-sm-3 row-cols-lg-5">
        {produtos.map((produto) => (
          <div className="col admin-store-item" key={produto.name}>
            <button type="button" className="product-item" onClick={() => onSelectProduct(produto)}>
              <Imagem src={produto.image} alt={produto.name} label="Produto em alta" className="product-image" />
              <span>{produto.name}</span>
              <strong className="popular-price">{produto.price}</strong>
            </button>
            {adminMode && (
              <div className="admin-item-actions">
                <AdminIconButton action="edit" label={`Editar produto ${produto.name}`} onClick={() => onEdit(produto)} />
                <AdminIconButton action="delete" label={`Excluir produto ${produto.name}`} onClick={() => onDelete(produto)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}