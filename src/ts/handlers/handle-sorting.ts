import Task from "../classes/task";

import { getSortedArray, isAllowedCategory } from "../filtered-array";
import {
  activeRadioButton,
  querySingleTaskElement,
} from "../helpers/dom-operations";

export const handleSorting = function () {
  const sortBy = activeRadioButton().getAttribute("category");

  if (sortBy === null) {
    return;
  }

  const [sortCategory, sortType] = sortBy.split("-");
  if (!isAllowedCategory(sortCategory)) {
    return;
  }
  getSortedArray(sortType, sortCategory).forEach(
    (singleTask, singleIndex, { length }) => {
      const singleTaskDOM = querySingleTaskElement(singleTask.id);

      //prettier-ignore
      (singleTaskDOM as HTMLElement).style.order = `${singleIndex - length}`;
    }
  );
};
