function getLuminance(color: string) {
  const rgb = color
    .match(/[\da-f]{2}/gi)!
    .map((hex) => parseInt(hex, 16) / 255);

  return rgb
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((lum, val, i) => lum + val * [0.2126, 0.7152, 0.0722][i], 0);
}

type Props = {
  textColor: string;
  backgroundColor: string;
};

export function getContrast({ textColor, backgroundColor }: Props) {
  const lum1 = getLuminance(textColor);
  const lum2 = getLuminance(backgroundColor);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}
