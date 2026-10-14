import { useState } from 'react'

const camposImpressao = [
  { nome: 'Cor', padrao: 'Colorido', opcoes: ['Colorido', 'Preto e branco'] },
  { nome: 'Tamanho do Papel', padrao: 'A4', opcoes: ['A4', 'A3', 'Carta'] },
  { nome: 'Quantidade de cópias', padrao: '1', opcoes: [1, 2, 3, 4, 5, 10] },
  { nome: 'Lados', padrao: 'Frente e verso', opcoes: ['Frente e verso', 'Apenas frente'] },
  { nome: 'Páginas', padrao: 'Todas', opcoes: ['Todas', 'Selecionar páginas'] },
  { nome: 'Tipo de papel', padrao: 'Sulfite', opcoes: ['Sulfite', 'Fotográfico', 'Couchê'] },
]

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
            {camposImpressao.map((campo) => (
              <label key={campo.nome}>
                <span>{campo.nome}</span>
                <select className="form-select" defaultValue={campo.padrao}>
                  {campo.opcoes.map((opcao) => <option key={opcao}>{opcao}</option>)}
                </select>
              </label>
            ))}
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