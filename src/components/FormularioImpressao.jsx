import { useState } from 'react'

export default function FormularioImpressao() {
  const [arquivos, setArquivos] = useState([])
  const [enviado, setEnviado] = useState(false)

  function enviarPedido(event) {
    event.preventDefault()
    setEnviado(true)
  }

  return (
    <section className="print-form-page">
      <header className="print-banner text-center">
        <h1>Peça sua impressão</h1>
        <p>Envie seus arquivos, escolha as opções e a gente cuida do resto</p>
      </header>
      <form className="print-form" onSubmit={enviarPedido}>
        <div className="print-form-body">
          <h2>Formulário de impressão</h2>
          <div className="print-fields">
            <label>
              <span>Cor</span>
              <select className="form-select" defaultValue="Colorido">
                <option>Colorido</option>
                <option>Preto e branco</option>
              </select>
            </label>
            <label>
              <span>Tamanho do Papel</span>
              <select className="form-select" defaultValue="A4">
                <option>A4</option>
                <option>A3</option>
                <option>Carta</option>
              </select>
            </label>
            <label>
              <span>Quantidade de cópias</span>
              <select className="form-select" defaultValue="1">
                {[1, 2, 3, 4, 5, 10].map((quantidade) => <option key={quantidade}>{quantidade}</option>)}
              </select>
            </label>
            <label>
              <span>Lados</span>
              <select className="form-select" defaultValue="Frente e verso">
                <option>Frente e verso</option>
                <option>Apenas frente</option>
              </select>
            </label>
            <label>
              <span>Páginas</span>
              <select className="form-select" defaultValue="Todas">
                <option>Todas</option>
                <option>Selecionar páginas</option>
              </select>
            </label>
            <label>
              <span>Tipo de papel</span>
              <select className="form-select" defaultValue="Sulfite">
                <option>Sulfite</option>
                <option>Fotográfico</option>
                <option>Couchê</option>
              </select>
            </label>
          </div>
          <label className="print-file-field">
            <span>Arquivos</span>
            <span className="print-file-drop">{arquivos.length ? arquivos.map((arquivo) => arquivo.name).join(', ') : 'Selecione ou arraste seus arquivos aqui'}</span>
            <input type="file" multiple required onChange={(event) => setArquivos(Array.from(event.target.files ?? []))} />
          </label>
          <label className="print-notes-field">
            <span>Observações (Opcional)</span>
            <textarea className="form-control" rows="4" />
          </label>
          {enviado && <p className="print-confirmation" role="status">Pedido preparado. O envio será habilitado futuramente.</p>}
        </div>
        <div className="print-form-actions">
          <button className="btn btn-primary" type="submit">Pedir minha impressão</button>
        </div>
      </form>
    </section>
  )
}