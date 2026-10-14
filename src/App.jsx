import { useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
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

function RotaCategoria({ categorias, produtos }) {
  const navigate = useNavigate()
  const { nomeCategoria } = useParams()
  const categoria = decodeURIComponent(nomeCategoria)

  return (
    <main className="store-main">
      <PaginaCategoria
        categorias={categorias}
        categoriaSelecionada={categoria}
        onSelectCategory={(nome) => navigate(`/categoria/${encodeURIComponent(nome)}`)}
        onSelectProduct={(produto) => navigate(`/produto/${products.indexOf(produto)}`)}
        onHome={() => navigate('/')}
        produtos={produtos}
      />
    </main>
  )
}

function RotaProduto({ produtos }) {
  const navigate = useNavigate()
  const { idProduto } = useParams()
  const produto = produtos[Number(idProduto)]

  if (!produto) return <Navigate to="/" replace />

  return (
    <main className="store-main">
      <PaginaProduto produto={produto} onBack={() => navigate(`/categoria/${encodeURIComponent(produto.category)}`)} />
    </main>
  )
}

function Loja() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSlide, setActiveSlide] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas as categorias')
  const [usuario, setUsuario] = useState(null)
  const filteredProducts = products.filter((product) => product.name.toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR')))
  const paginaAcesso = ['/login', '/cadastro', '/recuperar-senha'].includes(location.pathname)
  const activeNav = location.pathname.startsWith('/impressao')
    ? 'impressao'
    : location.pathname.startsWith('/categoria/') || location.pathname.startsWith('/produto/') || location.hash === '#produtos'
      ? 'produtos'
      : location.hash === '#contato' ? 'contato' : ''

  function navigateTo(section) {
    navigate(`/#${section}`)
    window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  function goHome() {
    navigate('/')
  }

  function openProductCatalog() {
    navigate('/categoria/Categorias')
  }

  function openPrinting() {
    navigate('/impressao')
  }

  function openPrintForm() {
    navigate('/impressao/formulario')
  }

  function openAccount() {
    navigate(usuario ? '/conta' : '/login')
  }

  function openRegistration() {
    navigate('/cadastro')
  }

  function openRecovery() {
    navigate('/recuperar-senha')
  }

  function openCart() {
    navigate('/carrinho')
  }

  function login() {
    setUsuario({ nome: 'Valter', sobrenome: '', email: '1', telefone: '', nascimento: '' })
    navigate('/conta')
  }

  function createAccount(newUser) {
    setUsuario(newUser)
    navigate('/conta')
  }

  function logout() {
    setUsuario(null)
    navigate('/login')
  }

  return (
    <div className={`store-shell ${paginaAcesso ? 'tela-acesso' : ''}`}>
      {!paginaAcesso && (
        <CabecalhoLoja
          categorias={categoriasHome}
          category={category}
          activeNav={activeNav}
          onHome={goHome}
          onOpenProducts={openProductCatalog}
          onOpenPrint={openPrinting}
          onOpenAccount={openAccount}
          onOpenCart={openCart}
          onCategoryChange={(value) => { setCategory(value); showProducts() }}
          onSearchSubmit={() => category === 'Todas as categorias' ? navigateTo('produtos') : navigate(`/categoria/${encodeURIComponent(category)}`)}
          search={search}
          setSearch={setSearch}
        />
      )}
      <Routes>
        <Route path="/" element={(
          <main className="store-main">
            <CarrosselDestaques activeSlide={activeSlide} onChangeSlide={setActiveSlide} slides={slides} />
            <SecaoCategorias categorias={categoriasHome} onSelectCategory={(nome) => navigate(`/categoria/${encodeURIComponent(nome)}`)} onShowAll={openProductCatalog} />
            <SecaoProdutos produtos={filteredProducts} onSelectProduct={(produto) => navigate(`/produto/${products.indexOf(produto)}`)} />
          </main>
        )} />
        <Route path="/categoria/:nomeCategoria" element={<RotaCategoria categorias={todasCategorias} produtos={products} />} />
        <Route path="/produto/:idProduto" element={<RotaProduto produtos={products} />} />
        <Route path="/login" element={<PaginaLogin onLogin={login} onHome={goHome} onRegister={openRegistration} onRecover={openRecovery} />} />
        <Route path="/cadastro" element={<PaginaCadastro onHome={goHome} onCreateAccount={createAccount} />} />
        <Route path="/recuperar-senha" element={<PaginaRecuperacao onHome={goHome} onBackToLogin={() => navigate('/login')} />} />
        <Route path="/conta" element={usuario ? <main className="store-main"><PaginaConta usuario={usuario} onLogout={logout} onSave={setUsuario} /></main> : <Navigate to="/login" replace />} />
        <Route path="/carrinho" element={<PaginaCarrinho />} />
        <Route path="/impressao" element={<main className="store-main"><PaginaImpressao onRequest={openPrintForm} /></main>} />
        <Route path="/impressao/formulario" element={<main className="store-main"><FormularioImpressao /></main>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {location.pathname !== '/carrinho' && <Rodape />}
    </div>
  )
}

export default Loja
