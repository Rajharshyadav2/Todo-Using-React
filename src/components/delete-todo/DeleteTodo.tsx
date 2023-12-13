import './deleteTodo.css';
import '../Add-todo/addtodo.css';
import Button from '../button/Button';
import { TodoServices } from '../../todo-services/todoServices';
import { useNavigate } from 'react-router-dom';
import { TodoType } from '../../types';
import { useErrorBoundary } from 'react-error-boundary';

/**
 * Represents the properties of a DeleteTodo component in a React application.
 *
 * @interface DeleteTodoProps
 */

interface DeleteTodoProps {
  /**
   * The id of the todo.
   *
   * @type {number}
   */
  id: number;
  /**
   * A function to update the state of Todo items.
   */
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  /**
   * Function to close the modal.
   * @function
   * @returns {void}
   */
  closeModal: () => void;
}

const DeleteTodo = ({ id, setTodos, closeModal }: DeleteTodoProps) => {
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const deleteOperation = async () => {
    try {
      await TodoServices.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      closeModal();
      navigate('/');
    } catch (error) {
      showBoundary(error);
    }
  };
  return (
    <div className="delete-body">
      <h4>Are you sure to delete ?</h4>
      <div className="delete-btn-grp">
        <Button className="todo-btn" handleClick={() => closeModal()}>
          Cancel
        </Button>
        <Button className="todo-btn" handleClick={() => deleteOperation()}>
          delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteTodo;
