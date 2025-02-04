// pages/ProductDetailPage.js
import {
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!product) return <Alert severity="warning">Product not found</Alert>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                maxHeight: 400,
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              {product.title}
            </Typography>
            <Chip label={product.category} color="primary" sx={{ mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => addToCart(product)}
              sx={{ mt: 2 }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
