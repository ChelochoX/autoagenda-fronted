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
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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
      name: "Gestión Reservas",
      path: "/gestionreservas",
      color: "#FFA500",
      shape: "polygon(20% 0, 80% 10%, 100% 80%, 10% 100%)",
    },
    {
      name: "Pagos",
      path: "/pagos",
      color: "#FFFF00",
      shape: "polygon(15% 10%, 95% 0, 80% 90%, 0 85%)",
    },
    {
      name: "Contacto",
      path: "/contacto",
      color: "#0000FF",
      shape: "polygon(30% 0, 90% 0, 100% 70%, 20% 100%)",
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        backgroundColor: "#dcdcdc",
        padding: "10px 20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box>
          <img
            src="/imagenes/logomecanic.jpg"
            alt="Logo Empresa"
            style={{
              height: isMobile ? "40px" : "80px",
              cursor: "pointer",
            }}
          />
        </Box>

        {/* Menú Escritorio */}
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
                  color: "#000",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  fontWeight: "normal",
                  letterSpacing: "0.1em",
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
              </Button>
            ))}
          </Box>
        )}

        {/* Icono Usuario */}
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
              src="/imagenes/login.png"
              alt="Login"
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                border: "2px solid transparent",
                padding: "2px",
                transition: "all 0.3s ease",
              }}
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
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Iniciar Sesión</MenuItem>
            <MenuItem onClick={handleMenuClose}>Registrar</MenuItem>
          </Menu>
        </Box>

        {/* Menú Hamburguesa */}
        {isMobile && (
          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{
              color: "#000",
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Drawer para Menú Lateral */}
      <Drawer
        anchor="right"
        open={openMenu}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            padding: "20px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          role="presentation"
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ alignSelf: "flex-end", marginBottom: "10px" }}
          >
            <CloseIcon />
          </IconButton>
          <List>
            {links.map((link, index) => (
              <ListItem
                key={index}
                component={Link}
                to={link.path}
                onClick={handleDrawerToggle}
                sx={{
                  textAlign: "center",
                  padding: "10px 0",
                  fontWeight: "bold",
                  position: "relative",
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
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
