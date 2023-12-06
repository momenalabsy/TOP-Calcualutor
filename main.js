// Function Declarations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "divide":
      return divide(a, b);
    case "multiply":
      return multiply(a, b);
    default:
      return null;
  }
}

let clickedElement = document.getElementsByClassName("buttons");
let result = document.getElementById("result-word");
let fakeResult = document.getElementById("result");
window.onload = function () {
  sessionStorage.clear();
};

////////

for (let i = 0; i < clickedElement.length; i++) {
  clickedElement[i].addEventListener("click", function (e) {
    // regexp for operator
    let op = /[+*\/-]/g;
    // target
    target = e.target;
    //
    let resultOne = sessionStorage.getItem("resultOne");
    let resultTwo = sessionStorage.getItem("resultTwo");
    let operator = sessionStorage.getItem("operator");

    // get value of number
    if (
      (target.innerHTML !== "clear" &&
        target.innerHTML !== "=" &&
        +target.innerHTML) ||
      target.innerHTML === "0" ||
      target.innerHTML === "."
    ) {
      fakeResult.innerHTML = "";
      if (resultOne === null) {
        result.innerHTML = target.innerHTML;
        sessionStorage.setItem("resultOne", result.innerHTML);
      } else {
        result.innerHTML = result.innerHTML + target.innerHTML;
        if (!operator && !resultTwo) {
          sessionStorage.setItem("resultOne", result.innerHTML);
        }
        if (resultOne && operator) {
          sessionStorage.setItem("resultTwo", result.innerHTML);
        }
      }
    } else if (target.innerHTML === "clear") {
      result.innerHTML = "0";
      sessionStorage.clear();
    } else if (target.innerHTML === "=") {
      if (operator && resultOne && resultTwo) {
        result.innerHTML = operate(operator, +resultOne, +resultTwo);
        sessionStorage.setItem("resultOne", result.innerHTML);
        if (result.innerHTML === "Infinity") {
          result.innerHTML = "";
          fakeResult.innerHTML = "Error";
        }
        sessionStorage.setItem("resultTwo", "");
        sessionStorage.setItem("operator", "");
      }
    } else if (op) {
      fakeResult.innerHTML = "";
      result.innerHTML = "";
      fakeResult.innerHTML = "0";

      sessionStorage.setItem(
        "operator",
        target.innerHTML === "+"
          ? "add"
          : target.innerHTML === "-"
          ? "subtract"
          : target.innerHTML === "*"
          ? "multiply"
          : target.innerHTML === "/"
          ? "divide"
          : null
      );
      if (resultOne && operator && resultTwo) {
        result.innerHTML = operate(operator, +resultOne, +resultTwo);
        sessionStorage.setItem("resultOne", result.innerHTML);
        fakeResult.innerHTML = result.innerHTML;
        result.innerHTML = "";
        sessionStorage.setItem("resultTwo", "");
      }
    }
  });
}

//
document.addEventListener("keydown", (event) => {
  let name = event.key;
  let code = event.code;

  for (let i = 0; i < clickedElement.length; i++) {
    if (name === clickedElement[i].id) clickedElement[i].click();
    else if (name === "Enter") document.getElementById("=").click();
    else if (name === "Backspace") document.getElementById("clear").click();
  }
  // Alert the key name and key code on keydown
  // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
});
