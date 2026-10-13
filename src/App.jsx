import { useState } from 'react'
import categoriaArtigosReligiosos from './assets/categorias/categoria-artigos-religiosos.jpg'
import categoriaArteCriatividade from './assets/categorias/categoria-arte-criatividade.jpg'
import categoriaOrganizacao from './assets/categorias/categoria-organizacao.jpg'
import categoriaPapelaria from './assets/categorias/categoria-papelaria.jpg'
import categoriaPresentes from './assets/categorias/categoria-presentes.jpg'
import bannerVoltaAsAulas from './assets/carrosel/banner-volta-as-aulas.png'
import produtoCaderno from './assets/produtos/produto-caderno-capa-dura-universitario.jpg'
import produtoCaneta from './assets/produtos/produto-caneta-esferografica-bic.jpg'
import produtoMarcaTexto from './assets/produtos/produto-marca-texto-bic-brite-liner.jpg'
import produtoResma from './assets/produtos/produto-resma-papel-report-a4.jpg'
import produtoTerco from './assets/produtos/produto-terco-cordao-madeira.png'
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
  { name: 'Papelaria', image: categoriaPapelaria },
  { name: 'Arte e Criatividade', image: categoriaArteCriatividade },
  { name: 'Organização', image: categoriaOrganizacao },
  { name: 'Presentes', image: categoriaPresentes },
  { name: 'Artigos religiosos', image: categoriaArtigosReligiosos },
]

const todasCategorias = [
  ...categoriasHome,
  { name: 'Fardamento' },
  { name: 'Mais vendidos' },
]

const products = [
  { name: 'Caneta Esferográfica BIC Escrita Média Cristal Dura Mais, Preta', category: 'Papelaria', price: 'R$ 2,19', image: produtoCaneta },
  {
    name: 'Caderno Universitário Capa Dura 15X1 240 Folhas Brief Azul Spiral',
    category: 'Papelaria',
    price: 'R$ 19,99',
    image: produtoCaderno,
    brand: 'Spiral',
    description: 'Caderno universitário de capa dura para acompanhar seus estudos e organizar as anotações do dia a dia.',
    specifications: [
      'Formato: 200 mm x 275 mm',
      'Número de folhas: 240',
      'Número de matérias: 15 matérias',
      'Capa e contracapa: dura com papelão 820 g/m²',
      'Revestimento em papel couchê 120 g/m² com parte interna pautada',
      'Bolsa personalizada em papel 110 g/m²',
      'Miolo pautado padrão em papel offset 56 g/m²',
    ],
  },
  { name: 'Terço no Cordão com Triângulo de Nossa Senhora', category: 'Artigos religiosos', price: 'R$ 18,90', image: produtoTerco },
  { name: 'Resma de Papel A4 Report 75g 500 folhas', category: 'Papelaria', price: 'R$ 34,15', image: produtoResma },
  { name: 'Marca Texto BIC Brite Liner C/5', category: 'Papelaria', price: 'R$ 21,90', image: produtoMarcaTexto },
]

const slides = [
  { title: 'Volta às aulas!', description: 'Tudo o que você precisa pro ano letivo, num só lugar.', image: bannerVoltaAsAulas },
  { title: 'Ideias que ganham cor', description: 'Materiais para criar, desenhar e tirar seus planos do papel.', image: bannerVoltaAsAulas },
  { title: 'Seu espaço, do seu jeito', description: 'Encontre tudo para deixar a rotina mais organizada.', image: bannerVoltaAsAulas },
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
