export const assertValidTaskCategory = (category: string | null) => {
  if (category === "0" || category === null) {
    throw new Error(`Task category can't be the default one!`);
  } else {
    return category;
  }
};
