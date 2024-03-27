export const createdDiv = function (id: any, data: string, state: string) {
  return `
  <div class="single-task ${state}" data-task-id="${id}">
  ${data}
    <div class="single-btn">
    </div>
    <div class="single-state">
    </div>
    <div class="single-edit">
    </div>
  </div>`;
};
