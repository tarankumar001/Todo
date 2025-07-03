import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoClipboardOutline } from "react-icons/io5";
import axios from "axios";
import DarkModeToggle from './DarkModeToggle';
import './darkmode.css';
import AuthModal from './AuthModal';

const API_BASE = import.meta.env.MODE === "production" ? "" : "http://localhost:5000";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for theme preference
    return localStorage.getItem('theme') === 'dark';
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [showAuth, setShowAuth] = useState(false);

  // Helper to set auth state
  const handleAuthSuccess = (jwt, userObj) => {
    setToken(jwt);
    setUser(userObj);
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userObj));
    setShowAuth(false);
    fetchTodos(jwt);
  };

  // Logout
  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setTodos([]);
    setShowAuth(true);
  };

  // Axios config with JWT
  const axiosConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post(`${API_BASE}/api/todos`, { text: newTodo }, axiosConfig);
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
      else console.log("Error adding todo:", error);
    }
  };

  const fetchTodos = async (overrideToken) => {
    try {
      const config = overrideToken
        ? { headers: { Authorization: `Bearer ${overrideToken}` } }
        : axiosConfig;
      const response = await axios.get(`${API_BASE}/api/todos`, config);
      setTodos(response.data);
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
      else console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (token) fetchTodos();
    else setShowAuth(true);
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE}/api/todos/${id}`, { text: editedText }, axiosConfig);
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
      else console.log("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/todos/${id}`, axiosConfig);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
      else console.log("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(
        `${API_BASE}/api/todos/${id}`,
        { completed: !todo.completed },
        axiosConfig
      );
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
      else console.log("Error toggling todo:", error);
    }
  };

  return (
    <div className={`app-container${darkMode ? ' dark-bg' : ''}`}>
      <DarkModeToggle className="darkmode-toggle" darkMode={darkMode} setDarkMode={setDarkMode} />
      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} onAuthSuccess={handleAuthSuccess} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="main-card bg-white rounded-2xl shadow-xl w-full p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 text-center flex-1">
              Task Manager
            </h1>
            {user && (
              <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium">Logout</button>
            )}
          </div>

          <form
            onSubmit={addTodo}
            className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
          >
            <input
              className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              required
            />
            <button
              type="submit"
              className="add-task-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
            >
              Add Task
            </button>
          </form>
          <div className="mt-4">
            {todos.length === 0 ? (
              <div></div>
            ) : (
              <div className="flex flex-col gap-4">
                {todos.map((todo) => (
                  <div key={todo._id} className="todo-item">
                    {editingTodo === todo._id ? (
                      <div className="flex items-center gap-x-3">
                        <input
                          className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                        />
                        <div className="flex gap-x-2">
                          <button
                            onClick={() => saveEdit(todo._id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
                          >
                            <MdOutlineDone />
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
                            onClick={() => setEditingTodo(null)}
                          >
                            <IoClose />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-x-4 overflow-hidden">
                            <button
                              onClick={() => toggleTodo(todo._id)}
                              className={`tick-btn icon-btn flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center${
                                todo.completed ? " completed" : ""
                              } ${
                                todo.completed
                                  ? "bg-green-500 border-green-500"
                                  : "border-gray-300 hover:border-blue-400"
                              }`}
                            >
                              {todo.completed && (
                                <span className="tick-animate">
                                  <MdOutlineDone />
                                </span>
                              )}
                            </button>
                            <span className="text-gray-800 truncate font-medium">
                              {todo.text}
                            </span>
                          </div>
                          <div className="flex gap-x-2">
                            <button
                              className="icon-btn p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                              onClick={() => startEditing(todo)}
                            >
                              <MdModeEditOutline />
                            </button>
                            <button
                              onClick={() => deleteTodo(todo._id)}
                              className="icon-btn p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
