import { useState } from 'react'
import './Acesso.css'
import CarrosselDestaques from './components/CarrosselDestaques.jsx'
import CabecalhoLoja from './components/CabecalhoLoja.jsx'
import PaginaCategoria from './components/PaginaCategoria.jsx'
import PaginaCadastro from './components/PaginaCadastro.jsx'
import PaginaCarrinho from './components/PaginaCarrinho.jsx'
import PaginaConta from './components/PaginaConta.jsx'
import FormularioImpressao from './components/FormularioImpressao.jsx'
import PaginaImpressao from './components/PaginaImpressao.jsx'
import PaginaLogin from './components/PaginaLogin.jsx'
import PaginaRecuperacao from './components/PaginaRecuperacao.jsx'
import PaginaProduto from './components/PaginaProduto.jsx'
import Rodape from './components/Rodape.jsx'
import SecaoCategorias from './components/SecaoCategorias.jsx'
import SecaoProdutos from './components/SecaoProdutos.jsx'
import './App.css'

const categoriasHome = [
  { name: 'Papelaria', image: '/images/categoria-papelaria.webp' },
  { name: 'Arte e Criatividade', image: '/images/categoria-arte-criatividade.webp' },
  { name: 'Organização', image: '/images/categoria-organizacao.webp' },
  { name: 'Presentes', image: '/images/categoria-presentes.webp' },
  { name: 'Artigos religiosos', image: '/images/categoria-artigos-religiosos.webp' },
]

const todasCategorias = [
  ...categoriasHome,
  { name: 'Fardamento' },
  { name: 'Mais vendidos' },
]

const products = [
  { name: 'Caneta Esferográfica BIC Escrita Média Cristal Dura Mais, Preta', category: 'Papelaria', price: 'R$ 2,19', image: '/images/produto-caneta-esferografica-bic.webp' },
  {
    name: 'Caderno Universitário Capa Dura 15X1 240 Folhas Brief Azul Spiral',
    category: 'Papelaria',
    price: 'R$ 19,99',
    image: '/images/produto-caderno-capa-dura-universitario.webp',
    gallery: [
      '/images/produto-caderno-capa-dura-universitario.webp',
      '/images/produto-caderno-capa-dura-universitario-verso.webp',
      '/images/produto-caderno-capa-dura-universitario-detalhe.webp',
    ],
    brand: 'Spiral',
    description: 'Caderno universitário de capa dura para acompanhar seus estudos e organizar as anotações do dia a dia.',
    specifications: [
      'Formato: 200 mm x 275 mm',
      'Número de folhas: 240 folhas',
      'Número de matérias: 15 matérias',
      'Capa e contracapa: dura com papelão 820 g/m²',
      'Revestimento em papel couchê 120 g/m² com parte interna pautada',
      'Bolsa personalizada em papel 110 g/m²',
      'Miolo pautado padrão em papel offset 56 g/m²',
    ],
  },
  { name: 'Terço no Cordão com Triângulo de Nossa Senhora', category: 'Artigos religiosos', price: 'R$ 18,90', image: '/images/produto-terco-cordao-madeira.webp' },
  { name: 'Resma de Papel A4 Report 75g 500 folhas', category: 'Papelaria', price: 'R$ 34,15', image: '/images/produto-resma-papel-report-a4.webp' },
  { name: 'Marca Texto BIC Brite Liner C/5', category: 'Papelaria', price: 'R$ 21,90', image: '/images/produto-marca-texto-bic-brite-liner.webp' },
]

const slides = [
  { title: 'Volta às aulas!', description: 'Tudo o que você precisa pro ano letivo, num só lugar.', image: '/images/banner-volta-as-aulas.webp' },
  { title: 'Ideias que ganham cor', description: 'Materiais para criar, desenhar e tirar seus planos do papel.', image: '/images/banner-arte-e-criatividade.webp' },
  { title: 'Seu espaço, do seu jeito', description: 'Encontre tudo para deixar a rotina mais organizada.', image: '/images/banner-organize-seus-estudos.webp' },
]

