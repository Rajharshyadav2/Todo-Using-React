import Modal from 'react-modal';
import Button from '../button/Button';
import AddTodo from '../Add-todo/AddTodo';
import NavButton from '../button/NavButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CurrentNavItemType, TodoType } from '../../types';

// Navbar component for displaying navigation buttons.
interface NavbarProps {
  /**
   * A function to update the state of Todo items.
   */
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}
const Navbar = ({ setTodos }: NavbarProps) => {
  const [currentNavItem, setCurrentNavItem] = useState<CurrentNavItemType>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <nav className="h-auto w-5/6 mx-auto text-textColor border-y-2 border-black shadow-2xl shadow-gray-900 opacity-100 ">
      <ul className="flex justify-around my-2 ">
        <Link to="/all">
          <NavButton value="All" isActive={currentNavItem === 'All'} setCurrentNavItem={setCurrentNavItem} />
        </Link>

        <Link to="/inprogress">
          <NavButton
            value="In Progress"
            isActive={currentNavItem === 'In Progress'}
            setCurrentNavItem={setCurrentNavItem}
          />
        </Link>

        <Link to="/completed">
          <NavButton
            value="Completed"
            isActive={currentNavItem === 'Completed'}
            setCurrentNavItem={setCurrentNavItem}
          />
        </Link>

        <Link to="">
          <li className="bg-indigo-500 font-primaryFont font-black rounded-xl px-10 cursor-pointer transform hover:border-[3px] border-green-900 shadow-gray-900 opacity-80">
            <Button className="btn" handleClick={() => setIsAddModalOpen(true)}>
              +
            </Button>
          </li>
        </Link>
      </ul>
      <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal} ariaHideApp={false} className={'edit-modal'}>
        <AddTodo closeModal={closeAddModal} setTodos={setTodos} />
      </Modal>
    </nav>
  );
};

export default Navbar;
