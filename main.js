function calculator() {

  function operate(firstNum, secondNum, op) {
    result = '';
    if (!secondNum || !op) {
    } else {
      switch (true) {
        case op == '':  
          result = display.textContent;
          break;
        case op == "add":
          result = parseFloat(firstNum) + parseFloat(secondNum);
          display.textContent = roundToSix(result);
          break;
        case op == "subtract":
          result = firstNum - secondNum;
          display.textContent = roundToSix(result);
          break;
        case op == "multiply":
          result = firstNum * secondNum;
          display.textContent = roundToSix(result);
          break;
        case op == "divide":
          if (secondNum == 0) {
            display.textContent = "No 0 Div, LoL";
            reset();
            break;
          } else {
            result = firstNum / secondNum;
            display.textContent = roundToSix(result);
            break;
          }
        default:
          display.textContent = "ERROR";
          reset();
      }

    (/[0-9.-]/g.test(result)) ? num1 = result : num1 = '';

    num2 = '';

    let buttons = document.querySelectorAll(".op-down");
    buttons.forEach(button => {
      button.setAttribute("class", "op")
    });
    }
  }

  function roundToSix(float) {
    fString = float.toString();
    if (fString.includes('.')) {
      if (fString.split('.')[1].length < 6) {
        return float;
      } else {
        return Math.round(float * 1000000) / 1000000;
      }
    } else {
      return float;
    }
  }

  function reset() {
    num1 = '';
    num2 = '';
    op = '';
    input = '';
    result = '';
    let buttons = document.querySelectorAll(".op-down");
    buttons.forEach(button => {
      button.setAttribute("class", "op")
    });
  }

  const calc = document.querySelector("#calc");
  const btnClr = document.querySelector("#clear");
  const btnPlmn = document.querySelector("#plmn");
  const btnPct = document.querySelector("#pct");
  const display = document.querySelector("#display");

  let num1 = '';
  let num2 = '';
  let op = '';
  let input = '';
  let result = '';
  
  calc.addEventListener("click", (e) => {
    if (e.target && e.target.matches("button.num")) {
      if (input.length < 10 && /[0-9.-]/.test(e.target.textContent)) {
        if (input.includes('.') && e.target.textContent == ".") {
        } else {
          input += e.target.textContent;
          display.textContent = input;
        }
      }
    }
  });

  document.addEventListener("keypress", (e) => {
      if (input.length < 10 && /[0-9.-]/.test(e.key)) {
        if (input.includes('.') && e.key == ".") {
        } else {
          input += e.key;
          display.textContent = input;
        }
      }
  });

  calc.addEventListener("click", (e) => {
    if (e.target && e.target.matches("button.op") || e.target.matches("button.op-down")) {
      if (!num1) {
        num1 = input;
        if (!num1) num1 = 0;
        op = e.target.id;
        input = '';
        e.target.setAttribute("class", "op-down");
      } else {
        num2 = input;
        operate(num1, num2, op);
        op = e.target.id;
        input = '';
        e.target.setAttribute("class", "op-down");
      }
    }
  });

  calc.addEventListener("click", (e) => {
    if (e.target && e.target.matches("button.eq")) {
      num2 = input;
      if (num2 == '') {
      } else {
        operate(num1, num2, op);
        input = '';
      }
    }
  });

  btnClr.addEventListener("click", () => {
    reset();
    display.textContent = 0
  });

  btnPlmn.addEventListener("click", () => {
    if (input && input != 0 && !result) {
      if (input[0] == "-") {
        input = input.substring(1)
      } else {
        input = "-" + input;
      }
      display.textContent = input;
    } else if (result && result != 0) {
      if (result[0] == "-") {
        result = result.substring(1)
      } else {
        result = "-" + result;
      }
      display.textContent = result;
    }
  });

  btnPct.addEventListener("click", () => {
    if (display.textContent != 0 && !result) {
      input = roundToSix((display.textContent / 100));
      display.textContent = input;
    } else if (display.textContent != 0 && result) {
      result = roundToSix((display.textContent / 100));
      display.textContent = result;
    }
  });


}
calculator();