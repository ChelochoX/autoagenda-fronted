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
import login from "../Assets/iconos/login.png"; // Imagen de login
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
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Manejo del Drawer en dispositivos móviles
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Cerrar el menú después de hacer clic en un enlace en modo móvil
  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#f5f5f5", padding: "10px 20px" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo en la esquina izquierda */}
        <Box>
          <img
            src={"logo"} // Reemplaza con la ruta de tu logo
            alt="Logo Empresa"
            style={{ height: "40px", cursor: "pointer" }}
          />
        </Box>

        {/* Menú en dispositivos grandes */}
        {!isMobile ? (
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
                  fontSize: "1.5rem", // Tamaño de letra más grande
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
        ) : (
          // Icono de menú hamburguesa en dispositivos móviles
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
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
              src={login} // Aquí colocas la imagen login.png
              alt="Login"
              style={{
                width: "2rem", // Ajusta el tamaño según sea necesario
                height: "2rem", // Ajusta el tamaño según sea necesario
                borderRadius: "50%", // Borde redondeado (círculo)
                border: "2px solid transparent", // Inicialmente sin borde visible
                padding: "2px", // Espaciado interno entre la imagen y el borde
                transition: "all 0.3s ease", // Animación suave
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
      </Toolbar>

      {/* Drawer (Menú lateral) para móvil */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {links.map((link, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={link.path}
              onClick={handleLinkClick}
            >
              <Button
                sx={{
                  width: "100%",
                  textTransform: "uppercase",
                  fontWeight: "normal", // Sin negrita
                  letterSpacing: "0.1em",
                  color: "#000",
                  position: "relative",
                  margin: "10px 0",
                  fontSize: "1rem",
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
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
