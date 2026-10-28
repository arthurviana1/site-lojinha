# Lojinha a Graciosa

## Configuração do Firebase

O cadastro usa o Firebase Authentication (provedor de e-mail e senha) e grava o perfil na coleção `usuarios` do Cloud Firestore, usando o UID da conta como ID do documento. O login valida as credenciais no Authentication. Ao abrir/recarregar o app, a sessão anterior é encerrada para que todos comecem como visitantes deslogados na loja.

## Acesso administrativo

O acesso ao fluxo administrativo usa a mesma tela de login do cliente. Depois da autenticação pelo Firebase Authentication, o app verifica se existe `admins/{uid}`, onde `{uid}` é o UID retornado pelo Authentication. Se o documento existir, a sessão abre a loja em modo admin; sem esse documento, o login segue para a conta de cliente. O acesso direto a `/admin` também é protegido por essa verificação.

Cadastre os documentos de `admins` manualmente pelo Firebase Console ou por um ambiente confiável com o Admin SDK. Essa coleção é apenas uma lista de autorização: não armazene senhas nela. As credenciais de login devem permanecer no Firebase Authentication. As regras do Firestore devem permitir que a sessão consulte somente o próprio documento de admin e impedir alterações feitas pelo cliente:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /admins/{adminId} {
      allow read: if request.auth != null && request.auth.uid == adminId;
      allow write: if false;
    }
  }
}
```

Antes de testar:

1. No Firebase Console do projeto, habilite **Authentication > Sign-in method > Email/Password**.
2. Crie o banco em **Firestore Database**.
3. Publique as regras do Firestore do exemplo acima, permitindo acesso ao perfil associado ao UID e leitura somente do próprio documento de admin.

As configurações públicas do app Firebase estão em `src/firebase.js`. Não armazene senhas nos documentos do Firestore; elas são gerenciadas pelo Firebase Authentication.
