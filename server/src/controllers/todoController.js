import Todo from "../models/Todo.js";

const createTodo = async (req, res) => {
    const { title } = req.body;
    const todo = new Todo({
        user: req.user.id,
        title,
    });

    try {
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo' });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo' });
    }
};

export default { createTodo, getTodos, updateTodo, deleteTodo };
