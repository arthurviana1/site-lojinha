import Imagem from './Imagem.jsx'

export default function CabecalhoLoja({ categorias, category, activeNav, onHome, onNavigate, onOpenProducts, onOpenPrint, onOpenAccount, onOpenCart, onCategoryChange, onSearchSubmit, search, setSearch }) {
  return (
    <header className="site-header container-fluid d-flex align-items-center">
      <a className="brand flex-shrink-0" href="#inicio" onClick={(event) => { event.preventDefault(); onHome() }} aria-label="Lojinha a Graciosa, página inicial">
        <Imagem src="/images/logo-lojinha.webp" alt="Logo Lojinha a Graciosa" label="LG" className="brand-image" />
      </a>
      <form className="search-bar input-group" onSubmit={(event) => { event.preventDefault(); onSearchSubmit() }}>
        <label className="visually-hidden" htmlFor="store-search">Pesquisar produtos</label>
        <input id="store-search" className="form-control" type="search" placeholder="Pesquisar" value={search} onChange={(event) => setSearch(event.target.value)} />
        <label className="visually-hidden" htmlFor="category-select">Categoria</label>
        <select id="category-select" className="form-select" value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option>Todas as categorias</option>
          {categorias.map((categoria) => <option key={categoria.name}>{categoria.name}</option>)}
        </select>
        <button className="search-button btn" type="submit" aria-label="Pesquisar">⌕</button>
      </form>
      <nav className="main-nav nav" aria-label="Navegação principal">
        <a className={`nav-link ${activeNav === 'produtos' ? 'nav-current' : ''}`} href="#produtos" aria-current={activeNav === 'produtos' ? 'location' : undefined} onClick={(event) => { event.preventDefault(); onOpenProducts() }}>Produtos</a>
        <a className={`nav-link ${activeNav === 'impressao' ? 'nav-current' : ''}`} href="#impressao" aria-current={activeNav === 'impressao' ? 'location' : undefined} onClick={(event) => { event.preventDefault(); onOpenPrint() }}>Impressão</a>
        <a className={`nav-link ${activeNav === 'contato' ? 'nav-current' : ''}`} href="#contato" aria-current={activeNav === 'contato' ? 'location' : undefined} onClick={(event) => { event.preventDefault(); onNavigate('contato', 'contato') }}>Contato</a>
      </nav>
      <div className="header-actions d-flex align-items-center">
        <button className="cart-link btn" type="button" onClick={onOpenCart} aria-label="Carrinho" title="Carrinho"><Imagem src="/images/icone-carrinho.webp" alt="" label="Carrinho" className="cart-icon" /></button>
        <button className="header-link account-link btn" type="button" onClick={onOpenAccount} aria-label="Minha conta" title="Minha conta">
          <Imagem src="/images/icone-perfil.webp" alt="" label="Perfil" className="account-icon" />
        </button>
      </div>
    </header>
  )
}