const buttons = document.querySelectorAll('button');
let formula = '';
let decimalAdded = false;

function handleClick(event) {
  const buttonValue = event.target.value;

  switch (buttonValue) {
    case 'AC':
      formula = '';
      decimalAdded = false;
      break;
    case '=':
      if (formula) {
        const result = eval(formula);
        formula = result.toString();
        decimalAdded = formula.includes('.');
      }
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      if (formula) {
        const lastChar = formula[formula.length - 1];
        if (lastChar !== '+' && lastChar !== '-' && lastChar !== '*' && lastChar !== '/') {
          formula += buttonValue;
          decimalAdded = false;
        } else if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
          formula = formula.slice(0, -1) + buttonValue;
          decimalAdded = false;
        }
      }
      break;
    case '.':
      if (formula && !decimalAdded) {
        const lastNum = formula.split(/[-+\/*]/).pop();
        if (!lastNum.includes('.')) {
          formula += '.';
          decimalAdded = true;
        }
      }
      break;
    default:
      formula += buttonValue;
      decimalAdded = false;
      break;
  }

  const display = document.getElementById('display');
  display.textContent = formula || '0';
}

buttons.forEach(button => button.addEventListener('click', handleClick));

