# Lojinha a Graciosa

## Configuração do Firebase

O cadastro usa o Firebase Authentication (provedor de e-mail e senha) e grava o perfil na coleção `usuarios` do Cloud Firestore, usando o UID da conta como ID do documento. O login valida as credenciais no Authentication; a sessão é restaurada pelo Firebase quando a página é recarregada.

Antes de testar:

1. No Firebase Console do projeto, habilite **Authentication > Sign-in method > Email/Password**.
2. Crie o banco em **Firestore Database**.
3. Publique regras que permitam a cada usuário acessar apenas o documento de perfil associado ao seu UID, por exemplo:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

As configurações públicas do app Firebase estão em `src/firebase.js`. Não armazene senhas nos documentos do Firestore; elas são gerenciadas pelo Firebase Authentication.
