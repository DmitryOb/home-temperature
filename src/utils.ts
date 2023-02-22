export const range: [string, number, string][] = [
  ['dark-blue', 21.4, 'rgb(149, 137, 211)'], // ice:    -9999 -> 21.4]
  ['blue', 22.2, 'rgb(95, 143, 197)'],       // cold:   (21.4 -> 22.2]
  ['yellow', 22.8, 'rgb(223, 177, 6)'],      // normal: (22.2 -> 22.8]
  ['orange', 23.4, 'rgb(255,145,0)'],        // warm:   (22.8 -> 23.4]
  ['red', 24.5, 'rgb(255,0,0)'],             // hot:    (24.5 -> 9999
];

export const getColor = (temp: number | null) => {
  let color = 'black';
  if (temp === null) {
    return color;
  }
  for (let i = 0; i < range.length; i++) {
    if (color !== 'black') {
      break;
    }
    const rowArr: [string, number, string] = range[i];
    const colorCss: string = rowArr[2];
    const maxTemp = i === (range.length - 1) ? 9999 : rowArr[1];
    const minTemp = i === 0 ? -9999 : range[i - 1][1];
    if (temp > minTemp && temp <= maxTemp) {
      color = colorCss;
    }
  }

  return color;
}
