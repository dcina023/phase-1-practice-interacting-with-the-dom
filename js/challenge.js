document.addEventListener("DOMContentLoaded", () => {
  const minusBtn = document.getElementById("minus")
  const plusBtn = document.getElementById("plus")
  const heartBtn = document.getElementById("heart")
  const pauseBtn = document.getElementById("pause")
  const timer = document.getElementById("counter")

  let count = 0;
  let interval = null;

  function startInterval() {
    interval = setInterval(() => {
      count++;
      timer.textContent = count;

      if (count === 1000) {
        clearInterval(interval)
      }
    }, 1000);
  }
  startInterval();

  function pauseTimer() {
    clearInterval(interval)
    interval = null;
  }

  minusBtn.addEventListener("click", (e) => {
    const counterElement = document.getElementById("counter")
    const updatedMinusValue = +counterElement.textContent - 1;
    counterElement.textContent = updatedMinusValue;
  });

  plusBtn.addEventListener("click", (e) => {
    const counterElement = document.getElementById("counter")
    const updatedPlusValue = +counterElement.textContent + 1;
    counterElement.textContent = updatedPlusValue;
  });

  heartBtn.addEventListener("click", (e) => {
    const likesList = document.querySelector(".likes")
    const newMessage = document.createElement("li")
    newMessage.textContent = `${timer.textContent} has been liked`;
    likesList.appendChild(newMessage)
  })



  document.getElementById("comment-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const inputElement = document.getElementById("comment-input")
      const commentText = inputElement?.value?.trim() ?? "";

      if (commentText === "") return;

      const newComment = document.createElement("div");
      newComment.textContent = commentText;
      document.getElementById("list").appendChild(newComment)

      inputElement.value = "";
    });

  pauseBtn.addEventListener("click", (e) => {
    const counterElement = document.getElementById("container")
    if (interval != null) {
      clearInterval(interval);
      interval = null;
      pauseBtn.textContent = "resume";
    } else {
      startInterval();
      pauseBtn.textContent = "pause";
    }
  });
});
