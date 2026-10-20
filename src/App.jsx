import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
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
import { auth, db } from './firebase.js'
import { firebaseErrorMessage } from './firebaseErrorMessage.js'
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
  const [authCarregando, setAuthCarregando] = useState(true)
  const [erroSessao, setErroSessao] = useState('')
  const filteredProducts = products.filter((product) => product.name.toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR')))
  const paginaAcesso = ['/login', '/cadastro', '/recuperar-senha'].includes(location.pathname)
  const activeNav = location.pathname.startsWith('/impressao')
    ? 'impressao'
    : location.pathname.startsWith('/categoria/') || location.pathname.startsWith('/produto/') || location.hash === '#produtos'
      ? 'produtos'
      : location.hash === '#contato' ? 'contato' : ''

  useEffect(() => {
    let requestId = 0
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const currentRequest = ++requestId
      setErroSessao('')
      if (!firebaseUser) {
        setUsuario(null)
        setAuthCarregando(false)
        return
      }

      setAuthCarregando(true)
      try {
        const profileSnapshot = await getDoc(doc(db, 'usuarios', firebaseUser.uid))
        if (currentRequest !== requestId) return
        const profile = profileSnapshot.exists() ? profileSnapshot.data() : {}
        setUsuario({
          uid: firebaseUser.uid,
          nome: profile.nome || firebaseUser.displayName || '',
          sobrenome: profile.sobrenome || '',
          email: firebaseUser.email || '',
          telefone: profile.telefone || '',
          nascimento: profile.nascimento || '',
        })
      } catch (error) {
        if (currentRequest !== requestId) return
        setUsuario({
          uid: firebaseUser.uid,
          nome: firebaseUser.displayName || '',
          sobrenome: '',
          email: firebaseUser.email || '',
          telefone: '',
          nascimento: '',
        })
        setErroSessao(firebaseErrorMessage(error, 'Não foi possível carregar os dados do seu perfil.'))
      } finally {
        if (currentRequest === requestId) setAuthCarregando(false)
      }
    })

    return unsubscribe
  }, [])

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

  async function login(email, senha) {
    setErroSessao('')
    setAuthCarregando(true)
    try {
      await signInWithEmailAndPassword(auth, email, senha)
      navigate('/conta')
    } catch (error) {
      setAuthCarregando(false)
      throw new Error(firebaseErrorMessage(error, 'Não foi possível entrar. Tente novamente.'))
    }
  }

  async function createAccount(newUser) {
    setErroSessao('')
    setAuthCarregando(true)
    const { senha, ...profile } = newUser
    let credential
    try {
      credential = await createUserWithEmailAndPassword(auth, newUser.email, senha)
      await setDoc(doc(db, 'usuarios', credential.user.uid), {
        ...profile,
        uid: credential.user.uid,
        criadoEm: new Date().toISOString(),
      })
      setUsuario({ ...profile, uid: credential.user.uid, email: credential.user.email })
      setAuthCarregando(false)
      navigate('/conta')
    } catch (error) {
      if (credential?.user) {
        try {
          await deleteUser(credential.user)
        } catch (cleanupError) {
          console.error('Não foi possível remover a conta após falha ao salvar o perfil:', cleanupError)
          setAuthCarregando(false)
          throw new Error('A conta foi criada, mas não foi possível salvar o perfil. Entre em contato com o suporte.')
        }
      }
      setAuthCarregando(false)
      throw new Error(firebaseErrorMessage(error, 'Não foi possível criar sua conta. Tente novamente.'))
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (error) {
      setErroSessao(firebaseErrorMessage(error, 'Não foi possível sair da sua conta. Tente novamente.'))
    }
  }

  async function saveAccount(updatedUser) {
    const firebaseUser = auth.currentUser
    if (!firebaseUser) throw new Error('Sua sessão expirou. Entre novamente.')

    const { nome, sobrenome, telefone, nascimento } = updatedUser
    try {
      await setDoc(doc(db, 'usuarios', firebaseUser.uid), { nome, sobrenome, telefone, nascimento }, { merge: true })
      const savedUser = { ...updatedUser, uid: firebaseUser.uid, email: firebaseUser.email || updatedUser.email }
      setUsuario(savedUser)
      return savedUser
    } catch (error) {
      throw new Error(firebaseErrorMessage(error, 'Não foi possível salvar seus dados. Tente novamente.'))
    }
  }

  async function recoverPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      throw new Error(firebaseErrorMessage(error, 'Não foi possível enviar as instruções. Tente novamente.'))
    }
  }

  function showProducts() {
    navigateTo('produtos')
  }

  return (
    <div className={`store-shell ${paginaAcesso ? 'tela-acesso' : ''}`}>
      {erroSessao && <div className="alert alert-danger m-3" role="alert">{erroSessao}</div>}
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
        <Route path="/recuperar-senha" element={<PaginaRecuperacao onHome={goHome} onBackToLogin={() => navigate('/login')} onRecover={recoverPassword} />} />
        <Route path="/conta" element={authCarregando ? <main className="store-main"><p className="p-4">Carregando sua conta...</p></main> : usuario ? <main className="store-main"><PaginaConta usuario={usuario} onLogout={logout} onSave={saveAccount} /></main> : <Navigate to="/login" replace />} />
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
