import { TodoType } from '../types';
/**
 * Class representing a simple Todo service.
 */
export class TodoServices {
  private static todos: TodoType[] = [
    {
      id: 1,
      title: 'todo api',
      description: 'Finish the report by tomorrow',
      dueDate: '2023-11-11',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Testing',
      description: 'Finish the report by 5 PM',
      dueDate: '2023-10-31',

      status: 'Pending',
    },
    {
      id: 3,
      title: 'Testing',
      description: 'Finish the report by 5 PM',
      dueDate: '2023-10-30',

      status: 'Completed',
    },
    {
      id: 4,
      title: 'Testing',
      description: 'Finish the report by 5 PM',
      dueDate: '2023-10-31',

      status: 'Pending',
    },
    {
      id: 5,
      title: 'Testing',
      description: 'Finish the report by 5 PM',
      dueDate: '2023-10-28',

      status: 'Completed',
    },
    {
      id: 6,
      title: 'Testing',
      description: 'Finish the report by 5 PM',
      dueDate: '2023-10-31',

      status: 'Pending',
    },
    {
      id: 7,
      title: 'Testing',
      description: 'Finish the report by 5 PM',
      dueDate: '2023-10-26',

      status: 'Completed',
    },
    {
      id: 8,
      title: 'Todo API',
      description: 'Finish the report by tomorrow',
      dueDate: '2023-10-31',

      status: 'Pending',
    },
    {
      id: 9,
      title: 'Testing',
      description: 'Finish the report by 5 PM',
      dueDate: '2023-10-31',

      status: 'Pending',
    },
    {
      id: 10,
      title: 'Testing',
      description: 'Finish the report by 5 PM',
      dueDate: '2023-10-22',
      status: 'Completed',
    },
    {
      id: 11,
      title: 'Tesaosfmlasfating',
      description: 'Finish the report by 5 PMa afnasklfnaslfsasf',
      dueDate: '2023-10-22',
      status: 'Completed',
    },
  ];
  /**
   * Creates a new Todo and adds it to the list of todos.
   * @param {TodoType} todoData - The data for the new Todo.
   * @returns {void}
   */
  static createTodo(todoData: TodoType) {
    this.todos.push(todoData);
  }
  /**
   * Retrieves all todos with 'Pending' status.
   * @returns {TodoType[]} An array of todos with 'Pending' status.
   */
  static getPendingTodos() {
    return this.todos.filter((todo) => todo.status === 'Pending');
  }

  /**
   * Retrieves all todos with 'Completed' status.
   * @returns {TodoType[]} An array of todos with 'Completed' status.
   */
  static getCompletedTodos() {
    return this.todos.filter((todo) => todo.status === 'Completed');
  }

  /**
   * Retrieves all todos.
   * @returns {TodoType[]} An array of all todos.
   */
  static getAllTodos() {
    return this.todos;
  }
}
