import { useState } from 'react'
import logoLojinha from '../assets/logo/logo-lojinha.png'
import Imagem from './Imagem.jsx'

const camposIniciais = {
  nome: '',
  sobrenome: '',
  email: '',
  telefone: '',
  senha: '',
  confirmarSenha: '',
}

export default function PaginaCadastro({ onHome, onCreateAccount }) {
  const [campos, setCampos] = useState(camposIniciais)
  const [erro, setErro] = useState('')

  function atualizarCampo(event) {
    setCampos({ ...campos, [event.target.name]: event.target.value })
    setErro('')
  }

  function enviarCadastro(event) {
    event.preventDefault()
    if (campos.senha !== campos.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    onCreateAccount({
      nome: campos.nome.trim(),
      sobrenome: campos.sobrenome.trim(),
      email: campos.email.trim(),
      telefone: campos.telefone.trim(),
      nascimento: '',
    })
  }

  return (
    <main className="register-page">
      <header className="login-brandbar">
        <a href="#inicio" onClick={(event) => { event.preventDefault(); onHome() }} aria-label="Voltar à página inicial">
          <Imagem src={logoLojinha} alt="Logo Lojinha a Graciosa" label="LG" className="login-logo" />
        </a>
      </header>
      <section className="register-content">
        <form className="register-form" onSubmit={enviarCadastro}>
          <h1>Crie sua conta</h1>
          <div className="register-fields">
            <div>
              <label htmlFor="register-name">Nome</label>
              <input id="register-name" className="form-control" name="nome" value={campos.nome} onChange={atualizarCampo} autoComplete="given-name" required />
            </div>
            <div>
              <label htmlFor="register-surname">Sobrenome</label>
              <input id="register-surname" className="form-control" name="sobrenome" value={campos.sobrenome} onChange={atualizarCampo} autoComplete="family-name" required />
            </div>
            <div>
              <label htmlFor="register-email">Email</label>
              <input id="register-email" className="form-control" name="email" type="email" value={campos.email} onChange={atualizarCampo} autoComplete="email" required />
            </div>
            <div>
              <label htmlFor="register-phone">Telefone</label>
              <input id="register-phone" className="form-control" name="telefone" type="tel" value={campos.telefone} onChange={atualizarCampo} autoComplete="tel" required />
            </div>
            <div>
              <label htmlFor="register-password">Senha</label>
              <input id="register-password" className="form-control" name="senha" type="password" value={campos.senha} onChange={atualizarCampo} autoComplete="new-password" required />
            </div>
            <div>
              <label htmlFor="register-confirm-password">Confirmar Senha</label>
              <input id="register-confirm-password" className="form-control" name="confirmarSenha" type="password" value={campos.confirmarSenha} onChange={atualizarCampo} autoComplete="new-password" required />
            </div>
          </div>
          {erro && <p className="register-error" role="alert">{erro}</p>}
          <button className="register-submit btn btn-primary" type="submit">Criar conta</button>
        </form>
      </section>
    </main>
  )
}