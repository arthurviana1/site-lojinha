import { useState } from 'react'
import CabecalhoAcesso from './CabecalhoAcesso.jsx'

export default function PaginaLogin({ onLogin, onHome, onRegister, onRecover }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviarFormulario(event) {
    event.preventDefault()
    setErro('')
    setEnviando(true)
    try {
      await onLogin(email.trim(), senha)
    } catch (error) {
      setErro(error.message || 'Não foi possível entrar. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="login-page">
      <CabecalhoAcesso onHome={onHome} />
      <section className="login-content">
        <form className="login-form" onSubmit={enviarFormulario}>
          <h1>Faça seu login</h1>
          <label htmlFor="login-email">E-mail</label>
          <input id="login-email" className="form-control" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <div className="login-password-heading">
            <label htmlFor="login-password">Senha</label>
            <button type="button" onClick={onRecover}>Esqueceu senha?</button>
          </div>
          <input id="login-password" className="form-control" type="password" autoComplete="current-password" value={senha} onChange={(event) => setSenha(event.target.value)} required />
          {erro && <p className="login-error" role="alert">{erro}</p>}
          <button className="login-submit btn btn-primary" type="submit" disabled={enviando}>{enviando ? 'Entrando...' : 'Continuar'}</button>
          <p className="login-register-prompt">Não possui cadastro?</p>
          <button className="login-register btn btn-outline-primary" type="button" onClick={onRegister}>Crie sua conta</button>
        </form>
      </section>
    </main>
  )
}