let inputEl = document.getElementById('inputEl');
let expression = "";

document.querySelector('.calculator__keys').addEventListener('click', (ev) => {
    const btn = ev.target.closest('.calculator__btn');
    if (!btn) return;

    const type = btn.dataset.type;
    const value = btn.dataset.value;

    handleKey(type, value);
});

function addToScreen() {
    inputEl.textContent = expression || "0";
}

function evaluate(expr) {
    // Եթե expression-ը դատարկ է
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
}

function deleteFun() {
    expression = expression.slice(0, -1);
    addToScreen();
}

function changeSign() {
    if (!expression) return;

    let match = expression.match(/(\d+\.?\d*)$/);
    if (!match) return;

    let number = match[0];
    let start = expression.slice(0, -number.length);

    if (number.startsWith("-")) {
        number = number.slice(1);
    } else {
        number = "(" + "-" + number + ")";
    }

    expression = start + number;
    addToScreen();
}

function handleKey(type, value) {
    if (type === "number" || type === "decimal") {
        expression += value;
        addToScreen();
    } else if (type === "operator") {
        if (!expression) return;
        const last = expression.at(-1);
        if ("+-*/%".includes(last)) return;
        expression += value;
        addToScreen();
    } else if (type === "equals") {
        calculate();
    } else if (type === "clear") {
        reset();
    } else if (type === "delete") {
        deleteFun();
    } else if (type === "sign") {
        changeSign();
    }
}
