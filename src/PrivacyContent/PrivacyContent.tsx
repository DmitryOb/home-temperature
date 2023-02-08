import React from "react";
import {strArr} from "../utils";
import GoogleOneTapLogin from "./GoogleOneTapLogin";
import {GoogleOAuthProvider} from '@react-oauth/google';
import {useAuthState} from 'react-firebase-hooks/auth';
import {getAuth, signOut} from "firebase/auth";

const webAppClientId = "830317942872-bh3884sml0k33p9vh74uu2dcg0otesnk.apps.googleusercontent.com";

const PrivacyContent: React.FC = (): React.ReactElement => {
  const [user, loading, error] = useAuthState(getAuth());
  const logout = () => {
    signOut(getAuth())
      .then(() => console.log('signed out:'))
  };
  if (loading) {
    return <h2>Waiting Auth state....</h2>
  }

  if (error) {
    return <h2>Auth state error</h2>
  }

  if (!user) {
    return (
      <GoogleOAuthProvider clientId={webAppClientId}>
        <GoogleOneTapLogin/>
      </GoogleOAuthProvider>
    )
  }

  return (
    <div>
      <div>Logged as {user.displayName}</div>
      <button onClick={logout}>Logout</button>
      <div>
        t дома (dht11 в угловой секции 40см от пола)
        <div>
          {strArr.map(str => (
            <div style={{display: "flex", justifyContent: "space-between"}} key={str}>
              <span>{str.split('|')[0]}</span>
              <span>{str.split('|')[1] ?? null}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrivacyContent;
