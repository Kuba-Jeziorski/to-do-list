import { filterTabCheckboxes } from "../constants";
import Task from "../classes/task";
import { getFilteredArray } from "../filtered-array";
import { querySingleTaskElement } from "../helpers/dom-operations";

export const handleFiltering = function () {
  let checkboxesNamesArray: string[] = [];

  filterTabCheckboxes.forEach((singleInput) => {
    const singleCheckbox = singleInput as HTMLInputElement;
    if (singleCheckbox.checked) {
      checkboxesNamesArray.push(singleCheckbox.name);
    }
  });

  type Option = {
    selected: string[];
    check: (selectedOptions: string[], option: string | number) => boolean;
  };

  const options: Record<"importance" | "category" | "deadline", Option> = {
    importance: {
      selected: [],
      check: (selectedOptions, option) =>
        selectedOptions.includes(option.toString()),
    },
    category: {
      selected: [],
      check: (selectedOptions, option) =>
        selectedOptions.includes(option.toString()),
    },
    deadline: {
      selected: [],
      check: (selectedOptions, option) => +option <= +selectedOptions[0],
    },
  };

  checkboxesNamesArray.forEach((singleName) => {
    for (let key in options) {
      if (singleName.includes(key)) {
        options[key as keyof typeof options].selected.push(
          singleName.split("-")[1]
        );
      }
    }
  });
  getFilteredArray().forEach(({ id, importance, category, deadline }: Task) => {
    const attributes = {
      importance,
      category,
      deadline,
    };
    const shouldBeDisplayed = Object.keys(options).every((key) => {
      const optionName = key as keyof typeof options;
      const variant = options[optionName];
      return (
        variant.selected.length === 0 ||
        variant.check(variant.selected, attributes[optionName])
      );
    });

    querySingleTaskElement(id).classList.toggle(
      "display-none",
      !shouldBeDisplayed
    );
  });
};
