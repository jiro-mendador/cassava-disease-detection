export const delayExecute = (functionToExecute, delayInMS) => {
  setTimeout(() => {
    functionToExecute();
  }, delayInMS);
};
