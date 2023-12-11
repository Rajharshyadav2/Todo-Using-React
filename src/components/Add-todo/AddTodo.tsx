import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './addtodo.css';
import '../navbar/Navbar.css';
import '../todo/todo.css';
import Button from '../button/Button';
import { TodoServices } from '../../todo-services/todoServices';

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
  todo?: { title: string; description: string; dueDate: string; status: string };
}
export const AddTodo = ({ closeModal, isUpdate = false, todo }: AddTodoProps) => {
  const [todoTitle, setTodoTitle] = useState(todo?.title || '');
  const [todoDescritption, setTodoDescription] = useState(todo?.description || '');
  const [todoDueDate, setTodoDueDate] = useState(todo?.dueDate || '');
  const [isCompleted, setIsCompleted] = useState(todo?.status === 'Pending' ? false : true);
  const navigate = useNavigate();

  function handleCreateClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTodo = {
      id: 100,
      title: todoTitle,
      description: todoDescritption,
      dueDate: todoDueDate,
      status: 'Pending',
    };
    TodoServices.createTodo(newTodo);
    closeModal();
    navigate('/');
  }

  return (
    <div className="add-todo-body">
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreateClick(e)}>
        <input type="text" placeholder="Todo Title" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} />

        <textarea
          placeholder="Todo Description"
          style={{ resize: 'none' }}
          value={todoDescritption}
          onChange={(e) => setTodoDescription(e.target.value)}
        ></textarea>

        <input
          type="date"
          placeholder="DueDate: YYYY-MM-DD"
          value={todoDueDate}
          onChange={(e) => setTodoDueDate(e.target.value)}
        />
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
