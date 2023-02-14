import './index.css'
import {getColor, range} from "./utils";
import {getDatabase, ref} from "firebase/database";
import app from "./firebase-web-app-config";
import {useObjectVal} from "react-firebase-hooks/database";
import PrivacyContent from "./PrivacyContent/PrivacyContent";
import {memo, useEffect, useRef, useState} from "react";
import {useInterval, usePrevious} from "react-use";
const db = getDatabase(app);
const randomIdQuery = ref(db, "randomId");
const temperatureQuery = ref(db, "temperature");
const humidityQuery = ref(db, "humidity");

const PrivacyContentMemo = memo(PrivacyContent);

const OFFLINE_CONDITION_TIME = 3000;

function App() {
  const [temperature, loadingT, errorT] = useObjectVal<number, string, string>(temperatureQuery);
  const [humidity, loadingH, errorH] = useObjectVal<number, string, string>(humidityQuery);

  const [randomId, loadingR, errorR] = useObjectVal<number, string, string>(randomIdQuery);
  const prevRandomId = usePrevious(randomId);
  const [isInitiallyID, setIsInitiallyID] = useState(true);
  const lastRandomIdRef = useRef(randomId);
  const [lastTimeUpID, setLastTimeUpID] = useState(0);
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    if (prevRandomId !== randomId && prevRandomId === undefined) {
      setIsInitiallyID(false);
    }
  }, [randomId, prevRandomId])

  useInterval(
    () => {
      if (isInitiallyID) {
        return
      }

      const differenceInMs = new Date().valueOf() - lastTimeUpID;
      differenceInMs > OFFLINE_CONDITION_TIME ? setIsOnline(false) : setIsOnline(true);
      if (lastRandomIdRef.current !== randomId) {
        lastRandomIdRef.current = randomId;
        setLastTimeUpID(new Date().valueOf())
      }
    },
    500,
  );

  return (
    <div className="App">
      <h4>ESP8266 DHT11 влажность и температура</h4>

      <div className={'status-row'}>
        <span className={'status-text'}>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
        <div className={'status'} style={{background: isOnline ? 'lawngreen' : 'crimson'}}/>
      </div>
      <div style={{opacity: 0.2}}>ID: {!errorR && !loadingR && randomId && randomId}</div>
      <h3>Влажность: {!errorH && !loadingH && humidity && humidity}</h3>
      <h2 style={{color: getColor(temperature ?? null)}}>
        Температура: {!errorT && !loadingT && temperature && temperature}
      </h2>
      <div style={{display: 'grid', gridAutoFlow: 'column'}} id={'colored-line'}>
        {range.map(r =>
          <span style={{backgroundColor: r[2], textAlign: 'end'}} key={r[0]}>
            {r[1]}
          </span>
        )}
      </div>
      <PrivacyContentMemo/>
    </div>
  )
}

export default App
