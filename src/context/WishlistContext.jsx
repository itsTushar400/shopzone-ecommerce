import {
  createContext,
  useContext,
  useState
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState([]);


  // Add / Remove Wishlist
  const toggleWishlist = (product) => {

    setWishlist((previousWishlist) => {

      const exists = previousWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {

        return previousWishlist.filter(
          (item) => item.id !== product.id
        );

      }

      return [
        ...previousWishlist,
        product
      ];

    });

  };


  // Check product is in wishlist
  const isInWishlist = (id) => {

    return wishlist.some(
      (item) => item.id === id
    );

  };


  // Wishlist count
  const wishlistCount = wishlist.length;


  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}


export function useWishlist() {

  return useContext(WishlistContext);

}