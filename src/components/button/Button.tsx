/**
 * Represents the properties of a button component in a React application.
 *
 * @interface ButtonProps
 */

interface ButtonProps {
  /**
   * The content of the button.
   *
   * @type {React.ReactNode}
   */
  children: React.ReactNode;
  /**
   * The CSS class for styling the button.
   *
   * @type {string} - Classname
   */
  className: string;
  /**
   * The type of the button. Defaults to 'submit'.
   *
   * @type {'submit'} [buttonType]
   */
  buttonType?: 'submit';
  /**
   * A function to handle the button click event.
   *
   * @returns {void}
   */
  handleClick: () => void;
}

const Button = ({ children, className, handleClick, buttonType }: ButtonProps) => {
  return (
    <button className={className} onClick={handleClick} type={buttonType}>
      {children}
    </button>
  );
};

export default Button;
