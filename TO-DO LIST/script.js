const input = document.getElementById("taskInput");
const btnAdd = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

btnAdd.addEventListener("click", addTask);

function addTask() {
  const value = input.value.trim();
  if (!value) return;

  const li = document.createElement("li");

  // Contenedor izquierda (checkbox + texto)
  const task = document.createElement("div");
  task.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const text = document.createElement("span");
  text.textContent = value;

  checkbox.addEventListener("change", () => {
    text.classList.toggle("completed");
  });

  task.appendChild(checkbox);
  task.appendChild(text);

  // Contenedor derecha (botones)
  const actions = document.createElement("div");
  actions.className = "actions";

  const btnEdit = document.createElement("button");
  btnEdit.textContent = "✏️";
  btnEdit.addEventListener("click", () => {
    const newText = prompt("Editar tarea", text.textContent);
    if (newText && newText.trim()) {
      text.textContent = newText;
    }
  });

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "❌";
  btnDelete.addEventListener("click", () => {
    li.remove();
  });

  actions.appendChild(btnEdit);
  actions.appendChild(btnDelete);

  li.appendChild(task);
  li.appendChild(actions);
  list.appendChild(li);

  input.value = "";
}
