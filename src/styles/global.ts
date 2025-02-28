import {
  FONT_SIZE_DISPLAY,
  FONT_SIZE_HEADING,
  FONT_SIZE_TEXT,
} from "@themes/default";
import { ArrayOf12 } from "@utils/colors/generateRadixColors";
import { getContrast } from "@utils/colors/getContrast";
import { createGlobalStyle } from "styled-components";

const WHITE = "#FFFFFF";
const GRAY_900 = "#151515";

type GlobalStyleProps = {
  colorsRadix: ArrayOf12<string>;
};

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`        
      :root {
          --white: ${WHITE};
          --black: #000000;
  
          --brand-300: ${({ colorsRadix }) => colorsRadix[2]};
          --brand-800: ${({ colorsRadix }) => colorsRadix[7]};
          --brand-900: ${({ colorsRadix }) => colorsRadix[8]};
          --brand-1200: ${({ colorsRadix }) => colorsRadix[9]};

          --success-100: #DBF2EA;
          --success-500: #02925C;
          --success-800: #033522;

          --info-100: #E3F0FF;
          --info-500: #0B5CBA;
          --info-800: #041F3F;
          
          --danger-100: #FFF1F4;
          --danger-500: #D40A2F;
          --danger-800: #530513;
          
          --warning-100: #FFF4D7;
          --warning-500: #F9B508;
          --warning-800: #412402;
  
          --gray-50: #F6F6F6;
          --gray-100: #E0E0E0;
          --gray-200: #C7C7C7;
          --gray-300: #ADADAD;
          --gray-400: #949494;
          --gray-500: #7A7A7A;
          --gray-600: #616161;
          --gray-700: #474747;
          --gray-800: #2E2E2E;
          --gray-900: ${GRAY_900};
  
          --font-size-text-1: ${FONT_SIZE_TEXT[1]};
          --font-size-text-2: ${FONT_SIZE_TEXT[2]};
          --font-size-text-3: ${FONT_SIZE_TEXT[3]};
  
          --font-size-display-1: ${FONT_SIZE_DISPLAY[1]};
  
          --font-size-heading-1: ${FONT_SIZE_HEADING[1]};
          --font-size-heading-2: ${FONT_SIZE_HEADING[2]};
          --font-size-heading-3: ${FONT_SIZE_HEADING[3]};

          --shadow-bottom-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
          --shadow-bottom-2: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
          --shadow-bottom-3: 0px 6px 12px 0px rgba(0, 0, 0, 0.05);
          --shadow-bottom-4: 0px 8px 20px 0px rgba(0, 0, 0, 0.05);
          --shadow-bottom-5: 0px 16px 40px 0px rgba(0, 0, 0, 0.07);

          --shadow-top-1: 0px -2px 4px 0px rgba(0, 0, 0, 0.05);
          --shadow-top-2: 0px -4px 8px 0px rgba(0, 0, 0, 0.05);
          --shadow-top-3: 0px -6px 12px 0px rgba(0, 0, 0, 0.05);
          --shadow-top-4: 0px -8px 20px 0px rgba(0, 0, 0, 0.05);
          --shadow-top-5: 0px -16px 40px 0px rgba(0, 0, 0, 0.07);

          --button-text-color: ${({ colorsRadix }) =>
            getContrast({
              textColor: WHITE,
              backgroundColor: colorsRadix[8],
            }) < 4.5
              ? GRAY_900
              : WHITE};

          --border-color: ${({ colorsRadix }) =>
            getContrast({
              textColor: WHITE,
              backgroundColor: colorsRadix[8],
            }) < 4.5
              ? colorsRadix[7]
              : colorsRadix[8]};
      }
  
      *, :after, :before {
          box-sizing: border-box;
      } 
  
      * {
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
      }
  
      body{
        overflow-x: hidden;
        font-family: "Onest", sans-serif;
      }
  
      html {
          font-size: 62.5%;
          scroll-behavior: smooth;
      }
  
      a, button {
        border-radius: 1.2rem;
      }
  
      .loader {
        animation: rotation 1s linear infinite;

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      }
  `;
