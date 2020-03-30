import _ from 'lodash';

export class TaskService {
  constructor() {
    this.tasks = [
      {
        taskName: 'Test',
        projectName: 'Test Project',
        priority: 1,
        startDate: new Date()
      },
      {
        taskName: 'Test 2',
        projectName: 'Test Project 2',
        priority: 3,
        startDate: new Date()
      }
    ];
  }

  getTasks() {
    return new Promise(resolve => {
      resolve(_.cloneDeep(this.tasks));
    });
  }

  createTask(task) {
    return new Promise(resolve => {
      const newTask = Object.assign({}, task);
      this.tasks.push(newTask);
      resolve(newTask);
    });
  }
}


