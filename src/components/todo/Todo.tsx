import './todo.css';
import { format, parseISO } from 'date-fns';
import Button from '../button/Button';

/**
 * Represents the properties of a Todo component in a React application.
 *
 * @interface TodoProps
 */
interface TodoProps {
  /**
   * The title of the todo.
   *
   * @type {string}
   */
  title: string;
  /**
   * The due date of the todo.
   *
   * @type {string}
   */
  dueDate: string;
  /**
   * The description of the todo.
   *
   * @type {string}
   */
  description: string;
  /**
   * The status of the todo, which can be either 'Completed' or 'Incomplete'.
   *
   * @type {string} -'Pending' | 'Completed'
   */
  status: string;
}
const Todo = ({ title, dueDate, description, status }: TodoProps) => {
  return (
    <div className="todo-body">
      <div className="todo-header">
        <h3>{title}</h3>

        <h3>Due On: {format(parseISO(dueDate), 'yyyy-MMM-dd')}</h3>
      </div>
      <div className="todo-desc">
        <h4>{description}</h4>
      </div>
      <div className="todo-footer">
        <label>
          {' '}
          <input type="checkbox" checked={status === 'Completed'} readOnly /> Completed
        </label>
        <div className="todo-btn-grp">
          <Button className="todo-btn" handleClick={() => console.log('Welcome to delete')}>
            Delete
          </Button>
          <Button className="todo-btn" handleClick={() => console.log('Welcome to edit')}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
