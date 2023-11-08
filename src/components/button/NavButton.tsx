import classNames from 'classnames';
import Button from './Button';
import { CurrentNavItemType } from '../../types';

/**
 * Represents the properties of a navigation button in a Navbar component.
 *
 * @interface NavButtonType
 *
 * @property {CurrentNavItemType} value - The value of the navigation button, representing 'All', 'In Progress', 'Completed', or 'Add-Todo'.
 * @property {boolean} isActive - Indicates whether the navigation button is currently active.
 * @property {(value: CurrentNavItemType) => void} setCurrentNavItem - A function to update the header value in the parent component.
 */
interface NavButtonType {
  value: CurrentNavItemType;
  isActive: boolean;
  setCurrentNavItem: (value: CurrentNavItemType) => void;
}

const NavButton = ({ value, isActive, setCurrentNavItem }: NavButtonType) => {
  return (
    <li>
      <Button
        handleClick={() => setCurrentNavItem(value)}
        className={classNames('nav-btn', { 'nav-btn-active': isActive })}
      >
        {value}
      </Button>
    </li>
  );
};

export default NavButton;
