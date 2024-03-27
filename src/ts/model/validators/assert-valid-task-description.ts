export const assertValidTaskDescription = (description: string) => {
  if (description === "") {
    throw new Error(`Task description can't be empty!`);
  } else {
    return description;
  }
};
