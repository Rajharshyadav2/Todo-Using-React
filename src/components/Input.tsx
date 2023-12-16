import React from 'react';
/**
 * Represents the properties for an input component.
 * @interface
 */
interface InputProps {
  /**
   * A space-separated list of class names to apply to the input element.
   * @type {string}
   * @optional
   */
  className?: string;
  /**
   * The type of the input element.
   * @type {string}
   */
  type: string;
  /**
   * The name attribute of the input element.
   * @type {string}
   * @optional
   */
  name?: string;
  /**
   * The placeholder text for the input element.
   * @type {string}
   * @optional
   */
  placeholder?: string;
  /**
   * The current value of the input element.
   * @type {string}
   */
  value: string;

  /**
   * Indicates whether the input element is checked (for checkbox or radio types).
   * @type {boolean}
   * @optional
   */
  checked?: boolean;
  /**
   * Indicates whether the input field is reuqired.
   * @type {boolean}
   * @optional
   */
  required?: boolean;
  /**
   * A function that will be called when the input value changes.
   * @type {(e: React.ChangeEvent<HTMLInputElement>) => void}
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ className, type, name, placeholder, value, checked, required, onChange }: InputProps) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      checked={checked}
      onChange={onChange}
      required={required}
    />
  );
};

export default InputField;
