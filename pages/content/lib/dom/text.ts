export const text = (value: string) => {
  const container = document.createElement('span');
  container.innerText = value;
  return container;
};
