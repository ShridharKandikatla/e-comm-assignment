import {
  AuthProvider,
  CartProvider,
  ThemeContextProvider,
  ProductsProvider,
} from "./contexts";
import Router from "./contexts/Router";

export default function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <Router />
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </ThemeContextProvider>
  );
}
