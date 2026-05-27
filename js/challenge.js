document.addEventListener("DOMContentLoaded", () => {
  const minusBtn = document.getElementById("minus");
  const plusBtn = document.getElementById("plus");
  const heartBtn = document.getElementById("heart");
  const pauseBtn = document.getElementById("pause");
  const counter = document.getElementById("counter");
  const submitBtn = document.getElementById("submit");

  let count = 0;
  let interval = null;
  let heartClicks = 0;
  let currentLikesMessage = null;
  let currentIntervalNumber = 0;

  function pauseTimer(isPaused) {
    minusBtn.disabled = isPaused;
    plusBtn.disabled = isPaused;
    heartBtn.disabled = isPaused;
    submitBtn.disabled = isPaused;

    pauseBtn.textContent = isPaused ? "resume" : "pause";
  }

  function startInterval() {
    interval = setInterval(() => {
      count++;
      counter.textContent = count;

      if (count === 500) {
        clearInterval(interval);
      }
    }, 1000);
  }

  startInterval();

  pauseBtn.addEventListener("click", (e) => {
    const runTimer = interval !== null;

    if (runTimer) {
      clearInterval(interval);
      interval = null;
      pauseTimer(true);
    } else {
      startInterval();
      pauseTimer(false);
    }
  });

  plusBtn.addEventListener("click", (e) => {
    count++;
    counter.textContent = count;
  });

  minusBtn.addEventListener("click", (e) => {
    count--;
    counter.textContent = count;
  });

  function createLikeMessage() {
    heartClicks = 0;
    currentIntervalNumber = counter.textContent;

    const likesList = document.querySelector(".likes");
    currentLikesMessage = document.createElement("li");
    currentLikesMessage.textContent = `${currentIntervalNumber} has been liked  ${heartClicks} times`;
    likesList.appendChild(currentLikesMessage);

    likeTimer = setTimeout(() => {
      currentLikesMessage = null;
      likeTimer = null;
      heartClicks = 0;
    }, 5000);
  }

  function updatedLikesMessage() {
    if (!currentLikesMessage) return;

    currentLikesMessage.textContent = `${currentIntervalNumber} has been liked ${heartClicks} times`;
  }

  heartBtn.addEventListener("click", (e) => {
    if (!currentLikesMessage) {
      createLikeMessage();
    }
    heartClicks++;
    updatedLikesMessage();
  });

  document
    .getElementById("comment-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const inputElement = document.getElementById("comment-input");
      const commentText = inputElement?.value?.trim() ?? "";

      if (commentText === "") return;

      const newComment = document.createElement("div");
      newComment.textContent = commentText;
      document.getElementById("list").appendChild(newComment);

      inputElement.value = "";
    });
});
