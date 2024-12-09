export const parseDollarString = (dollars: number, round = 2): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: round,
  });

  return formatter.format(dollars);
};

export const parseCents = (cents: number): number => {
  const dollars = cents / 100;
  return Math.round(dollars * 100) / 100;
};

export const parseCentsString = (cents?: number, round = 2): string => {
  return parseDollarString(parseCents(cents ?? 0), round);
};
