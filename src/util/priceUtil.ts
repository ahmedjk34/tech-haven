import { ContextType } from "@/util/Types";

export function formatPriceAfterDiscount(
  price: number,
  discount: number
): string {
  if (discount == 0) return price.toFixed(2);
  return (price - (price * discount) / 100).toFixed(2);
}

export function calculateTotalPrice(price: number, quantity: number): string {
  return (price * quantity).toFixed(2);
}

export function extractTotalPriceFromCart(cart: ContextType[]): number {
  return cart.reduce((accumulator: number, current: ContextType) => {
    const priceAfterDiscount = Number(
      formatPriceAfterDiscount(current.data.price, current.data.price)
    );
    const totalPrice = Number(
      calculateTotalPrice(priceAfterDiscount, current.quantity)
    );
    return accumulator + totalPrice;
  }, 0);
}
