import Modal from 'react-modal';
import Button from '../button/Button';
import AddTodo from '../Add-todo/AddTodo';
import DeleteTodo from '../delete-todo/DeleteTodo';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import type { TodoType } from '../../types';

/**
 * Represents the properties of a Todo component in a React application.
 *
 * @interface TodoProps
 */
interface TodoProps {
  /**
   * The id of the todo.
   *
   * @type {number}
   */
  id: number;
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
  /**
   * A function to update the state of Todo items.
   */
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}
const Todo = ({ id, title, dueDate, description, status, setTodos }: TodoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="w-1/2 my-10 p-2 mx-auto border-todoBorder bg-todoBg rounded-2xl transition-all shadow-2xl hover:scale-110 ease-out duration-500">
      <div className="flex py-1.5 text-green-700 font-bold text-xl">
        <h3 className="w-[55%] mr-1.5 px-6 text-left underline text-2xl">{title}</h3>

        <h3 className="w-[40%] font-todoDesc text-right">Due On: {format(parseISO(dueDate), 'yyyy-MMM-dd')}</h3>
      </div>
      <div className="text-left py-1 px-2 ">
        <h4 className=" text-black my-1 mx-3.5 font-todoDesc font-medium text-lg">{description}</h4>
      </div>
      <div className="flex justify-between py-2 px-5">
        <label className="w-1/2 text-lg font-semibold text-left">
          <input type="checkbox" checked={status === 'Completed'} readOnly /> Completed
        </label>
        <div>
          <Button className="todo-btn text-red-600 hover:border-red-700" handleClick={() => openModal('delete')}>
            Delete
          </Button>
          <Button className="todo-btn text-green-700" handleClick={() => openModal('edit')}>
            Edit
          </Button>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            className={modalType === 'edit' ? 'edit-modal' : 'delete-modal'}
          >
            {modalType === 'edit' ? (
              <AddTodo
                closeModal={closeModal}
                isUpdate={modalType === 'edit'}
                todo={{ id, title, description, dueDate, status }}
                setTodos={setTodos}
              />
            ) : (
              <DeleteTodo closeModal={closeModal} setTodos={setTodos} id={id} />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Todo;
