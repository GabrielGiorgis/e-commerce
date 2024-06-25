import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useCart } from "../../../../hooks/useCart";
import logoImg from "../../../../assets/logo_white.png";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const idUser = localStorage.getItem("idUser");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { cart } = useCart();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleRedirect = (route: string) => {
    navigate(`/${route}`);
    handleMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("idUser");
    localStorage.removeItem("idUserDomicilio");
    handleMenuClose();
    navigate("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      style={{ marginTop: "40px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      {idUser ? (
        <div>
          <MenuItem key="account" onClick={() => handleRedirect("profile")}>
            {"Mi cuenta"}
          </MenuItem>
          <MenuItem key="orders" onClick={() => handleRedirect("pedidos")}>
            {"Pedidos"}
          </MenuItem>{" "}
          <MenuItem key="logout" onClick={handleLogout}>
            {"Cerrar sesión"}
          </MenuItem>
        </div>
      ) : (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            return navigate("/login");
          }}>
          Iniciar sesión
        </MenuItem>
      )}
    </Menu>
  );

  React.useEffect(() => {
    const checkIdUser = () => {
      if (localStorage.getItem("idUser")) {
        if (location.pathname == "/login" || location.pathname == "/register") {
          navigate("/");
        }
      }
    };

    checkIdUser();
    return () => {
      checkIdUser();
    };
  }, [location, navigate]);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      style={{ marginTop: "40px" }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      onClick={handleMobileMenuClose}>
      {idUser ? (
        <div>
          <MenuItem onClick={() => navigate("/carrito")}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit">
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <p style={{ margin: "0" }}>Carrito</p>
          </MenuItem>
          <MenuItem onClick={() => navigate("/profile")}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit">
              <AccountCircle />
            </IconButton>
            <p style={{ margin: "0" }}>Mi cuenta</p>
          </MenuItem>
          <MenuItem onClick={() => navigate("/pedidos")}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit">
              <ReceiptLongIcon />
            </IconButton>
            <p style={{ margin: "0" }}>Pedidos</p>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit">
              <LogoutIcon />
            </IconButton>
            <p style={{ margin: "0" }}>Cerrar sesión</p>
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={() => navigate("/login")}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit">
            <LoginIcon />
          </IconButton>
          <p style={{ margin: "0" }}>Iniciar sesión</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#6e0000" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}>
            <img
              src={logoImg}
              alt="Logo"
              style={{ width: "24px", height: "24px" }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => navigate("/")}>
            Buen Sabor
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => navigate("/carrito")}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
