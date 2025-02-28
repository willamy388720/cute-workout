import {
  SizeDisplayType,
  SizeHeadingType,
  SizeTextType,
  SizeWeightType,
} from "@styles/typography";
import {
  FONT_SIZE_DISPLAY,
  FONT_SIZE_HEADING,
  FONT_SIZE_TEXT,
} from "@themes/default";

// DISPLAY
function getSizeDisplay(size?: SizeDisplayType) {
  switch (size) {
    case "1":
      return FONT_SIZE_DISPLAY[1];
    default:
      return FONT_SIZE_DISPLAY[1];
  }
}

// HEADING

function getSizeHeading(size?: SizeHeadingType) {
  switch (size) {
    case "1":
      return FONT_SIZE_HEADING[1];
    case "2":
      return FONT_SIZE_HEADING[2];
    case "3":
      return FONT_SIZE_HEADING[3];
    default:
      return FONT_SIZE_HEADING[1];
  }
}

// TEXT
function getSizeText(size?: SizeTextType) {
  switch (size) {
    case "1":
      return FONT_SIZE_TEXT[1];
    case "2":
      return FONT_SIZE_TEXT[2];
    case "3":
      return FONT_SIZE_TEXT[3];

    default:
      return FONT_SIZE_TEXT[1];
  }
}

function getWeight(weight?: SizeWeightType) {
  switch (weight) {
    case "regular":
      return "500";
    case "bold":
      return "700";
    default:
      return "500";
  }
}

function getLineHeight(sizeFont?: SizeTextType, weightFont?: SizeWeightType) {
  const size = sizeFont ?? "1";
  const weight = weightFont ?? "regular";

  if (size === "3" && weight === "bold") {
    return `calc(1.6 * ${FONT_SIZE_TEXT[size]})`;
  }

  if (size === "2" && weight === "bold") {
    return `calc(1.4 * ${FONT_SIZE_TEXT[size]})`;
  }

  if (size === "2" && weight === "regular") {
    return `calc(1.6 * ${FONT_SIZE_TEXT[size]})`;
  }

  if (size === "1") {
    return `calc(1.6 * ${FONT_SIZE_TEXT[size]})`;
  }
}

export {
  getSizeDisplay,
  getSizeHeading,
  getSizeText,
  getWeight,
  getLineHeight,
};
