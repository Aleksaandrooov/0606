export const paginationCalc = (i: number, page: number, numberForCeil: number) => {
  return numberForCeil > 3
    ? page > 1 && page < numberForCeil - 1
      ? page + (i - 1)
      : page == numberForCeil - 1
      ? page + i - 2
      : page == numberForCeil
      ? page + i - 3
      : page == 1 || !page
      ? i + 1
      : i
    : numberForCeil == 3
    ? page > 1 && page < numberForCeil - 1
      ? page + (i - 1)
      : page == numberForCeil - 1
      ? page + i - 1
      : page == numberForCeil
      ? page + i - 2
      : page == 1 || !page
      ? i + 1
      : i
    : numberForCeil == 2
    ? page > 1
      ? page + (i - 1)
      : page == numberForCeil
      ? page + i - 1
      : page == 1 || !page
      ? i + 1
      : i
    : undefined;
};
