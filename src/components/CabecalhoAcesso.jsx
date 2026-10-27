import logoLojinha from '../assets/logo/logo-lojinha.png'
import Imagem from './Imagem.jsx'

export default function CabecalhoAcesso({ onHome }) {
  function voltarParaInicio(event) {
    event.preventDefault()
    onHome()
  }

  return (
    <header className="login-brandbar">
      <a href="#inicio" onClick={voltarParaInicio} aria-label="Voltar à página inicial">
        <Imagem src={logoLojinha} alt="Logo Lojinha a Graciosa" label="LG" className="login-logo" />
      </a>
    </header>
  )
}
