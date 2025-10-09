export const getClassification = (result: string) => {
  return result.toLowerCase().includes("unhealthy") ? "Unhealthy" : "Healthy";
};
