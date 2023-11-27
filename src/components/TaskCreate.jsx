import { useState } from "react";

function TaskCreate({ onCreate, task, taskFormUpdate, onUpdate }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const [description, setDescription] = useState(task ? task.description : "");
  const DescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskFormUpdate) {
      onUpdate(task.id, title, description);
    } else {
      onCreate(title, description);
    }

    setTitle("");
    setDescription("");
  };

  return (
    <div>
      {taskFormUpdate ? (
        <div className="task-update">
          <h3>Lütfen Taskı Düzenleyiniz!</h3>
          <form className="task-form">
            <label>Başlığı Düzenleyiniz</label>
            <input
              value={title}
              onChange={titleChange}
              className="task-input"
            />
            <label>Taskı Düzenleyiniz!</label>
            <textarea
              value={description}
              onChange={DescriptionChange}
              className="task-input"
              rows="5"
            ></textarea>
            <button
              className="task-button update-button"
              onClick={handleSubmit}
            >
              Düzenle
            </button>
          </form>
        </div>
      ) : (
        <div className="task-create">
          <h3>Lütfen Task Ekleyiniz!</h3>
          <form className="task-form">
            <label>Başlık</label>
            <input
              value={title}
              onChange={titleChange}
              className="task-input"
            />
            <label>Task Giriniz!</label>
            <textarea
              value={description}
              onChange={DescriptionChange}
              className="task-input"
              rows="5"
            ></textarea>
            <button className="task-button" onClick={handleSubmit}>
              Oluştur
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskCreate;
