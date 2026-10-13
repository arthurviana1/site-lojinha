import produtoCaderno from '../assets/produtos/produto-caderno-capa-dura-universitario.jpg'
import produtoCaneta from '../assets/produtos/produto-caneta-esferografica-bic.jpg'
import Imagem from './Imagem.jsx'

const itensIniciais = [
  {
    id: 'caderno',
    nome: 'Caderno Universitário Capa Dura 15X1 240 Folhas Brief Azul Spiral',
    preco: 19.99,
    quantidade: 1,
    imagem: produtoCaderno,
  },
  {
    id: 'caneta',
    nome: 'Caneta Esferográfica BIC Escrita Média Cristal Dura Mais, Preta',
    preco: 2.19,
    quantidade: 3,
    imagem: produtoCaneta,
  },
]

const formatarPreco = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function PaginaCarrinho() {
  const itens = itensIniciais
  const precoTotal = itens.reduce((total, item) => total + item.preco * item.quantidade, 0)

  return (
    <main className="cart-page container-fluid">
      <h1>Carrinho <span>({itens.length} {itens.length === 1 ? 'item' : 'itens'})</span></h1>
      {itens.length ? (
        <>
          <div className="cart-table-wrap">
            <table className="cart-table">
              <thead>
                <tr><th scope="col">Itens</th><th scope="col">Preço</th><th scope="col">Quantidade</th><th scope="col">Total</th><th scope="col"><span className="visually-hidden">Ações</span></th></tr>
              </thead>
              <tbody>
                {itens.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Itens">
                      <div className="cart-product">
                        <Imagem src={item.imagem} alt={item.nome} label={item.nome} className="cart-product-image" />
                        <span>{item.nome}</span>
                      </div>
                    </td>
                    <td data-label="Preço">{formatarPreco(item.preco)}</td>
                    <td data-label="Quantidade">{String(item.quantidade).padStart(2, '0')}</td>
                    <td data-label="Total">{formatarPreco(item.preco * item.quantidade)}</td>
                    <td data-label="Ações"><button className="cart-remove btn btn-outline-danger" type="button">Remover</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cart-summary">
            <strong>Total: {formatarPreco(precoTotal)}</strong>
            <button className="btn btn-primary" type="button">Pagar</button>
          </div>
        </>
      ) : (
        <p className="cart-empty">Seu carrinho está vazio.</p>
      )}
    </main>
  )
}