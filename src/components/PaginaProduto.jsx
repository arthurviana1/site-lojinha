import { useState } from 'react'
import Imagem from './Imagem.jsx'
import AdminIconButton from './AdminIconButton.jsx'

export default function PaginaProduto({ produto, onBack, adminMode = false, onEdit, onDelete }) {
  const imagens = produto.gallery ?? [produto.image]
  const especificacoes = produto.specifications ?? [
    `Categoria: ${produto.category}`,
    'Produto selecionado da Lojinha a Graciosa',
  ]
  const [imagemSelecionada, setImagemSelecionada] = useState(imagens[0])

  return (
    <>
      <button className="detail-back btn" type="button" onClick={onBack}>‹ Voltar aos produtos</button>
      <section className="product-detail container-fluid" aria-label="Detalhes do produto">
        <div className="product-gallery">
          <div className="product-thumbnails" aria-label="Imagens do produto">
            {imagens.map((imagem, indice) => (
              <button
                className={imagemSelecionada === imagem ? 'selected' : ''}
                key={imagem}
                type="button"
                aria-label={`Ver imagem ${indice + 1}`}
                aria-pressed={imagemSelecionada === imagem}
                onClick={() => setImagemSelecionada(imagem)}
              >
                <Imagem src={imagem} alt={`${produto.name}, imagem ${indice + 1}`} label="Imagem" className="product-thumbnail" />
              </button>
            ))}
          </div>
          <Imagem key={imagemSelecionada} src={imagemSelecionada} alt={produto.name} label={produto.name} className="product-main-image" />
        </div>

        <section className="product-description" aria-labelledby="product-title">
          <h1 id="product-title">{produto.name}</h1>
          {adminMode && (
            <div className="admin-item-actions product-admin-actions">
              <AdminIconButton action="edit" label="Editar produto" onClick={onEdit} />
              <AdminIconButton action="delete" label="Excluir produto" onClick={onDelete} />
            </div>
          )}
          <p>{produto.description ?? `${produto.name}, disponível na categoria ${produto.category}.`}</p>
          {produto.brand && <p className="product-brand">Marca: {produto.brand}</p>}
          <div className="product-specifications">
            <h2>Especificações:</h2>
            <ul>
              {especificacoes.map((especificacao) => <li key={especificacao}>{especificacao}</li>)}
            </ul>
          </div>
        </section>

        <aside className="purchase-panel" aria-label="Opções de compra">
          <p className="delivery-estimate">Entrega prevista após a confirmação do pedido.</p>
          <p className="delivery-estimate">Consulte as opções disponíveis para seu endereço.</p>
          <strong className="detail-price">{produto.price}</strong>
          <p className="stock-status">Estoque: disponível</p>
          <label htmlFor="quantity">Quantidade:</label>
          <select className="form-select form-select-sm" id="quantity" defaultValue="1">
            {[1, 2, 3, 4, 5].map((quantidade) => <option key={quantidade}>{quantidade}</option>)}
          </select>
          <button className="buy-now btn btn-primary" type="button" disabled>Comprar agora</button>
          <button className="add-to-cart btn btn-outline-primary" type="button" disabled>Adicionar ao carrinho</button>
        </aside>
      </section>
    </>
  )
}