import { TodoType } from '../types';

/**
 * Service class for handling Todo operations.
 *
 * @class TodoServices
 */
export class TodoServices {
  /**
   * Base URL for Todo API.
   * @static
   * @private
   *
   * @type {string}
   */
  private static URL: string = import.meta.env.VITE_TODO_URL;

  /**
   * Creates a new Todo.
   *
   * @static
   * @async
   * @param {TodoType} todoData - The data for the new Todo.
   *
   * @returns {Promise<TodoType>} The created Todo.
   */
  static async createTodo(todoData: TodoType): Promise<TodoType> {
    try {
      const response = await fetch(this.URL, {
        method: 'POST',
        headers: {
          Authorization: import.meta.env.VITE_DEV_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
        credentials: 'include',
      });

      const fetchedData = await response.json();
      // console.log(fetchedData.data);
      return fetchedData.data;
      // return response
    } catch (error) {
      throw new Error('Failed to Create Todo');
    }
  }

  /**
   * Retrieves all Todos.
   *
   * @static
   * @async
   * @returns {Promise<TodoType[]>} All Todos.
   */
  static async getAllTodos(): Promise<TodoType[]> {
    try {
      const response = await fetch(this.URL, {
        headers: {
          Authorization: import.meta.env.VITE_DEV_API_KEY,
        },
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to Fetch Todos');
    }
  }

  /**
   * Retrieves a Todo by ID.
   *
   * @static
   * @async
   * @param {number} todoId - The ID of the Todo to retrieve.
   * @returns {Promise<TodoType>} The retrieved Todo.
   */
  static async getTodoById(todoId: number): Promise<TodoType> {
    try {
      const response = await fetch(`${this.URL}/${todoId}`, {
        headers: {
          Authorization: import.meta.env.VITE_DEV_API_KEY,
        },
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to Fetch Todo by ID');
    }
  }

  /**
   * Updates a Todo.
   *
   * @static
   * @async
   * @param {number} todoId - The ID of the Todo to update.
   * @param {TodoType} updatedTodoData - The updated data for the Todo.
   * @returns {Promise<TodoType>} The updated Todo.
   */
  static async updateTodo(todoId: number, updatedTodoData: TodoType): Promise<TodoType> {
    try {
      const response = await fetch(`${this.URL}/${todoId}`, {
        method: 'PUT',
        headers: {
          Authorization: import.meta.env.VITE_DEV_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodoData),
        credentials: 'include',
      });

      return await response.json();
    } catch (error) {
      throw new Error('Failed to update todo with ID');
    }
  }

  /**
   * Deletes a Todo.
   *
   * @static
   * @async
   * @param {number} todoId - The ID of the Todo to delete.
   * @returns {Promise<{ status: number }>} The status of the deletion operation.
   */
  static async deleteTodo(todoId: number): Promise<{ status: number }> {
    try {
      const response = await fetch(`${this.URL}/${todoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: import.meta.env.VITE_DEV_API_KEY,
        },
        credentials: 'include',
      });
      return { status: response.status };
    } catch (error) {
      throw new Error('Failed to delete todo with ID ');
    }
  }
}
