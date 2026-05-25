const filterButtons = document.querySelectorAll(".filter-button");
const promptCards = document.querySelectorAll(".prompt-card");
const toast = document.querySelector(".toast");
let toastTimer;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    promptCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.hidden = !shouldShow;
    });
  });
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const prompt = button.closest(".prompt-card").querySelector("code").innerText;
    await copyText(prompt);
    button.textContent = "คัดลอกแล้ว";
    showToast();

    window.setTimeout(() => {
      button.textContent = "คัดลอก";
    }, 1400);
  });
});

document.querySelectorAll(".mini-copy").forEach((button) => {
  button.addEventListener("click", async () => {
    await copyText(button.dataset.copy);
    button.textContent = "คัดลอกแล้ว";
    showToast();

    window.setTimeout(() => {
      button.textContent = button.dataset.originalText;
    }, 1400);
  });
  button.dataset.originalText = button.textContent;
});

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (error) {
      // Fall through to the textarea fallback for browsers with stricter clipboard permissions.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function showToast() {
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}
