// Variáveis Globais
const sinais = ["+", "-", "x", "÷"];
const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const display = document.getElementById("display");
const displayHistorico = document.getElementById("displayHistorico");
let entrada = "0";
let historico = [];
atualizarDisplay();
limparHistorico();
// --- Funções da Calculadora ---
function atualizarDisplay() {
    display.textContent = entrada;
    entrada = display.textContent;
    display.scrollLeft = display.scrollWidth;
}
function adicionarNumero(valor) {
    if (entrada === "0") {
        entrada = "";
    }
    else if (entrada.endsWith("%") || entrada.endsWith(")")) {
        return;
    }
    entrada += valor;
    atualizarDisplay();
}
function adicionarOperador(operador) {
    const ultString = entrada.trim().slice(-1);
    if (ultString === operador) {
        return;
    }
    else if (entrada === "0" && !sinais.includes(operador)) {
        entrada = operador + " ";
    }
    else if (sinais.includes(ultString)) {
        entrada = entrada.slice(0, -2) + operador + " ";
    }
    else if (ultString === ",") {
        entrada += "00 " + operador + " ";
    }
    else {
        entrada += " " + operador + " ";
    }
    atualizarDisplay();
}
function adicionarDecimal(ponto) {
    const sinal = entrada.search(/[+\-÷x](?!.*[+\-÷x])/);
    const contaAtual = entrada.slice(sinal + 1);
    if (contaAtual.includes(ponto)) {
        return;
    }
    else if (contaAtual === " ") {
        entrada += "0" + ponto;
    }
    else {
        entrada += ponto;
    }
    atualizarDisplay();
}
function adicionarPorcentagem(sPorcentagem) {
    const ultString = entrada.trim().slice(-1);
    const perc = entrada.lastIndexOf(")");
    const penulSinal = entrada.search(/.*[+\-x÷](?!.*[+\-x÷])/);
    if (entrada === "0" ||
        entrada.endsWith("%") ||
        entrada.substring(0, perc).endsWith(sPorcentagem)) {
        return;
    }
    else if (entrada.trim().endsWith(")")) {
        entrada =
            entrada.substring(0, perc) + sPorcentagem + entrada.substring(perc);
    }
    else if (entrada.substring(penulSinal - 2) === "%" &&
        sinais.includes(ultString)) {
        entrada = entrada.replace(entrada.trim().slice(-1), sPorcentagem);
    }
    else if (numeros.includes(ultString)) {
        entrada += sPorcentagem;
    }
    atualizarDisplay();
}
function limpar() {
    entrada = "0";
    atualizarDisplay();
    atualizarUltimaConta("");
}
function deletar() {
    const final = sinais.includes(entrada.trim().slice(-1));
    if (entrada === "0" || entrada.trim().endsWith(")")) {
        return;
    }
    else if (final || entrada.endsWith(" ")) {
        entrada = entrada.slice(0, -3);
    }
    else {
        entrada = entrada.slice(0, -1);
        if (entrada === "") {
            entrada = "0";
        }
    }
    atualizarDisplay();
}
function inverterValor() {
    const sinais = ["+", "x", "÷"];
    const sinal = entrada.search(/[+÷x](?!.*[+÷x])/);
    let pConta = entrada.slice(0, sinal + 1);
    let contaS = entrada.slice(sinal + 1);
    const neg = entrada.lastIndexOf("-");
    const parenteses = entrada.lastIndexOf("(-");
    let ultNeg = entrada.slice(parenteses + 3, neg + 1);
    if (ultNeg.endsWith("-") && !contaS.endsWith(" ")) {
        const indice = ultNeg.lastIndexOf("-");
        entrada =
            entrada.substring(0, indice + 1) + " + " + entrada.substring(indice + 3);
        entrada = entrada;
    }
    else {
        if (entrada === "0" || contaS.endsWith(" ")) {
            return;
        }
        else if (sinais.includes(pConta.slice(-1))) {
            if (!contaS.trim().startsWith("(-")) {
                contaS = " (-" + contaS + ")";
            }
            else {
                contaS = contaS.slice(3, -1);
            }
            entrada = pConta + contaS;
        }
        else if (!entrada.trim().startsWith("(-")) {
            pConta = "(- " + entrada + ")";
            entrada = pConta;
        }
        else {
            entrada = entrada.slice(2, -1);
        }
    }
    atualizarDisplay();
}
function calcular() {
    let resultado = formatarSinais(entrada);
    if (resultado.includes("%")) {
        resultado = formatarPorcentagem(resultado);
    }
    resultado = eval(resultado);
    if (!Number.isInteger(resultado)) {
        resultado = formatarDecimal(resultado);
    }
    historico.push(`${entrada} = ${resultado}`);
    atualizarHistorico();
    atualizarUltimaConta(entrada);
    entrada = resultado;
    atualizarDisplay();
}
// --- Funções de Formatação ---
function formatarSinais(display) {
    return display.replace(/x/g, "*").replace(/÷/g, "/").replace(/,/g, ".");
}
function formatarPorcentagem(display) {
    while (display.includes("%")) {
        const ultPorc = display.indexOf("%");
        const ultSinal = Math.max(display.slice(0, ultPorc).lastIndexOf("-"), display.slice(0, ultPorc).lastIndexOf("+"), display.slice(0, ultPorc).lastIndexOf("*"), display.slice(0, ultPorc).lastIndexOf("/"));
        const pSinal = Math.max(display.slice(0, ultSinal).lastIndexOf("-"), display.slice(0, ultSinal).lastIndexOf("+"), display.slice(0, ultSinal).lastIndexOf("*"), display.slice(0, ultSinal).lastIndexOf("/"));
        const sinal = display.charAt(ultSinal);
        if (sinal === "+" || sinal === "-") {
            display =
                display.substring(0, pSinal + 1) +
                    " (" +
                    display.substring(pSinal + 1, ultSinal + 1) +
                    " (" +
                    display.substring(pSinal + 1, ultSinal) +
                    "*" +
                    " (" +
                    display.substring(ultSinal + 2).replace("%", " / 100)))");
        }
        else if (sinal === "*" || sinal === "/") {
            display =
                display.substring(0, pSinal + 1) +
                    " (" +
                    display.substring(pSinal + 1, ultSinal + 1) +
                    " (" +
                    display.substring(ultSinal + 2).replace("%", " / 100))");
        }
    }
    return display;
}
function formatarDecimal(s) {
    s = Number.parseFloat(s).toFixed(2).replace(".", ",");
    return s;
}
// --- Funções de Histórico ---
function atualizarHistorico() {
    const listaHistorico = document.getElementById("historico");
    listaHistorico.innerHTML = "";
    historico.forEach((el, index) => {
        const hist = document.createElement("li");
        const antesDoIgual = el.split("=")[0].trim();
        hist.textContent = el;
        hist.onclick = () => {
            antigaConta(antesDoIgual);
            fecharHistorico();
        };
        listaHistorico.appendChild(hist);
        if (index < historico.length - 1) {
            const separador = document.createElement("hr");
            separador.style.border = "none";
            separador.style.borderTop = "1px solid #888";
            separador.style.margin = "5px 0";
            listaHistorico.appendChild(separador);
        }
    });
}
function limparHistorico() {
    historico = [];
    const hist = document.createElement("li");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("fill", "#ffffff");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M12.5 7.25a.75.75 0 00-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 00.744-1.302L12.5 12.315V7.25z");
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("fill-rule", "evenodd");
    path2.setAttribute("d", "M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z");
    svg.appendChild(path1);
    svg.appendChild(path2);
    hist.appendChild(svg);
    const br = document.createElement("br");
    hist.appendChild(br);
    hist.append(" Sem Histórico");
    const listaHistorico = document.getElementById("historico");
    listaHistorico.innerHTML = "";
    listaHistorico.appendChild(hist);
}
function mostrarHistorico() {
    const containerHistorico = document.getElementById("containerHistorico");
    const overlay = document.getElementById("overlay");
    containerHistorico?.classList.add("ativo");
    overlay?.classList.add("ativo");
}
function fecharHistorico() {
    const containerHistorico = document.getElementById("containerHistorico");
    const overlay = document.getElementById("overlay");
    containerHistorico?.classList.remove("ativo");
    overlay?.classList.remove("ativo");
}
document.getElementById("overlay")?.addEventListener("click", fecharHistorico);
function atualizarUltimaConta(ultimaConta) {
    displayHistorico.textContent = ultimaConta;
    displayHistorico.scrollLeft;
}
function antigaConta(antigaConta) {
    entrada = antigaConta;
    atualizarDisplay();
    atualizarUltimaConta("");
}
