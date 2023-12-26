import Button from '../button/Button';
import InputField from '../Input';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthServices } from '../../todo-services/auth-services';
import { useErrorBoundary } from 'react-error-boundary';

/**
 * Represents an extended HTML form element with specific named form controls.
 *
 * @interface ExtendedFormElement
 * @extends {HTMLFormElement}
 */
interface ExtendedFormElement extends HTMLFormElement {
  /**
   * Collection of form controls within the extended form element.
   *
   * @type {HTMLFormControlsCollection & {
   *   userEmail: HTMLInputElement;
   *   userName?: HTMLInputElement | undefined;
   *   userPassword: HTMLInputElement;
   * }}
   */
  elements: HTMLFormControlsCollection & {
    /**
     * The input element for the user's email.
     *
     * @type {HTMLInputElement}
     */
    userEmail: HTMLInputElement;
    /**
     * Optional: The input element for the user's name.
     *
     * @type {HTMLInputElement | undefined}
     */
    userName?: HTMLInputElement | undefined;
    /**
     * The input element for the user's password.
     *
     * @type {HTMLInputElement}
     */
    userPassword: HTMLInputElement;
  };
}

/**
 * Props for the Register component.
 * @interface RegisterProps
 */
interface RegisterProps {
  /**
   * A function to set user details in the parent component.
   * @function
   *
   * @param {boolean} userDetails.isUser - Indicates if the user is authenticated.
   * @param {string} userDetails.userName - The name of the user.
   * @param {string} userDetails.userEmail - The email of the user.
   * @returns {void} - will return nothing only it will update state.
   */
  setUserDetail: (userDetails: { isUser: boolean; userName: string; userEmail: string }) => void;
}

const Register = ({ setUserDetail }: RegisterProps) => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const formRef = useRef<ExtendedFormElement | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [isError, setIsError] = useState('');
  const [userCreated, setUserCreated] = useState(false);

  const handleSwitchLoginRegitser = (isItTrue: boolean) => {
    formRef.current!.reset();
    setIsRegister(isItTrue);
  };

  const handleError = (error: string) => {
    setIsError(error);
    formRef.current!.elements.userPassword.value = '';
    setTimeout(() => {
      setIsError('');
    }, 2000);
  };

  const handleRegistration = async (formData: { userEmail: string; userName: string; userPassword: string }) => {
    try {
      const { userEmail, userName, userPassword } = formData;
      const newUser = await AuthServices.register({ userEmail, userName, userPassword });

      if (newUser.error === undefined) {
        setUserCreated(true);
        setTimeout(() => {
          setUserCreated(false);
          handleSwitchLoginRegitser(false);
          navigate('/login');
        }, 2000);
      } else {
        handleError(newUser.error);
      }
    } catch (error) {
      showBoundary(error);
    }
  };

  const handleLogin = async (formData: { userEmail: string; userPassword: string }) => {
    try {
      const { userEmail, userPassword } = formData;
      const loginData = { userEmail, userPassword };

      const login = await AuthServices.login(loginData);
      if (login.error === undefined) {
        setUserDetail({
          isUser: true,
          userName: login.userData.userName,
          userEmail: userEmail,
        });
        navigate('/all');
      } else {
        handleError(login.error);
      }
    } catch (error) {
      showBoundary(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<ExtendedFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userEmail = (formData.get('userEmail') ?? '') as string;
    const userName = (formData.get('userName') ?? '') as string;
    const userPassword = (formData.get('userPassword') ?? '') as string;

    if (isRegister) {
      await handleRegistration({ userEmail, userName, userPassword });
    } else {
      await handleLogin({ userEmail, userPassword });
    }
  };

  return (
    <div className="pt-40 h-3/4 w-1/2">
      <form ref={formRef} className="ml-24 font-semibold flex flex-col items-center" onSubmit={handleSubmit}>
        {userCreated && <p className="text-orange-300 mb-4">User created successfully!</p>}
        {isError !== '' && <p className="text-orange-300 mb-4">{isError}</p>}
        <InputField className="input my-5" type="text" name="userEmail" placeholder="Enter your Email" />

        {isRegister && <InputField className="input my-5" type="text" name="userName" placeholder="Enter your Name" />}
        <InputField className="input my-5" type="password" name="userPassword" placeholder="Enter your Password" />

        <Button className="todo-btn  my-5  ml-0" handleClick={() => handleSubmit}>
          {isRegister ? 'Register' : 'Login'}
        </Button>

        <p className="text-white">
          {isRegister ? (
            <>
              Already have an account?{' '}
              <Link to="/login" className=" text-amber-300" onClick={() => handleSwitchLoginRegitser(false)}>
                Login Here
              </Link>
            </>
          ) : (
            <>
              Create an Account.{' '}
              <Link to="/register" className=" text-amber-300" onClick={() => handleSwitchLoginRegitser(true)}>
                Register Here
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Register;
