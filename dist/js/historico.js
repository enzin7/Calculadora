// Importações
import { setEntrada, atualizarDisplay, atualizarUltimaConta, fecharHistorico, } from "./ui.js";
// Variáveis Globais
export let historico = [];
// --- Funções de Histórico ---
export function atualizarHistorico() {
    const listaHistorico = document.getElementById("historico");
    listaHistorico.innerHTML = "";
    historico.forEach((el, index) => {
        const hist = document.createElement("li");
        const antesDoIgual = el.split("=")[0].trim();
        hist.textContent = el;
        hist.onclick = () => {
            contaVelha(antesDoIgual);
            fecharHistorico();
            atualizarUltimaConta("");
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
export function contaVelha(conta) {
    setEntrada(conta);
    atualizarDisplay();
}
export function limparHistorico() {
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
export function antigaConta() {
    let antigaConta = historico[historico.length - 1];
    let i = antigaConta.lastIndexOf("=");
    antigaConta = antigaConta.slice(0, i - 1);
    setEntrada(antigaConta);
    atualizarDisplay();
    atualizarUltimaConta("");
}
