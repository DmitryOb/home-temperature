import './index.css'
import {getColor, range} from "./utils";
import {getDatabase, ref} from "firebase/database";
import app from "./firebase-web-app-config";
import {useObjectVal} from "react-firebase-hooks/database";
// import PrivacyContent from "./PrivacyContent/PrivacyContent";

const db = getDatabase(app);
const randomIdQuery = ref(db, "randomId");
const temperatureQuery = ref(db, "temperature");
const humidityQuery = ref(db, "humidity");

function App() {
  const [randomId, loadingR, errorR] = useObjectVal<number, string, string>(randomIdQuery);
  const [temperature, loadingT, errorT] = useObjectVal<number, string, string>(temperatureQuery);
  const [humidity, loadingH, errorH] = useObjectVal<number, string, string>(humidityQuery);

  return (
    <div className="App">
      <h2>ESP8266. Информация о температуре в помещении:</h2>
      <span>ID: {!errorR && !loadingR && randomId && randomId}</span>
      <h3 style={{color: getColor(temperature ?? null)}}>
        Температура: {!errorT && !loadingT && temperature && temperature}
      </h3>
      <h3>Влажность: {!errorH && !loadingH && humidity && humidity}</h3>
      <div style={{display: 'grid', gridAutoFlow: 'column'}} id={'colored-line'}>
        {range.map(r =>
          <span style={{backgroundColor: r[2], textAlign: 'end'}} key={r[0]}>
            {r[1]}
          </span>
        )}
      </div>
      {/*<PrivacyContent/>*/}
    </div>
  )
}

export default App
