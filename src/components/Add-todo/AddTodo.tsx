import Button from '../button/Button';
import Input from '../Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { ZodError } from 'zod';
import { TodoType, taskSchema } from '../../types';
import { TodoServices } from '../../todo-services/todo-services';

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
      navigate('/all');
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
        setValidationErrors(newErrors);
      } else {
        showBoundary(error);
      }
    }
  };
  return (
    <div className="w-2/4 min-w-fit my-[3rem] mx-auto border-1 border-black bg-formBg rounded-3xl">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreateClick(e)}
        className=" h-3/4 flex flex-col flex-wrap justify-center items-center p-[2%]"
      >
        <Input
          className="input"
          type="text"
          name="todoTitle"
          placeholder="Todo Title"
          value={todoTitle}
          required={true}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        {validationErrors.title && <span className="validation-message">{`tittle: ${validationErrors.title}`}</span>}
        <textarea
          className=" w-1/2 h-16 py-2 px-4 mt-5 border-none rounded-md outline-none"
          placeholder="Todo Description"
          style={{ resize: 'none' }}
          value={todoDescritption}
          required
          onChange={(e) => setTodoDescription(e.target.value)}
        ></textarea>
        {validationErrors.description && (
          <span className="validation-message">{`desccription: ${validationErrors.description}`}</span>
        )}

        <Input
          className="input"
          type="date"
          name="todoDueDate"
          placeholder="DueDate: YYYY-MM-DD"
          value={todoDueDate}
          required={true}
          onChange={(e) => setTodoDueDate(e.target.value)}
        />
        {validationErrors.dueDate && (
          <span className="validation-message">{`dueDate: ${validationErrors.dueDate}`}</span>
        )}
        {isUpdate && (
          <label className="flex justify-between text-black font-semibold text-lg mt-5">
            <input
              className=" h-4 w-4 mr-2 mt-2"
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
            />
            Completed
          </label>
        )}
        <div className="mt-2.5 py-4 ">
          <Button className="todo-btn text-red-600" handleClick={closeModal}>
            Cancel
          </Button>
          <Button className="todo-btn text-green-700" handleClick={() => handleCreateClick} buttonType="submit">
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
