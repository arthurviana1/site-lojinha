import { useState } from 'react'
import iconePerfil from '../assets/icones/icone-perfil.png'
import Imagem from './Imagem.jsx'

export default function PaginaConta({ usuario, onLogout, onSave }) {
  const [dados, setDados] = useState(usuario)
  const [salvo, setSalvo] = useState(false)

  function atualizarCampo(event) {
    setDados({ ...dados, [event.target.name]: event.target.value })
    setSalvo(false)
  }

  function cancelar() {
    setDados(usuario)
    setSalvo(false)
  }

  function salvar(event) {
    event.preventDefault()
    onSave(dados)
    setSalvo(true)
  }

  return (
    <section className="account-page container-fluid">
      <aside className="account-sidebar">
        <div className="account-profile">
          <Imagem src={iconePerfil} alt="Perfil do usuário" label="Perfil" className="account-user-icon" />
          <p>Olá, {dados.nome || 'Valter'}</p>
        </div>
        <div className="account-menu">
          <div className="account-menu-active"><span aria-hidden="true">◎</span> Informações do usuário</div>
          <a href="#contato">Suporte</a>
          <button type="button" onClick={onLogout}>Sair</button>
        </div>
      </aside>
      <form className="account-form" onSubmit={salvar}>
        <h1>Informações pessoais</h1>
        <div className="row g-2">
          <div className="col-sm-6">
            <label htmlFor="account-name">Nome</label>
            <input id="account-name" className="form-control" name="nome" value={dados.nome} onChange={atualizarCampo} />
          </div>
          <div className="col-sm-6">
            <label htmlFor="account-surname">Sobrenome</label>
            <input id="account-surname" className="form-control" name="sobrenome" value={dados.sobrenome} onChange={atualizarCampo} />
          </div>
          <div className="col-12">
            <label htmlFor="account-email">Gmail</label>
            <input id="account-email" className="form-control" name="email" value={dados.email} onChange={atualizarCampo} />
          </div>
          <div className="col-sm-6">
            <label htmlFor="account-phone">Telefone</label>
            <input id="account-phone" className="form-control" name="telefone" value={dados.telefone} onChange={atualizarCampo} />
          </div>
          <div className="col-sm-6">
            <label htmlFor="account-birthdate">Data de nascimento</label>
            <input id="account-birthdate" className="form-control" name="nascimento" type="date" value={dados.nascimento} onChange={atualizarCampo} />
          </div>
        </div>
        {salvo && <p className="account-saved" role="status">Informações salvas nesta sessão.</p>}
        <div className="account-actions">
          <button className="btn btn-outline-primary" type="button" onClick={cancelar}>Cancelar</button>
          <button className="btn btn-primary" type="submit">Salvar</button>
        </div>
      </form>
    </section>
  )
}