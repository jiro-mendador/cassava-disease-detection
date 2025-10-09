export const isInputValid = (input: string): boolean => {
  const validInputs = ["unhealthy", "healthy", "n/a"];
  return validInputs.some((valid) => input.toLowerCase() === valid);
};