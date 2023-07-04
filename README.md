Simple project of To Do List made with TS and SCSS.

Features:

1. Two main fields. One for active tasks and the other one for finished tasks.
2. Add new notes. Each note consist of few information:
   - title,
   - description,
   - deadline date (can be set to 'unset'),
   - importance: low, medium or high,
   - category: there will be couple of categories available, for example: learning, house work, exercises etc.,
   - state: default state is 'active', but it can be changed to 'finished',
   - date of creation, which is set for the day, when the taks is made.
3. Each task can be edited or deleted. Each of task has little checkbox which changes state of item (active to done or the other way around).
4. Main fields can be filtered by importance or category. Active main field can also be filtered by date (less than 7 days till deadline etc.).
5. Main fields can be sorted by title (A-Z or Z-A), date (ascending or descending), importance (low to high or high to low) or date of creation (ascending or descending).
6. At the top of main active field there will be summary which represent how many tasks of each importance need to be made.

Extra features (future):

1. Task state change with drag: particular task can be moved with drag between states.
2. Database: tasks are stored in database (done with Firebase).

To open this project:

1. npm install
2. npm run build or npm run watch
