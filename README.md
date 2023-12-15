Simple project of To Do List made with TS and SCSS.

Features:

1. Two main fields. One for active tasks and the other one for finished tasks.
2. Add new notes. Each note consist of few information:
   - title,
   - description,
   - deadline date (can be set to 'unset'),
   - importance: low, medium or high,
   - category,
   - state: default state is 'active', but it can be changed to 'finished',
   - date of creation, which is set for the day, when the taks is made.
3. Each task can be edited or deleted and its status can be changed from active to finished or other way around.
4. Main fields can be filtered by importance, category or by the time for deadline to happen.
5. Main fields can be sorted by title (A-Z or Z-A), date (ascending or descending), importance (low to high or high to low) or date of creation (ascending or descending).
6. At the top of main active field there is summary which represent how many tasks of each importance need to be made.
7. All the tasks are stored in database (Firebase).

Extra features (future):

1. Task state can be changed with drag and drop.
2. Add PWA/TWA.
3. Add push notification (for example when deadline is soon).

To open this project:

1. npm install
2. npm run build or npm run watch

Fixes to do:

- remove/change unnecessary 'any' type
- fix styles + RWD
