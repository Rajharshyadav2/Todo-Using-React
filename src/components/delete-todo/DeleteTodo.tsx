import Button from '../button/Button';
import './deleteTodo.css';
import '../Add-todo/addtodo.css';

/**
 * Represents the properties of a DeleteTodo component in a React application.
 *
 * @interface DeleteTodoProps
 */

interface DeleteTodoProps {
  /**
   * Function to close the modal.
   * @function
   * @param {boolean} isDeleteModalOpen - Indicates whether the deletion is confirmed.
   * @returns {void}
   */
  closeModal: (isDeleteModalOpen: boolean) => void;
}

const DeleteTodo = ({ closeModal }: DeleteTodoProps) => {
  return (
    <div className="delete-body">
      <h4>Are you sure to delete ?</h4>
      <div className="delete-btn-grp">
        <Button className="todo-btn" handleClick={() => closeModal(false)}>
          Cancel
        </Button>
        <Button className="todo-btn" handleClick={() => console.log('Deleted')}>
          delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteTodo;
