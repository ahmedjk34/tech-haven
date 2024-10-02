import { ItemType, ContextType } from "@/util/Types";

// Add item to the cart
export function addItemToCart(
  cart: ContextType[],
  setCart: React.Dispatch<React.SetStateAction<ContextType[]>>,
  item: ItemType
) {
  setCart((prevCart) => {
    const existingItemIndex = prevCart.findIndex(
      (cartItem) => cartItem.data._id === item._id
    );

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, increment the quantity
      const updatedCart = [...prevCart];
      updatedCart[existingItemIndex].quantity += 1;
      return updatedCart;
    } else {
      // If the item does not exist, add it to the cart with quantity 1
      return [...prevCart, { data: item, quantity: 1 }];
    }
  });
}

export function deleteItemFromCart(
  cart: ContextType[],
  setCart: React.Dispatch<React.SetStateAction<ContextType[]>>,
  item: ItemType
) {
  setCart((prevCart) => {
    const existingItemIndex = prevCart.findIndex(
      (cartItem) => cartItem.data._id === item._id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...prevCart];
      const currentQuantity = updatedCart[existingItemIndex].quantity;

      if (currentQuantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }

      return updatedCart;
    }

    return prevCart;
  });
}
