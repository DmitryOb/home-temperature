import {useEffect, useState} from 'react'
import './App.css'
import app from './config';
import {getDatabase, ref, onValue, get, child} from "firebase/database";

const db = getDatabase(app);

const strFree = `
  21.00 | кондёр 25 срабатывает
  21.40 |
  21.80 | кондёр на 25 стал срабатывать
  22.60 | тепло в двух штанах и майке если стоя
  23.40 | жарко у стола
  23.80 | на кровати тепло
  24.50 | прогрел на ночь
  нагрев
  c 21.0 до 23.4: 27мин
  остыв до 21 за x ?
`
const strArr = strFree.split('\n').map(s => s.trim()).filter(s => s);
console.log(strArr)
function App() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [lastId, setLastIde] = useState(0);

  useEffect(() => {
    const query = ref(db, "randomId");

    return onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        setLastIde(snapshot.val())
      } else {
        console.log("No randomId available");
      }
      const dbRef = ref(db);

      get(child(dbRef, `temperature`)).then(snapshot => {
        if (snapshot.exists()) {
          setTemperature(snapshot.val())
        } else {
          console.log("No temperature available");
        }
      }).catch((error) => {
        console.error(error);
      });

      get(child(dbRef, `humidity`)).then(snapshot => {
        if (snapshot.exists()) {
          setHumidity(snapshot.val())
        } else {
          console.log("No humidity available");
        }
      }).catch((error) => {
        console.error(error);
      });
    });
  }, []);

  return (
    <div className="App">
      <div id="webpage">
        <h2>ESP8266. Информация о температуре в помещении:</h2>
        <span>{lastId}</span>
        <h3>Температура: {temperature}</h3>
        <h3>Влажность: {humidity}</h3>
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
  )
}

export default App
