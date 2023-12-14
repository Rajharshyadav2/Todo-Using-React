import './Navbar.css';
import '../button/button.css';
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
    <nav className="nav-bar">
      <ul className="nav-bar-items">
        <Link to="/">
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
          <li id="add-btn">
            <Button className="btn" handleClick={() => setIsAddModalOpen(true)}>
              +
            </Button>
          </li>
        </Link>
      </ul>
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        ariaHideApp={false}
        style={{
          content: {
            top: '20%',
            border: 'none',
          },
        }}
      >
        <AddTodo closeModal={closeAddModal} setTodos={setTodos} />
      </Modal>
    </nav>
  );
};

export default Navbar;
