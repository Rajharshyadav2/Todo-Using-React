import './addtodo.css';
import '../navbar/Navbar.css';
import '../todo/todo.css';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TodoServices } from '../../todo-services/todoServices';
import { TodoType } from '../../types';
import { useErrorBoundary } from 'react-error-boundary';
import { taskSchema } from '../../types';
import { ZodError } from 'zod';

/**
 * Props for the AddTodo component.
 * @interface AddTodoProps
 */
interface AddTodoProps {
  /**
   * Function to close the modal.
   * @function
   * @name closeModal
   * @returns {void}
   */
  closeModal: () => void;
  /**
   * Indicates whether it is an update operation. Default is `false`.
   *
   * @type {boolean}
   */
  isUpdate?: boolean;
  /**
   * The todo object for update operation.
   *
   */
  todo?: { id: number; title: string; description: string; dueDate: string; status: string };
  /**
   * A function to update the state of Todo items.
   */
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}
export const AddTodo = ({ closeModal, isUpdate = false, todo, setTodos }: AddTodoProps) => {
  const [todoTitle, setTodoTitle] = useState(todo?.title || '');
  const [todoDescritption, setTodoDescription] = useState(todo?.description || '');
  const [todoDueDate, setTodoDueDate] = useState(todo?.dueDate || '');
  const [isCompleted, setIsCompleted] = useState(todo?.status === 'Completed' ? true : false);
  const [validationErrors, setValidationErrors] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const handleCreateClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = taskSchema.parse({
        title: todoTitle,
        description: todoDescritption,
        dueDate: todoDueDate,
        status: isCompleted ? 'Completed' : 'Pending',
      });

      const newTodo = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: isCompleted ? 'Completed' : 'Pending',
      };
      console.log(todo?.status, isCompleted, data.status, newTodo.status);

      setValidationErrors({
        title: '',
        description: '',
        dueDate: '',
      });

      if (isUpdate) {
        const updatedtodo = await TodoServices.updateTodo(todo!.id, newTodo);
        setTodos((prevTodo) => prevTodo.map((currTodo) => (currTodo.id === todo!.id ? updatedtodo : currTodo)));
      } else {
        const createTodo = await TodoServices.createTodo(newTodo);
        setTodos((prevTodo) => [...prevTodo, createTodo]);
      }
      navigate('/');
      closeModal();
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors = { title: '', description: '', dueDate: '' };

        error.errors.forEach((validationError) => {
          switch (validationError.path[0]) {
            case 'title':
              newErrors.title = validationError.message;
              break;
            case 'description':
              newErrors.description = validationError.message;
              break;
            case 'dueDate':
              newErrors.dueDate = validationError.message;
              break;
            default:
              showBoundary(error);
              break;
          }
        });

        console.log(newErrors);
        setValidationErrors(newErrors);
      } else {
        console.error(error);
        showBoundary(error);
      }
    }
  };
  return (
    <div className="add-todo-body">
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreateClick(e)}>
        {/* <div className="text-input"> */}
        <input
          type="text"
          id="todoTitle"
          placeholder="Todo Title"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        {validationErrors.title && <span>{`tittle: ${validationErrors.title}`}</span>}
        {/* </div> */}

        <textarea
          placeholder="Todo Description"
          style={{ resize: 'none' }}
          value={todoDescritption}
          required
          onChange={(e) => setTodoDescription(e.target.value)}
        ></textarea>
        {validationErrors.description && <span>{`desccription: ${validationErrors.description}`}</span>}
        <input
          type="date"
          placeholder="DueDate: YYYY-MM-DD"
          value={todoDueDate}
          required
          onChange={(e) => setTodoDueDate(e.target.value)}
        />
        {validationErrors.dueDate && <span>{`dueDate: ${validationErrors.dueDate}`}</span>}
        {isUpdate && (
          <label className="add-completed">
            <input type="checkbox" checked={isCompleted} onChange={() => setIsCompleted(!isCompleted)} />
            Completed
          </label>
        )}
        <div className="add-btn-grp">
          <Button className="todo-btn" handleClick={closeModal}>
            Cancel
          </Button>
          <Button className="todo-btn" handleClick={() => handleCreateClick} buttonType="submit">
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
