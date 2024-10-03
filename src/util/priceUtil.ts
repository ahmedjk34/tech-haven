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
