// Importações
import { setEntrada, atualizarDisplay, fecharHistorico, mostrarHistorico, } from "./ui.js";
import { limparHistorico, antigaConta } from "./historico.js";
import { adicionarNumero, adicionarOperador, adicionarDecimal, adicionarPorcentagem, inverterValor, calcular, limparDeletar, } from "./calculadora.js";
import { mostrarOpcoes, fecharOpcoes, calcBasica, calcConversao, } from "./menu.js";
// --- Inicializando ---
setEntrada("0");
atualizarDisplay();
limparHistorico();
// --- Botões de Números ---
document
    .getElementById("btn-0")
    ?.addEventListener("click", () => adicionarNumero("0"));
document
    .getElementById("btn-1")
    ?.addEventListener("click", () => adicionarNumero("1"));
document
    .getElementById("btn-2")
    ?.addEventListener("click", () => adicionarNumero("2"));
document
    .getElementById("btn-3")
    ?.addEventListener("click", () => adicionarNumero("3"));
document
    .getElementById("btn-4")
    ?.addEventListener("click", () => adicionarNumero("4"));
document
    .getElementById("btn-5")
    ?.addEventListener("click", () => adicionarNumero("5"));
document
    .getElementById("btn-6")
    ?.addEventListener("click", () => adicionarNumero("6"));
document
    .getElementById("btn-7")
    ?.addEventListener("click", () => adicionarNumero("7"));
document
    .getElementById("btn-8")
    ?.addEventListener("click", () => adicionarNumero("8"));
document
    .getElementById("btn-9")
    ?.addEventListener("click", () => adicionarNumero("9"));
// --- Botões de Operações ---
document
    .getElementById("btn-somar")
    ?.addEventListener("click", () => adicionarOperador("+"));
document
    .getElementById("btn-subtrair")
    ?.addEventListener("click", () => adicionarOperador("-"));
document
    .getElementById("btn-multiplicar")
    ?.addEventListener("click", () => adicionarOperador("x"));
document
    .getElementById("btn-dividir")
    ?.addEventListener("click", () => adicionarOperador("÷"));
document.getElementById("btn-calcular")?.addEventListener("click", calcular);
document
    .getElementById("btn-inverter")
    ?.addEventListener("click", inverterValor);
// --- Botões Especiais ---
document
    .getElementById("btn-limpar-deletar")
    ?.addEventListener("click", limparDeletar);
document
    .getElementById("btn-porcentagem")
    ?.addEventListener("click", () => adicionarPorcentagem("%"));
document
    .getElementById("btn-decimal")
    ?.addEventListener("click", () => adicionarDecimal(","));
// --- Botões Historico ---
document
    .getElementById("btn-mostrar-historico")
    ?.addEventListener("click", mostrarHistorico);
document
    .getElementById("btn-fechar-historico")
    ?.addEventListener("click", fecharHistorico);
document
    .getElementById("btn-limpar-historico")
    ?.addEventListener("click", limparHistorico);
document.getElementById("overlay")?.addEventListener("click", fecharHistorico);
document
    .getElementById("displayHistorico")
    ?.addEventListener("click", antigaConta);
// --- Botões Menu ---
document.getElementById("btn-menu")?.addEventListener("click", mostrarOpcoes);
document.getElementById("basica")?.addEventListener("click", calcBasica);
document.getElementById("conversao")?.addEventListener("click", calcConversao);
document.getElementById("overlay")?.addEventListener("click", fecharOpcoes);
