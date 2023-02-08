export const range: [string, number, string][] = [
  ['dark-blue', 21.4, 'rgb(149, 137, 211)'],
  ['blue', 22.2, 'rgb(95, 143, 197)'],
  ['yellow', 22.6, 'rgb(223, 177, 6)'],
  ['orange', 23.8, 'rgb(255,145,0)'],
  ['red', 24.5, 'rgb(255,0,0)'],
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
    const maxTemp = rowArr[1];
    const minTemp = i === 0 ? -9999 : range[i - 1][1];
    if (temp > minTemp && temp <= maxTemp) {
      color = colorCss;
    }
  }

  return color;
}
