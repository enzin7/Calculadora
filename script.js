let display = document.getElementById("display");
let currentInput = "";
let history = [];

function appendNumber(value) {
    currentInput += value;
    display.textContent = currentInput;
}

function appendOperator(operator) {
    if (currentInput === "" && operator !== ".") return;
    currentInput += operator;
    display.textContent = currentInput;
}

function calculate() {
    try {
        let result = eval(currentInput);
        if (!Number.isInteger(result)) {
            result = result.toFixed(2);
        }

        // 🔥 Adicionando ao histórico corretamente
        history.push(`${currentInput} = ${result}`);
        updateHistory();

        currentInput = result.toString(); // Convertendo para string para evitar erros ao adicionar novos números
        display.textContent = currentInput;
    } catch (error) {
        display.textContent = "Erro";
        currentInput = "";
    }
}

function clearDisplay() {
    currentInput = "";
    display.textContent = currentInput;
}

function invertNumber() {
    if (currentInput !== "") {
        currentInput = (parseFloat(currentInput) * -1).toString(); // 🔥 Corrigido
        display.textContent = currentInput;
    }
}

function updateHistory() {
    let historyList = document.getElementById("history");
    if (historyList) {
        historyList.innerHTML = "";
        history.forEach(entry => {
            let li = document.createElement("li");
            li.innerText = entry;
            historyList.appendChild(li);
        });
    }
}

function clearHistory() {
    history = [];
    updateHistory();
}

function toggleHistory() {
    let historyContainer = document.getElementById("historyContainer");
    if (historyContainer.style.display === "none" || historyContainer.style.display === "") {
        historyContainer.style.display = "block";
    } else {
        historyContainer.style.display = "none";
    }
}