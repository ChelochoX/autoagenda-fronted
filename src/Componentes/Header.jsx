import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import login from "../Assets/iconos/login.png";
import logo from "../Assets/imagenes/logomecanic.jpg"; // Imagen del logo
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const links = [
    {
      name: "Home",
      path: "/",
      color: "#FF0000",
      shape: "polygon(20% 0, 100% 10%, 80% 100%, 0 80%)",
    },
    {
      name: "Hacer Reserva",
      path: "/reserva",
      color: "#00FF00",
      shape: "polygon(10% 0, 90% 10%, 100% 90%, 0 70%)",
    },
    {
      name: "Contacto",
      path: "/contacto",
      color: "#0000FF",
      shape: "polygon(30% 0, 90% 0, 100% 70%, 20% 100%)",
    },
    {
      name: "Servicios",
      path: "/servicios",
      color: "#FFFF00",
      shape: "polygon(15% 10%, 95% 0, 80% 90%, 0 85%)",
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detecta si es móvil

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#b0b0b0", // Fondo más oscuro (gris claro oscuro)
        padding: "10px 20px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo en la esquina izquierda */}
        <Box>
          <img
            src={logo}
            alt="Logo Empresa"
            style={{
              height: isMobile ? "40px" : "80px", // Ajusta la altura según el dispositivo
              cursor: "pointer",
            }}
          />
        </Box>

        {/* Menú de enlaces (escritorio) */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {links.map((link, index) => (
              <Button
                key={index}
                component={Link}
                to={link.path}
                sx={{
                  position: "relative",
                  margin: "0 20px",
                  color: "#000", // Negro para mejor legibilidad
                  fontSize: "1rem", // Reducido el tamaño de letra
                  textTransform: "uppercase",
                  fontWeight: "normal", // Sin negrita
                  letterSpacing: "0.1em",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: link.color,
                    clipPath: link.shape, // Forma dinámica
                    zIndex: -1,
                    transition: "all 0.3s ease",
                  },
                  "&:hover::before": {
                    transform: "scale(1.1)", // Efecto hover
                  },
                }}
              >
                {link.name}
              </Button>
            ))}
          </Box>
        )}

        {/* Icono de Usuario con Efecto Hover */}
        <Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            sx={{ color: "#000" }}
          >
            <img
              src={login}
              alt="Login"
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                border: "2px solid transparent",
                padding: "2px",
                transition: "all 0.3s ease",
              }}
              className="login-icon"
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Iniciar Sesión</MenuItem>
            <MenuItem onClick={handleMenuClose}>Registrar</MenuItem>
          </Menu>
        </Box>

        {/* Icono del Menú Hamburguesa (para móviles) */}
        {isMobile && (
          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{
              color: "#fff", // Hacemos el icono blanco para que resalte sobre el fondo oscuro
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Menú lateral para dispositivos móviles */}
      {isMobile && (
        <Drawer anchor="right" open={openMenu} onClose={handleDrawerToggle}>
          <List sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
            {links.map((link, index) => (
              <ListItem
                key={index}
                button
                component={Link}
                to={link.path}
                onClick={() => {
                  handleDrawerToggle(); // Cierra el menú al hacer clic en un enlace
                }}
                sx={{
                  padding: "10px 20px",
                  fontSize: "1rem", // Tamaño más pequeño para los enlaces en móvil
                  textAlign: "center",
                  position: "relative",
                  color: "#000",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: link.color,
                    clipPath: link.shape,
                    zIndex: -1,
                    transition: "all 0.3s ease",
                  },
                  "&:hover::before": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                {link.name}
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </AppBar>
  );
};

export default Header;
