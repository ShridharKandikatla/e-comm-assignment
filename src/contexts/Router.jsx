import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { HomePage, ProductDetailPage, CartPage, CheckoutPage } from "../pages";
import { useThemeContext } from "./ThemeContext";

const Router = () => {
  const { theme } = useThemeContext();

  // Update theme creation in Router.js
  const muiTheme = createTheme({
    palette: {
      mode: theme,
      ...(theme === "light"
        ? {
            background: { default: "#f5f5f5" },
            text: { primary: "#212121" },
          }
        : {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: { primary: "#ffffff" },
          }),
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s ease",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
