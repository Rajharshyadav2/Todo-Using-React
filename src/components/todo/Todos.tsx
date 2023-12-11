import Todo from './Todo';
import { TodoServices } from '../../todo-services/todoServices';

/**
 * Represents the properties of a Todos component in a React application.
 *
 * @interface TodosProps
 */
interface TodosProps {
  /**
   * The type of todos to display, which can be 'all', 'inprogress', or 'completed'.
   *
   * @type {string} -can be 'all', 'inprogress', or 'completed'.
   */
  todoRequest: 'all' | 'inprogress' | 'completed';
}

const Todos = ({ todoRequest }: TodosProps) => {
  const filteredTodos = () => {
    switch (todoRequest) {
      case 'inprogress':
        return TodoServices.getPendingTodos();

      case 'completed':
        return TodoServices.getCompletedTodos();

      default:
        return TodoServices.getAllTodos();
    }
  };

  return (
    <>
      {filteredTodos().map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          description={todo.description}
          dueDate={todo.dueDate}
          status={todo.status}
        />
      ))}
    </>
  );
};

export default Todos;
