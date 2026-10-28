import { useState } from 'react'
import Imagem from './Imagem.jsx'
import AdminIconButton from './AdminIconButton.jsx'

export default function PaginaCategoria({ categorias, categoriasGerenciaveis = [], categoriaSelecionada, onSelectCategory, onSelectProduct, onHome, produtos, adminMode = false, onAddCategory, onEditCategory, onDeleteCategory, onEditProduct, onDeleteProduct }) {
  const [pagina, setPagina] = useState(1)
  const produtosVisiveis = categoriaSelecionada === 'Categorias' || categoriaSelecionada === 'Mais vendidos'
    ? produtos
    : produtos.filter((produto) => produto.category === categoriaSelecionada)
  const totalPaginas = Math.max(1, Math.ceil(produtosVisiveis.length / 4))
  const produtosDaPagina = produtosVisiveis.slice((pagina - 1) * 4, pagina * 4)

  function selecionarCategoria(categoria) {
    setPagina(1)
    onSelectCategory(categoria)
  }

  return (
    <>
      <section className="category-banner text-center">
        <h1>Explore a lojinha</h1>
        <p>Dê uma olhada nos nossos produtos e monte sua lista</p>
      </section>
      <div className="category-layout container-fluid">
        <aside className="category-sidebar">
          <div className="category-admin-heading">
            <h2>Categorias</h2>
            {adminMode && <AdminIconButton action="add" label="Adicionar categoria" onClick={onAddCategory} />}
          </div>
          <nav aria-label="Categorias de produtos">
            {categorias.map((categoria) => (
              <div className="category-admin-item" key={categoria.name}>
                <button
                  className={categoriaSelecionada === categoria.name ? 'active' : ''}
                  type="button"
                  onClick={() => selecionarCategoria(categoria.name)}
                >
                  {categoria.name}
                </button>
                {adminMode && categoriasGerenciaveis.some((item) => item.name === categoria.name) && (
                  <div className="admin-item-actions">
                    <AdminIconButton action="edit" label={`Editar categoria ${categoria.name}`} onClick={() => onEditCategory(categoria)} />
                    <AdminIconButton action="delete" label={`Excluir categoria ${categoria.name}`} onClick={() => onDeleteCategory(categoria)} />
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>
        <section className="category-results" aria-labelledby="category-title">
          <h2 id="category-title">{categoriaSelecionada === 'Categorias' ? 'Todas as categorias' : categoriaSelecionada}</h2>
          {produtosVisiveis.length ? (
            <div className="category-products row row-cols-1 row-cols-md-2">
              {produtosDaPagina.map((produto) => (
                <article className="col category-product admin-store-item" key={produto.name}>
                  <button type="button" className="category-product-button" onClick={() => onSelectProduct(produto)}>
                    <Imagem src={produto.image} alt={produto.name} label={produto.name} className="category-product-image" />
                    <span>{produto.name}</span>
                    <strong>{produto.price}</strong>
                  </button>
                  {adminMode && (
                    <div className="admin-item-actions">
                      <AdminIconButton action="edit" label={`Editar produto ${produto.name}`} onClick={() => onEditProduct(produto)} />
                      <AdminIconButton action="delete" label={`Excluir produto ${produto.name}`} onClick={() => onDeleteProduct(produto)} />
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="category-empty">Nenhum produto cadastrado nesta categoria.</p>
          )}
          {produtosVisiveis.length > 0 && (
            <nav className="pagination-bar" aria-label="Paginação de produtos">
              <button type="button" disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>← Página anterior</button>
              {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((numero) => (
                <button className={pagina === numero ? 'active' : ''} type="button" key={numero} onClick={() => setPagina(numero)}>{numero}</button>
              ))}
              <button type="button" disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)}>Próxima página →</button>
            </nav>
          )}
        </section>
      </div>
      <div className="category-back"><button type="button" className="text-link btn" onClick={onHome}>Voltar para a página inicial</button></div>
    </>
  )
}