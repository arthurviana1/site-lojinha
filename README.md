# React + Vite

## Firebase: cadastro e login

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

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
