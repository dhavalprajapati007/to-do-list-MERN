import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';
import Alert from '../helper/Alert';

interface Todo {
    _id: string;
    title: string;
    completed: boolean;
}

interface TodoContextType {
    todos: Todo[];
    addTodo: (title: string) => Promise<void>;
    updateTodo: (id: string, title: string, completed: boolean) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useContext(AuthContext)!;
    const [todos, setTodos] = useState<Todo[]>([]);

    let parsedUser = JSON.parse(user)
    const fetchTodos = async () => {
        try {
            const res = await api.get('/todos', {
                headers: { Authorization: `Bearer ${parsedUser?.token}` },
            });
            setTodos(res.data);
        } catch (error: any) {
            // Handle the error and show an alert
            const errorMessage = error.response?.data?.message || 'An error occurred while fetching todos.';
            Alert('error', errorMessage);
        }
    };


    useEffect(() => {
        if (user) {
            fetchTodos();
        }
    }, [user]);



    const addTodo = async (title: string) => {
        try {
            const res = await api.post(
                '/todos',
                { title },
                { headers: { Authorization: `Bearer ${parsedUser?.token}` } }
            );
            setTodos([...todos, res.data]);
            Alert('success', 'Todo added successfully.');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An error occurred while adding the todo.';
            Alert('error', errorMessage);
        }
    };


    const updateTodo = async (id: string, title: string, completed: boolean) => {
        try {
            const res = await api.put(
                `/todos/${id}`,
                { title, completed },
                { headers: { Authorization: `Bearer ${parsedUser?.token}` } }
            );
            setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
            Alert('success', 'Todo updated successfully.');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An error occurred while updating the todo.';
            Alert('error', errorMessage);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await api.delete(`/todos/${id}`, {
                headers: { Authorization: `Bearer ${parsedUser?.token}` },
            });
            setTodos(todos.filter((todo) => todo._id !== id));
            Alert('success', 'Todo deleted successfully.');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An error occurred while deleting the todo.';
            Alert('error', errorMessage);
        }
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }
        }>
            {children}
        </TodoContext.Provider>
    );
};
