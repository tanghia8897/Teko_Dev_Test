export const formatCurrencyVND = ((money) => {
  money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return money;
});