console.log("Disappearing Todo App loaded.");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const hourSelect = document.getElementById("todo-hours");
  const minuteSelect = document.getElementById("todo-minutes");
  const list = document.getElementById("todo-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    const hours = parseInt(hourSelect.value, 10);
    const minutes = parseInt(minuteSelect.value, 10);
    const seconds = (hours * 60 + minutes) * 60;

    if (text !== "" && seconds > 0 && seconds <= 6 * 3600) {
      createTodo(text, seconds);
      input.value = "";
      hourSelect.value = "0";
      minuteSelect.value = "0";
    } else {
      alert("時間を1分以上、最大6時間以内で指定してください。");
    }
  });

  function createTodo(text, duration) {
    const li = document.createElement("li");

    const todoText = document.createElement("div");
    todoText.className = "todo-text";
    todoText.textContent = text;

    const timerSpan = document.createElement("span");
    timerSpan.className = "timer";
    timerSpan.textContent = formatTime(duration);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.className = "delete-btn";

    li.appendChild(todoText);
    li.appendChild(timerSpan);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    let secondsLeft = duration;
    const countdown = setInterval(() => {
      secondsLeft--;
      timerSpan.textContent = formatTime(secondsLeft);
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

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + "h " : ""}${m > 0 ? m + "m " : ""}${s}s`;
  }
});
