export function maskHeight(value: string) {
  const newValue = value.replace(/\D/g, "");

  return newValue;
}

export function maskNumber(value: string) {
  const newValue = value.replace(/\D/g, "");

  return newValue;
}

export function maskNumberPositive(value: string) {
  let newValue = value;

  newValue = newValue.replace(/\D/g, "");

  if (newValue === "") {
    newValue = "0";
  }

  let numericValue = parseInt(newValue, 10);

  if (numericValue < 0) {
    numericValue = 0;
  }

  return numericValue.toString();
}

export function maskWeight(value: string) {
  let newValue = value;

  if (!value.includes(".") && newValue.includes(",")) {
    newValue = newValue.replace(",", ".");
  }

  newValue = newValue.replace(/[^0-9.]/g, "");

  const parts = newValue.split(".");
  if (parts.length > 2) {
    newValue = parts[0] + "." + parts.slice(1).join("");
  }

  return newValue;
}
