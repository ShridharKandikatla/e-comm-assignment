import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useCart } from "../contexts/CartContext";

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price} | {product.category}
        </Typography>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            component={Link}
            to={`/product/${product.id}`}
            variant="outlined"
          >
            Details
          </Button>
          <Button variant="contained" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
