import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --dark-color: #192230;
    --accent-color: #ffcd00;
    --text-color: #ffffff;
    --text-secondary: #a0a0a0;
    --background-color: #121820;
    --card-bg: #1e293b;
    --sidebar-width: 280px;
    --header-height: 70px;
    --border-radius: 12px;
    --transition: all 0.3s ease;
    --box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    --input-bg: #263142;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    font-family: 'Inter', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  button {
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--dark-color);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #d9af00;
  }
`;