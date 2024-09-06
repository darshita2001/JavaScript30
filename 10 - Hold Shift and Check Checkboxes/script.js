document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".inbox input[type='checkbox']");
  let lastChecked;

  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("click", handleCheck)
  );

  function handleCheck(e) {
    // console.log(e);
    let inBetween = false;

    if (this.checked && e.shiftKey) {
      checkboxes.forEach((checkbox) => {
        if (checkbox === this || checkbox === lastChecked) {
          inBetween = !inBetween;
        //   console.log("Starting to check them in between!");
        }

        if (inBetween) {
          checkbox.checked = true;
        }
      });
    }

    lastChecked = this;
  }
});
