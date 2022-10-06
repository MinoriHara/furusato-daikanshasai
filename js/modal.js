const modalBtns = document.querySelectorAll(".modal-toggle");
modalBtns.forEach(function (btn) {
  btn.onclick = function () {
    var modal = btn.getAttribute('data-modal');
    document.getElementById(modal).style.display = "block";
    const selector = document.querySelector(".home");
    selector.classList.add("modal_open");
    var element = document.getElementById(modal).querySelector(".modal_scroll");
    element.scrollIntoView(false);
    element.scrollTo(0, 0);
  };
});
const closeBtns = document.querySelectorAll(".modal-close");
closeBtns.forEach(function (btn) {
  btn.onclick = function () {
    var modal = btn.closest('.modal');
    modal.style.display = "none";
    const selector = document.querySelector(".home");
    selector.classList.remove("modal_open");
  };
});
window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
    const selector = document.querySelector(".home");
    selector.classList.remove("modal_open");
  }
};
