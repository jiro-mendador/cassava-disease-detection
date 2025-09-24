export const getDateFormatted = (dateInput) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
