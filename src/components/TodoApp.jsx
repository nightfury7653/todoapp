import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  };

  const updateTodo = (id) => {
    if (editValue.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editValue.trim() } : todo
      ));
      setEditingId(null);
      setEditValue('');
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Task Manager
          </h1>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className="bg-white/20 rounded-full px-6 py-2">
              <p className="text-white text-lg">
                {todos.filter(t => !t.completed).length} tasks remaining
              </p>
            </div>
            <div className="bg-white/20 rounded-full px-6 py-2">
              <p className="text-white text-lg">
                {todos.filter(t => t.completed).length} completed
              </p>
            </div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 p-6">
          <form onSubmit={addTodo} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-6 py-4 rounded-xl text-gray-700 bg-gray-50 border-2 border-gray-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-lg"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all text-lg group"
            >
              <PlusCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">Add Task</span>
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-100">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`p-6 transition-all duration-200 hover:bg-gray-50 ${
                  todo.completed ? 'bg-gray-50' : ''
                }`}
              >
                {editingId === todo.id ? (
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 px-6 py-3 rounded-xl text-gray-700 bg-white border-2 border-gray-200 focus:outline-none focus:border-blue-400 text-lg"
                      autoFocus
                    />
                    <button
                      onClick={() => updateTodo(todo.id)}
                      className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all text-lg flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <label className="flex items-center flex-1 cursor-pointer group">
                      <div 
                        onClick={() => toggleComplete(todo.id)}
                        className="relative flex items-center justify-center"
                      >
                        {todo.completed ? 
                          <CheckCircle className="w-6 h-6 text-green-500 transition-all" /> :
                          <Circle className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-all" />
                        }
                      </div>
                      <span className={`ml-4 text-lg ${
                        todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                      }`}>
                        {todo.text}
                      </span>
                    </label>
                    <div className="flex gap-3 w-full md:w-auto">
                      <button
                        onClick={() => startEdit(todo)}
                        className="flex-1 md:flex-initial px-4 py-2 text-base bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden md:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="flex-1 md:flex-initial px-4 py-2 text-base bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden md:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          {todos.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <button
                onClick={clearCompleted}
                className="w-full md:w-auto px-6 py-3 text-base text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear completed tasks
              </button>
            </div>
          )}

          {/* Empty State */}
          {todos.length === 0 && (
            <div className="p-12 text-center">
              <div className="bg-blue-50 rounded-2xl p-8 inline-block">
                <CheckCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-700">Your task list is empty</p>
                <p className="text-base mt-2 text-gray-500">Add some tasks to get started!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;