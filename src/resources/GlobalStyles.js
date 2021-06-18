// globalStyles.js
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize}
  html, 
  body, #root {
      height: 100%;
  }
`;

export default GlobalStyles;
