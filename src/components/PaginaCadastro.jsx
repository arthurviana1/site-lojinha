import { useState } from 'react'
import CabecalhoAcesso from './CabecalhoAcesso.jsx'

const valoresIniciais = {
  nome: '',
  sobrenome: '',
  email: '',
  telefone: '',
  senha: '',
  confirmarSenha: '',
}

const camposCadastro = [
  { id: 'register-name', name: 'nome', label: 'Nome', autoComplete: 'given-name' },
  { id: 'register-surname', name: 'sobrenome', label: 'Sobrenome', autoComplete: 'family-name' },
  { id: 'register-email', name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { id: 'register-phone', name: 'telefone', label: 'Telefone', type: 'tel', autoComplete: 'tel' },
  { id: 'register-password', name: 'senha', label: 'Senha', type: 'password', autoComplete: 'new-password' },
  { id: 'register-confirm-password', name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', autoComplete: 'new-password' },
]

export default function PaginaCadastro({ onHome, onCreateAccount }) {
  const [campos, setCampos] = useState(valoresIniciais)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  function atualizarCampo(event) {
    const { name, value } = event.target
    setCampos((atuais) => ({ ...atuais, [name]: value }))
    setErro('')
  }

  async function enviarCadastro(event) {
    event.preventDefault()
    if (campos.senha !== campos.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    setErro('')
    setEnviando(true)
    try {
      await onCreateAccount({
        nome: campos.nome.trim(),
        sobrenome: campos.sobrenome.trim(),
        email: campos.email.trim(),
        telefone: campos.telefone.trim(),
        senha: campos.senha,
        nascimento: '',
      })
    } catch (error) {
      setErro(error.message || 'Não foi possível criar sua conta. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="register-page">
      <CabecalhoAcesso onHome={onHome} />
      <section className="register-content">
        <form className="register-form" onSubmit={enviarCadastro}>
          <h1>Crie sua conta</h1>
          <div className="register-fields">
            {camposCadastro.map(({ id, name, label, type = 'text', autoComplete }) => (
              <div key={id}>
                <label htmlFor={id}>{label}</label>
                <input
                  id={id}
                  className="form-control"
                  name={name}
                  type={type}
                  value={campos[name]}
                  onChange={atualizarCampo}
                  autoComplete={autoComplete}
                  required
                />
              </div>
            ))}
          </div>
          {erro && <p className="register-error" role="alert">{erro}</p>}
          <button className="register-submit btn btn-primary" type="submit" disabled={enviando}>{enviando ? 'Criando conta...' : 'Criar conta'}</button>
        </form>
      </section>
    </main>
  )
}