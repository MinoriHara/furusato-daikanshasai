const modalBtns = document.querySelectorAll(".modal-toggle");
modalBtns.forEach(function (btn) {
  btn.onclick = function () {
    var modal = btn.getAttribute('data-modal');
    document.getElementById(modal).style.display = "block";
    const selector = document.querySelector(".home");
    selector.classList.add("modal_open");
    const scroll = document.getElementById(modal).querySelector(".modal-content");
    scroll.classList.add("modal_scroll");
  };
});
const closeBtns = document.querySelectorAll(".modal-close");
closeBtns.forEach(function (btn) {
  btn.onclick = function () {
    var modal = btn.closest('.modal');
    modal.style.display = "none";
    const selector = document.querySelector(".home");
    selector.classList.remove("modal_open");
    const scroll = event.target.querySelector(".modal-content");
    scroll.classList.remove("modal_scroll");
    document.getElementsByClassName("modal-content").scrollTop = 0;
  };
});
window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
    const selector = document.querySelector(".home");
    selector.classList.remove("modal_open");
    const scroll = event.target.querySelector(".modal-content");
    scroll.classList.remove("modal_scroll");
    document.getElementsByClassName("modal-content").scrollTop = 0;
  }
};
