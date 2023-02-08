import React, {useEffect, useState} from "react";
import GoogleOneTapLogin from "./GoogleOneTapLogin";
import {GoogleOAuthProvider} from '@react-oauth/google';
import {useAuthState} from 'react-firebase-hooks/auth';
import {getAuth, signOut} from "firebase/auth";
import {getDatabase, ref, get, child} from "firebase/database";

const webAppClientId = "830317942872-bh3884sml0k33p9vh74uu2dcg0otesnk.apps.googleusercontent.com";

interface INote {
  title: string;
  rows: string[];
}

const PrivacyContent: React.FC = (): React.ReactElement => {
  const [user, loading, error] = useAuthState(getAuth());
  const logout = () => signOut(getAuth()).then(() => console.log('signed out:'));
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    if (user && user.uid) {
      get(child(ref(getDatabase()), `users/${user.uid}/notes`))
        .then(snapshot => {
          if (snapshot.exists()) {
            setNotes(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch(error => console.error(error));
    }
  }, [user])

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
      <br/>
      <div id={'privacy'}>
        <span> {user.displayName} | {user.email}</span>
        <button onClick={logout} style={{background: "#a2ff7b", boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px"}}>
          Logout
        </button>
      </div>
      <br/>

      <br/>
      <div>
        {notes.map(note => (
          <div key={note.title}>
            <div>{note.title}</div>
            <div>
              {note.rows.map(s => s.trim()).map(str => (
                <div style={{display: "flex", justifyContent: "space-between"}} key={str}>
                  <span>{str.split('|')[0]}</span>
                  <span>{str.split('|')[1] ?? null}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default PrivacyContent;
