import {
  createContext,
  useContext,
  useState
} from "react";


// Create Context
const CartContext = createContext();


// Cart Provider
export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);


  // Add product to cart
  const addToCart = (product) => {

    setCart((previousCart) => {

      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );


      // Product already exists
      if (existingProduct) {

        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );

      }


      // New product
      return [
        ...previousCart,
        {
          ...product,
          quantity: 1
        }
      ];

    });

  };


  // Increase quantity
  const increaseQuantity = (id) => {

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  };


  // Decrease quantity
  const decreaseQuantity = (id) => {

    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  };


  // Remove product
  const removeFromCart = (id) => {

    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== id
      )
    );

  };


  // Clear entire cart
  const clearCart = () => {

    setCart([]);

  };


  // Total items
  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  // Total price
  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal
      }}
    >

      {children}

    </CartContext.Provider>

  );

}


// Custom hook
export function useCart() {

  return useContext(CartContext);

}