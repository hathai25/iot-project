const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const formatCurrency = (value: number) => {
  return formatter.format(value);
};
