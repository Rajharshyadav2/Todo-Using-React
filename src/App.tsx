import './global.css';
import classNames from 'classnames';
import Navbar from './components/navbar/Navbar';
import Todos from './components/todo/Todos';
import Button from './components/button/Button';
import Register from './components/login/Register';
import { Routes, Route, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import type { TodoType } from './types';
import { useErrorBoundary } from 'react-error-boundary';
import { AuthServices } from './todo-services/auth-services';
import { TodoServices } from './todo-services/todo-services';

/**
 * Renders the main application component.
 *
 * @function
 * @returns {JSX.Element} The JSX element representing the main application component.
 */

function App() {
  const { showBoundary } = useErrorBoundary();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [userDetail, setUserDetail] = useState({
    isUser: false,
    userName: '',
    userEmail: '',
  });

  useEffect(() => {
    if (userDetail.isUser) {
      const fetchTodos = async () => {
        try {
          const response = await TodoServices.getAllTodos();
          console.log(response);
          setTodos(response);
        } catch (error) {
          console.log(`from App.tsx: ${error}`);
          showBoundary(error);
        }
      };
      fetchTodos();
    }
  }, [userDetail.isUser, showBoundary]);

  const handleLogout = async () => {
    try {
      await AuthServices.logout();
      setUserDetail({
        isUser: false,
        userName: '',
        userEmail: '',
      });
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div
      className={classNames('h-screen pb-4 font-primaryFont font-black', {
        'bg-loginBg': !userDetail.isUser,
      })}
    >
      {userDetail.isUser ? (
        <div>
          <div className="flex justify-around">
            <h1 className="pt-3 mb-4 text-textColor text-2xl">My Todo</h1>
            <div className="flex">
              <div className="flex flex-col justify-center text-s font-semibold font-primaryFont">
                <p className="mx-auto">{userDetail.userName}</p>
                <p className="text-xs">{userDetail.userEmail}</p>
              </div>
              <Button className="todo-btn my-auto" handleClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
          <Navbar setTodos={setTodos} />
          <Routes>
            <Route path="/all" element={<Todos todos={todos} setTodos={setTodos} />}></Route>
            <Route
              path="/inprogress"
              element={<Todos todos={todos.filter((todo) => todo.status === 'Pending')} setTodos={setTodos} />}
            ></Route>
            <Route
              path="/completed"
              element={<Todos todos={todos.filter((todo) => todo.status === 'Completed')} setTodos={setTodos} />}
            ></Route>
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Register setUserDetail={setUserDetail} />} />
          <Route path="/register" element={<Register setUserDetail={setUserDetail} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
