import {
  Grid,
  Pagination,
  TextField,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Box,
  CircularProgress,
  SwipeableDrawer,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  ShoppingCart,
  Menu,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ProductCard, GoogleSignIn } from "../components";
import { useProducts, useAuth, useThemeContext } from "../contexts";

const ITEMS_PER_PAGE = 8;

export const HomePage = () => {
  const { user, handleLogout, handleLogin } = useAuth();
  const { products, categories, loading } = useProducts();
  const { theme, toggleTheme } = useThemeContext();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || p.category === selectedCategory)
  );

  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}

          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{ flexGrow: isMobile ? 1 : 0, width: isMobile ? "100%" : 400 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={toggleTheme} color="inherit">
            {theme === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton component={Link} to="/cart" color="inherit">
            <ShoppingCart />
          </IconButton>

          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <GoogleSignIn onLogin={handleLogin} />
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            marginTop: isMobile ? 0 : "64px",
          },
        }}
      >
        <Toolbar /> {/* Add a toolbar to push content below the AppBar */}
        <List>
          <ListItem>
            <Button
              fullWidth
              variant={!selectedCategory ? "contained" : "outlined"}
              onClick={() => {
                setSelectedCategory(null);
                setPage(1);
                if (isMobile) setDrawerOpen(false);
              }}
            >
              All Categories
            </Button>
          </ListItem>
          {categories.map((category) => (
            <ListItem key={category}>
              <Button
                fullWidth
                variant={
                  selectedCategory === category ? "contained" : "outlined"
                }
                onClick={() => {
                  setSelectedCategory(category);
                  setPage(1);
                  if (isMobile) setDrawerOpen(false);
                }}
              >
                {category}
              </Button>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>

      {/* Permanent Drawer for Desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
              marginTop: "64px",
            },
          }}
        >
          <Toolbar /> {/* Add a toolbar to push content below the AppBar */}
          <List>
            <ListItem>
              <Button
                fullWidth
                variant={!selectedCategory ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedCategory(null);
                  setPage(1);
                }}
              >
                All Categories
              </Button>
            </ListItem>
            {categories.map((category) => (
              <ListItem key={category}>
                <Button
                  fullWidth
                  variant={
                    selectedCategory === category ? "contained" : "outlined"
                  }
                  onClick={() => {
                    setSelectedCategory(category);
                    setPage(1);
                  }}
                >
                  {category}
                </Button>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      <Container sx={{ mt: 12, mb: 4, ml: { sm: 0, md: 30 } }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            <Box py={4} display="flex" justifyContent="center">
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                size={isMobile ? "small" : "medium"}
              />
            </Box>
          </>
        )}
      </Container>
    </>
  );
};