function Loja() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas as categorias')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeNav, setActiveNav] = useState('')
  const [paginaAcesso, setPaginaAcesso] = useState('')
  const [usuario, setUsuario] = useState(null)
  const filteredProducts = products.filter((product) => product.name.toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR')))

  function showProducts() {
    document.querySelector('#produtos')?.scrollIntoView({ behavior: 'smooth' })
  }

  function navigateTo(section, navItem) {
    setPaginaAcesso('')
    setSelectedCategory('')
    setSelectedProduct(null)
    setActiveNav(navItem)
    window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  function goHome() {
    setPaginaAcesso('')
    setSelectedCategory('')
    setSelectedProduct(null)
    setActiveNav('')
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
  }

  function openProductCatalog() {
    setPaginaAcesso('')
    setSelectedCategory('Categorias')
    setSelectedProduct(null)
    setActiveNav('produtos')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openPrinting() {
    setPaginaAcesso('impressao')
    setSelectedCategory('')
    setSelectedProduct(null)
    setActiveNav('impressao')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openPrintForm() {
    setPaginaAcesso('formulario-impressao')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openAccount() {
    setSelectedCategory('')
    setSelectedProduct(null)
    setPaginaAcesso(usuario ? 'conta' : 'login')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openRegistration() {
    setPaginaAcesso('cadastro')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openRecovery() {
    setPaginaAcesso('recuperar')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openCart() {
    setPaginaAcesso('carrinho')
    setSelectedCategory('')
    setSelectedProduct(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function login() {
    setUsuario({ nome: 'Valter', sobrenome: '', email: '1', telefone: '', nascimento: '' })
    setPaginaAcesso('conta')
  }

  function createAccount(newUser) {
    setUsuario(newUser)
    setPaginaAcesso('conta')
  }

  function logout() {
    setUsuario(null)
    setPaginaAcesso('login')
  }

  return (
    <div className={`store-shell ${['login', 'cadastro', 'recuperar'].includes(paginaAcesso) ? 'tela-acesso' : ''}`}>
      {!['login', 'cadastro', 'recuperar'].includes(paginaAcesso) && (
        <CabecalhoLoja
          categorias={categoriasHome}
          category={category}
          activeNav={activeNav}
          onHome={goHome}
          onNavigate={navigateTo}
          onOpenProducts={openProductCatalog}
          onOpenPrint={openPrinting}
          onOpenAccount={openAccount}
          onOpenCart={openCart}
          onCategoryChange={(value) => { setCategory(value); navigateTo('produtos', 'produtos') }}
          onSearchSubmit={() => category === 'Todas as categorias' ? showProducts() : setSelectedCategory(category)}
          search={search}
          setSearch={setSearch}
        />
      )}
      {paginaAcesso === 'login' ? (
        <PaginaLogin onLogin={login} onHome={goHome} onRegister={openRegistration} onRecover={openRecovery} />
      ) : paginaAcesso === 'cadastro' ? (
        <PaginaCadastro onHome={goHome} onCreateAccount={createAccount} />
      ) : paginaAcesso === 'recuperar' ? (
        <PaginaRecuperacao onHome={goHome} onBackToLogin={() => setPaginaAcesso('login')} />
      ) : paginaAcesso === 'carrinho' ? (
        <PaginaCarrinho />
      ) : (
        <main className="store-main">
          {paginaAcesso === 'impressao' ? (
            <PaginaImpressao onRequest={openPrintForm} />
          ) : paginaAcesso === 'formulario-impressao' ? (
            <FormularioImpressao />
          ) : paginaAcesso === 'conta' ? (
            <PaginaConta usuario={usuario} onLogout={logout} onSave={setUsuario} />
          ) : selectedProduct ? (
            <PaginaProduto produto={selectedProduct} onBack={() => setSelectedProduct(null)} />
          ) : selectedCategory ? (
            <PaginaCategoria
              categorias={todasCategorias}
              categoriaSelecionada={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectProduct={setSelectedProduct}
              onHome={goHome}
              produtos={products}
            />
          ) : (
            <>
              <CarrosselDestaques activeSlide={activeSlide} onChangeSlide={setActiveSlide} slides={slides} />
              <SecaoCategorias categorias={categoriasHome} onSelectCategory={setSelectedCategory} onShowAll={() => setSelectedCategory('Categorias')} />
              <SecaoProdutos produtos={filteredProducts} onSelectProduct={setSelectedProduct} />
            </>
          )}
        </main>
      )}
      {paginaAcesso !== 'carrinho' && <Rodape />}
    </div>
  )
}

export default Loja
