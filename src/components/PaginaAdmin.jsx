import { useState } from 'react'

const configuracoes = {
  destaque: {
    singular: 'destaque',
    campos: [
      { name: 'title', label: 'Título', required: true },
      { name: 'description', label: 'Descrição', type: 'textarea', required: true },
      { name: 'image', label: 'URL ou caminho da imagem', required: true },
    ],
  },
  categoria: {
    singular: 'categoria',
    campos: [
      { name: 'name', label: 'Nome da categoria', required: true },
      { name: 'image', label: 'URL ou caminho da imagem' },
    ],
  },
  produto: {
    singular: 'produto',
    campos: [
      { name: 'name', label: 'Nome do produto', required: true },
      { name: 'category', label: 'Categoria', type: 'category', required: true },
      { name: 'price', label: 'Preço', required: true, placeholder: 'R$ 0,00' },
      { name: 'image', label: 'URL ou caminho da imagem', required: true },
      { name: 'brand', label: 'Marca' },
      { name: 'description', label: 'Descrição', type: 'textarea' },
    ],
  },
}

export default function PaginaAdmin({ dialog, destaques, categorias, produtos, onSave, onClose }) {
  if (!dialog) return null

  const collections = { destaque: destaques, categoria: categorias, produto: produtos }
  return <AdminModal key={dialog.id} dialog={dialog} collections={collections} produtos={produtos} categorias={categorias} onSave={onSave} onClose={onClose} />
}

function AdminModal({ dialog, collections, produtos, categorias, onSave, onClose }) {
  const [draft, setDraft] = useState(() => dialog.index === null ? {} : { ...collections[dialog.tipo][dialog.index] })
  const [erro, setErro] = useState('')

  function saveItem(event) {
    event.preventDefault()
    const { tipo, index } = dialog
    const currentItems = collections[tipo]

    if (tipo === 'categoria' && currentItems.some((item, itemIndex) => item.name.trim().toLocaleLowerCase('pt-BR') === draft.name.trim().toLocaleLowerCase('pt-BR') && itemIndex !== index)) {
      setErro('Já existe uma categoria com esse nome.')
      return
    }

    const savedDraft = tipo === 'categoria' ? { ...draft, name: draft.name.trim() } : draft
    const updatedItems = index === null
      ? [...currentItems, savedDraft]
      : currentItems.map((item, itemIndex) => itemIndex === index ? savedDraft : item)
    const categoryChange = tipo === 'categoria' && index !== null
      ? { oldName: currentItems[index].name, newName: savedDraft.name }
      : null
    onSave(tipo, updatedItems, categoryChange)
    onClose()
  }

  function deleteItem() {
    const { tipo, index } = dialog
    onSave(tipo, collections[tipo].filter((_, itemIndex) => itemIndex !== index))
    onClose()
  }

  const categoryInUse = dialog.mode === 'delete'
    && dialog.tipo === 'categoria'
    && produtos.some((produto) => produto.category === categorias[dialog.index]?.name)
  const lastCategory = dialog.mode === 'delete' && dialog.tipo === 'categoria' && categorias.length === 1

  return (
    <div className="admin-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title">
        {dialog.mode === 'form' ? (
          <>
            <div className="admin-modal-heading">
              <div>
                <h2 id="admin-modal-title">{dialog.index === null ? 'Adicionar' : 'Editar'} {configuracoes[dialog.tipo].singular}</h2>
              </div>
              <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Fechar">×</button>
            </div>
            <form onSubmit={saveItem}>
              {configuracoes[dialog.tipo].campos.map((campo) => (
                <label className="admin-form-field" key={campo.name}>
                  {campo.label}
                  {campo.type === 'textarea' ? (
                    <textarea
                      required={campo.required}
                      rows="3"
                      value={draft[campo.name] || ''}
                      onChange={(event) => setDraft({ ...draft, [campo.name]: event.target.value })}
                    />
                  ) : campo.type === 'category' ? (
                    <select
                      required={campo.required}
                      value={draft[campo.name] || ''}
                      onChange={(event) => setDraft({ ...draft, [campo.name]: event.target.value })}
                    >
                      <option value="" disabled>Selecione uma categoria</option>
                      {categorias.map((categoria, index) => <option key={`${categoria.name}-${index}`} value={categoria.name}>{categoria.name}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      required={campo.required}
                      placeholder={campo.placeholder || ''}
                      value={draft[campo.name] || ''}
                      onChange={(event) => setDraft({ ...draft, [campo.name]: event.target.value })}
                    />
                  )}
                </label>
              ))}
              {erro && <p className="admin-form-error" role="alert">{erro}</p>}
              <div className="admin-modal-actions">
                <button type="button" className="admin-button admin-button-secondary" onClick={onClose}>Cancelar</button>
                <button type="submit" className="admin-button admin-button-primary">Salvar</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="admin-modal-heading">
              <div>
                <h2 id="admin-modal-title">Excluir {configuracoes[dialog.tipo].singular}?</h2>
              </div>
              <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Fechar">×</button>
            </div>
            <p className="admin-delete-copy">
              {categoryInUse
                ? 'Não é possível excluir esta categoria enquanto houver produtos associados. Edite esses produtos e escolha outra categoria primeiro.'
                : lastCategory
                  ? 'A loja precisa ter ao menos uma categoria para organizar os produtos.'
                : 'Esta ação remove o item da vitrine durante esta demonstração.'}
            </p>
            <div className="admin-modal-actions">
              <button type="button" className="admin-button admin-button-secondary" onClick={onClose}>Cancelar</button>
              {!categoryInUse && !lastCategory && <button type="button" className="admin-button admin-button-danger" onClick={deleteItem}>Sim, excluir</button>}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
