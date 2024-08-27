document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".controls input");
  const root = document.documentElement;

  inputs.forEach((input) => input.addEventListener("change", handleUpdate));
  inputs.forEach((input) => input.addEventListener("input", handleUpdate));

  function handleUpdate() {
    //get data-sizing attribute
    const suffix = this.dataset.sizing || "";
    root.style.setProperty(`--${this.name}`,this.value + suffix);
  }
});
