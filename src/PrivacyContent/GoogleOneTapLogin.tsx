import {
  useGoogleOneTapLogin,
} from '@react-oauth/google';
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import authWrite from "./firebase-web-app-config";

// FE: google sign-in -> success -> JWT -> SignIn on Firebase

// на фронте читаем куку firebase_cookie верифицируем у бэка -> фаербэйса если все хорошо то не выводим кнопку
// и показываем "особый" контент


// @ts-ignore
function GoogleOneTapLogin({ callback }) {
  console.log(callback)
  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      const idToken = credentialResponse.credential;
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(authWrite, credential)
        .then(r => r.user.getIdToken().then(JWT => {
          console.log(JWT);
          fetch('api/handler?jwt='+ JWT)
            .then(r => callback())
            .catch(er => console.log(er));
        }))
        .catch((error) => {
          console.log(error)
        });
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return null
}

export default GoogleOneTapLogin
