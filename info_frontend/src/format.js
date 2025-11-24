export function formatCurrency(num=0, currency="USD") {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(Number(num || 0));
  } catch (e) {
    return `${num}`;
  }
}
