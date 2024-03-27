let editedTaskID: string | null = null;

export const updatedEditedTaskId = (id: string | null) => {
  editedTaskID = id;
};

export const getEditedTaskId = () => {
  return editedTaskID;
};
