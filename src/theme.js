import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f5f5f5", // Blanco perlado para el fondo
          margin: 0,
          padding: 0,
          fontFamily: "'Poppins', sans-serif",
          minHeight: "100vh",
        },
      },
    },
  },
});

export default theme;
