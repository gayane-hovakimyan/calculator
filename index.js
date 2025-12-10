let inputEl = document.getElementById('inputEl');
let expression = "";

document.querySelector('.calculator__keys').addEventListener('click', (ev) => {
    const btn = ev.target.closest('.calculator__btn');
    if (!btn) return;

    const type = btn.dataset.type;
    const value = btn.dataset.value;

    handleKey(type, value);
    updateClearButton();
});

function addToScreen() {
    inputEl.textContent = expression || "0";
}

function evaluate(expr) {
    if (!expr) return "0";

    try {
        if (!/^[-+*/%0-9.() ]+$/.test(expr)) return "Error";

        const result = Function('"use strict"; return (' + expr + ')')();
        return result;
    } catch {
        return "Error";
    }
}

function calculate() {
    const result = evaluate(expression);
    expression = String(result);
    addToScreen();
}

function reset() {
    expression = "";
    addToScreen();
    updateClearButton();
}
function updateClearButton() {
    const clearBtn = document.getElementById('clearBtn');
    clearBtn.innerText = (!expression || expression === "0") ? "AC" : "C";
}

function deleteFun() {
    expression = expression.slice(0, -1);
    addToScreen();
}

function changeSign() {
    if (!expression) return;

    let match = expression.match(/(\(?-?\d+\.?\d*\)?)$/);
    if (!match) return;

    let number = match[0];
    let start = expression.slice(0, -number.length);

    if (number.startsWith("(-") && number.endsWith(")")) {
        number = number.slice(2,-1);
    }  else {
        number = `(-${number})`;
    }

    expression = start + number;
    addToScreen();
}

function handleKey(type, value) {
    if (type === "number") {
        if (value === "0" && expression === "") return;

        const parts = expression.split(/[\+\-\*\/%]/);
        const lastNumber = parts.at(-1);

        if (lastNumber === "0") return;

        expression += value;
        return addToScreen();
    }

    if (type === "decimal") {
        const last = expression.at(-1);

        if (!expression) {
            expression = "0.";
            return addToScreen();
        }

        if ("+-*/%".includes(last)) {
            expression += "0.";
            return addToScreen();
        }

        const parts = expression.split(/[\+\-\*\/%]/);
        const lastNumber = parts.at(-1);
        if (lastNumber.includes(".")) return;

        expression += ".";
        return addToScreen();
    }

    if (type === "operator") {
        if (!expression) return;

        const last = expression.at(-1);

        if ("+-*/%".includes(last)) {
            expression = expression.slice(0, -1) + value;
            return addToScreen();
        }
        expression += value;
        return addToScreen();
    } else if (type === "equals") {
        return calculate();
    } else if (type === "clear") {
        return reset();
    } else if (type === "delete") {
        return deleteFun();
    } else if (type === "sign") {
        return changeSign();
    }
}



