import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --white: #FFFFFF;
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
        background-color: var(--gray-3);
    }

    html {
        font-size: 62.5%;
        scroll-behavior: smooth;
    }

    button, a {
        cursor: pointer !important;
    }
`;
