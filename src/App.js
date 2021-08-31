import "./App.css";
import editIcon from "./icon/edit.png";
import deleteIcon from "./icon/delete.png";
import { useState, useEffect } from "react";

function App() {
  //Hooks
  const [task, setTask] = useState();
  const [todo, setTodo] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [buttonText, setButtonText] = useState("Add New Task");

  useEffect(() => {
    setTask("");
  }, [todo]);

  useEffect(() => {
    setButtonText("Edit Task");
  }, [isEdit]);

  useEffect(() => {
    const notice = document.querySelector(".notice");
    notice.style.display = "none";
  });

  //Function For Set Task

  const save = () => {
    if (isEdit) {
      todo[editIndex] = task;
      setIsEdit(false);
    } else {
      if (task !== "") {
        setTodo([...todo, task]);
      } else {
        notice();
        console.log("Enter Task");
      }
    }
  };

  //Function For Edit Task

  const edit = (index) => {
    setIsEdit(true);
    setEditIndex(index);
    const edited = todo.filter((val, listIndex) => {
      return listIndex === index;
    });
    setTask(edited);
  };

  //Function For Remove Task

  const removeTask = (index) => {
    const filtered = todo.filter((value, listIndex) => {
      return listIndex !== index;
    });
    setTodo(filtered);
  };

  //Function For Notice
  const notice = () => {
    const notice = document.querySelector(".notice");
    notice.style.display = "grid";
    notice.innerText = "Enter A Task";
  };

  //Rendering JSX

  return (
    <div className="App">
      <input
        type="text"
        value={task}
        className="textbox"
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="button" onClick={save}>
        {buttonText}
      </button>

      <section className="taskSection">
        {todo.map((item, index) => (
          <div className="taskList">
            {item}
            <i onClick={() => edit(index)}>
              <img src={editIcon} title="Edit Task" alt={editIcon} />
            </i>
            <span title="Remove Task" onClick={() => removeTask(index)}>
              <img src={deleteIcon} title="Remove Task" alt={deleteIcon} />
            </span>
          </div>
        ))}
      </section>

      {/* Notice */}
      <div className="notice"></div>
    </div>
  );
}

export default App;
