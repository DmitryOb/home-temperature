import {useEffect, useState} from 'react'
import './App.css'
import app from './config';
import {getDatabase, ref, onValue, get, child} from "firebase/database";

const db = getDatabase(app);

const range: [string, number, string][] = [
  ['dark-blue', 21.4, 'rgb(149, 137, 211)'],
  ['blue', 21.8, 'rgb(95, 143, 197)'],
  ['yellow', 22.6, 'rgb(223, 177, 6)'],
  ['orange', 23.8, 'rgb(255,145,0)'],
  ['red', 24.5, 'rgb(255,0,0)'],
];

const getColor = (temp: number) => {
  let color = 'black';
  for (let i = 0; i < range.length; i++) {
    if (color !== 'black') {
      break;
    }
    const rowArr:[string, number, string] = range[i];
    const colorCss: string = rowArr[2];
    const maxTemp = rowArr[1];
    const minTemp = i === 0 ? -9999 : range[i-1][1];
    if (temp > minTemp && temp <= maxTemp) {
      color = colorCss;
    }
  }

  return color;
}

const strFree = `
  21.40 | прохладно
  21.80 | 25 кондёр run, в 2 штанах за столом холодок по коленям
  22.60 | тепло в двух штанах и майке если стоя
  23.40 | жарко у стола
  23.80 | на кровати тепло
  24.50 | прогрел на ночь
  нагрев
  c 21.0 до 23.4: 27мин
  остыв до 21 за x ?
`
const strArr = strFree.split('\n').map(s => s.trim()).filter(s => s);

function App() {
  const [temperature, setTemperature] = useState(-99);
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
        <h3 style={{color: getColor(temperature)}}>Температура: {temperature}</h3>
        <h3>Влажность: {humidity}</h3>
        <div style={{display: 'grid', gridAutoFlow: 'column'}}>
          {range.map(r =>
            <span style={{backgroundColor: r[2], textAlign: 'end'}}>{r[1]}</span>
          )}
        </div>
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
