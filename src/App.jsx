import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const createTask = async (title, description) => {
    const response = await axios.post("http://localhost:3000/tasks", {
      title,
      description,
    });
    console.log(response);
    const createdTasks = [...tasks, response.data];
    setTasks(createdTasks);
  };
  const deleteTaskById = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => task.id !== id);
    // const afterDeletingTasks = tasks.filter((task) =>{ üstteki kod ile aynı işlevi görüyor
    //   return task.id!== id
    // })
    setTasks(afterDeletingTasks);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  const editTaskById = (id, updatedTitle, updatedDescription) => {
    axios.put(`http://localhost:3000/tasks/${id}`, {
      title: updatedTitle,
      description: updatedDescription,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id,
          title: updatedTitle,
          description: updatedDescription,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>Görevler</h1>
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;
