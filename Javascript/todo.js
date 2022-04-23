"use strict";

let navItem = document.querySelectorAll(".nav-link");
let containerEl = document.querySelector(".container-content");
let logOutEL = document.querySelector("#logout");
const closebtnEL = document.querySelector("#exit");
const confirmbtnEL = document.querySelector("#confirm");
let checkedcount = 0;

//LOGOUT
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

navItem.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".active").classList.remove("active");
    item.classList.add("active");
  });
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let countstatus = function checkedOrNot() {
  let isChecked = this.checked;
  if (isChecked) {
    //checked
    checkedcount += 1;
  } else {
    checkedcount -= 1;
    // //unchecked
  }
  new Promise((resolve, reject) => {
    if (checkedcount === 5) {
      resolve("5 Tasks have been completed Successfully");
    } else {
      reject("failed");
    }
  })
    .then((message) => {
      setTimeout(() => {
        alert("Congrats," + message);
      }, 100);
    })
    .catch(() => {});
};

const todoAjax = function () {
  fetch("https://jsonplaceholder.typicode.com/todos/")
    .then((response) => response.json())
    .then(function (data) {
      data.forEach(function (data) {
        const capitalizedTitle = capitalizeFirstLetter(data.title);
        let completed = data.completed;
        const html = `    
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault" ${completed ? "checked disabled" : ""}
          />
          <label class="form-check-label" for="flexCheckDefault"> 
            ${capitalizedTitle}
          </label>
        </div>`;
        containerEl.insertAdjacentHTML("beforeend", html);
      });
    })
    .then(function () {
      const checkbox = document.querySelectorAll(".form-check-input");
      checkbox.forEach((item) => {
        item.addEventListener("change", countstatus);
      });
    });
};

todoAjax();

btn.onclick = function () {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
};

closebtnEL.onclick = function () {
  modal.style.display = "none";
  document.body.style.overflow = "scroll";
  document.querySelector(".active").classList.remove("active");
  navItem[0].classList.add("active");
};

span.onclick = function () {
  modal.style.display = "none";
  document.body.style.overflow = "scroll";
  document.querySelector(".active").classList.remove("active");
  navItem[0].classList.add("active");
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "scroll";
    document.querySelector(".active").classList.remove("active");
    navItem[0].classList.add("active");
  }
};

confirmbtnEL.onclick = function () {
  window.location.replace("index.html");
};
