import { useState } from 'react'
import Imagem from './Imagem.jsx'

export default function PaginaRecuperacao({ onHome, onBackToLogin }) {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  function enviarRecuperacao(event) {
    event.preventDefault()
    setEnviado(true)
  }

  return (
    <main className="recovery-page">
      <header className="login-brandbar">
        <a href="#inicio" onClick={(event) => { event.preventDefault(); onHome() }} aria-label="Voltar à página inicial">
          <Imagem src="/images/logo-lojinha.webp" alt="Logo Lojinha a Graciosa" label="LG" className="login-logo" />
        </a>
      </header>
      <section className="recovery-content">
        <form className="recovery-form" onSubmit={enviarRecuperacao}>
          <h1>Recuperar senha</h1>
          <label htmlFor="recovery-email">Email</label>
          <input id="recovery-email" className="form-control" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <p>Pronto! Se este e-mail estiver cadastrado, você receberá em instantes um link para redefinir sua senha. Verifique também a caixa de spam.</p>
          {enviado && <p className="recovery-confirmation" role="status">Se o e-mail estiver cadastrado, enviaremos as instruções para recuperação.</p>}
          <button className="recovery-submit btn btn-primary" type="submit">Recuperar</button>
          <button className="recovery-back btn" type="button" onClick={onBackToLogin}>Voltar para o login</button>
        </form>
      </section>
    </main>
  )
}