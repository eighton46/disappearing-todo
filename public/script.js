console.log("Disappearing Todo App loaded.");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
      createTodo(text);
      input.value = "";
    }
  });

  function createTodo(text) {
    const li = document.createElement("li");

    const todoText = document.createElement("div")
    todoText.textContent = text;
    todoText.className = "todo-text";

    const timerSpan = document.createElement("span");
    timerSpan.className = "timer";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.className = "delete-btn";

    li.appendChild(todoText);
    li.appendChild(timerSpan);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    let secondsLeft = 10;
    timerSpan.textContent = `${secondsLeft}s`;

    const countdown = setInterval(() => {
      secondsLeft--;
      timerSpan.textContent = `${secondsLeft}s`;
      if (secondsLeft <= 0) {
        clearInterval(countdown);
        li.remove();
      }
    }, 1000);

    deleteBtn.addEventListener("click", () => {
      clearInterval(countdown);
      li.remove();
    });
  }
});
