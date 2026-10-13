import { useState } from 'react'
import Imagem from './Imagem.jsx'

export default function PaginaLogin({ onLogin, onHome, onRegister, onRecover }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function enviarFormulario(event) {
    event.preventDefault()
    if (email.trim() !== '1' || senha !== '1') {
      setErro('E-mail ou senha incorretos.')
      return
    }
    setErro('')
    onLogin()
  }

  return (
    <main className="login-page">
      <header className="login-brandbar">
        <a href="#inicio" onClick={(event) => { event.preventDefault(); onHome() }} aria-label="Voltar à página inicial">
          <Imagem src="/images/logo-lojinha.webp" alt="Logo Lojinha a Graciosa" label="LG" className="login-logo" />
        </a>
      </header>
      <section className="login-content">
        <form className="login-form" onSubmit={enviarFormulario}>
          <h1>Faça seu login</h1>
          <label htmlFor="login-email">E-mail</label>
          <input id="login-email" className="form-control" type="text" inputMode="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <div className="login-password-heading">
            <label htmlFor="login-password">Senha</label>
            <button type="button" onClick={onRecover}>Esqueceu senha?</button>
          </div>
          <input id="login-password" className="form-control" type="password" autoComplete="current-password" value={senha} onChange={(event) => setSenha(event.target.value)} required />
          {erro && <p className="login-error" role="alert">{erro}</p>}
          <button className="login-submit btn btn-primary" type="submit">Continuar</button>
          <p className="login-register-prompt">Não possui cadastro?</p>
          <button className="login-register btn btn-outline-primary" type="button" onClick={onRegister}>Crie sua conta</button>
        </form>
      </section>
    </main>
  )
}