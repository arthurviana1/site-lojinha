export function firebaseErrorMessage(error, fallback) {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'Este e-mail já possui uma conta.'
    case 'auth/invalid-email':
      return 'Informe um e-mail válido.'
    case 'auth/weak-password':
      return 'A senha precisa ter pelo menos 6 caracteres.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'E-mail ou senha incorretos.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
    case 'auth/network-request-failed':
      return 'Não foi possível conectar. Verifique sua internet e tente novamente.'
    case 'permission-denied':
      return 'O Firebase não permitiu acessar os dados. Verifique as regras do Firestore.'
    default:
      return fallback
  }
}
