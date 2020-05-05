# Dynamic Menu Guide(Temporary solution with static resources)

## Register you product in `applications.json` e.g:
```json
  {
    "name": "project",
    "url": "project",
    "title": "Projects"
  },
```  

*url attribute represents the path to your main screen.*

Don't worry about icons at this stage, this topic will be revisited.

## Add menu items to `menu-items.json` e.g:
```json
{
  "project": [
    {
      "text": "Main",
      "route": "project"
    },
    {
      "text": "My Tasks",
      "route": "project/new-task"
    }
  ]
}
```

## Introduce child router to your module. In your parent router config, such as in app.js  you simply link to a view model that is itself a router.

`app.js` (parent router):
```javascript
{
    route: 'project',
    moduleId: PLATFORM.moduleName('project/project'),
    name: 'project',
    title: 'Projects'
},
```
**Please note that name of this parent route must match your product name defined in `shuffle.js`.**

`project.js` (child router):
```javascript
export class ProjectMainComponent {
  configureRouter(config) {
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {
        route: '',
        moduleId: PLATFORM.moduleName('project/components/project-list'),
        name: 'project'
      },
      {
        route: 'new-task',
        moduleId: PLATFORM.moduleName('project/task/components/task-edit'),
        name: 'new-task'
      },
```

This approach will also keep `app.js` clean from child routes as the app will grow larger.







