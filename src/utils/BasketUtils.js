const vatPercentage = 0.2;

export function basketTotalPriceVatBreakdown() {
  var totalPrice = BasketStore.get();
  return {
    vat: totalPrice * vatPercentage,
    cost: totalPrice * (1 - vatPercentage)
  }
}
