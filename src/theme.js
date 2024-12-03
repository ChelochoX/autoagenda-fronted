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
          backgroundColor: "#e0e0e0",
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
