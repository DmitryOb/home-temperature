import {useGoogleOneTapLogin} from '@react-oauth/google';
import {getAuth, signInWithCredential, GoogleAuthProvider} from "firebase/auth";

export function GoogleOneTapLogin() {
  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      const idToken = credentialResponse.credential;
      const credential = GoogleAuthProvider.credential(idToken);
      console.log(credential);
      console.log('Start to: signInWithCredential')
      signInWithCredential(getAuth(), credential)
        .then(r => {
          console.log('signInWithCredential is done')
          // r.user.getIdToken().then(JWT => console.log(JWT));
        })
        .catch(error => console.log(error))
    },
    onError: () => console.log('Login Failed'),
  });

  return null
}

export default GoogleOneTapLogin
