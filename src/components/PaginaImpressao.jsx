import ilustracaoImpressao from '../assets/impressao/ilustração.png'

export default function PaginaImpressao({ onRequest }) {
  return (
    <section className="print-page" aria-label="Serviços de impressão">
      <header className="print-banner text-center">
        <h1>Peça sua impressão</h1>
        <p>Envie seus arquivos, escolha as opções e a gente cuida do resto</p>
      </header>
      <section className="print-explanation" aria-label="Informações sobre impressão">
        <h2>Explicação ilustrativa</h2>
        <img className="print-explanation-image" src={ilustracaoImpressao} alt="Ilustração explicando as opções e etapas do pedido de impressão" />
      </section>
      <div className="print-actions">
        <button className="btn btn-primary" type="button" onClick={onRequest}>Pedir minha impressão</button>
      </div>
    </section>
  )
}