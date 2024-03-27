export const assertValidTaskName = (name: string) => {
  if (name === "") {
    throw new Error(`Task name can't be empty!`);
  } else {
    return name;
  }
};
