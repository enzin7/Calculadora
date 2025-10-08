import { limparDeletar } from "./calculadora.js";
// Variáveis Globais
export const display = document.getElementById("display");
const displayHistorico = document.getElementById("displayHistorico");
let _entrada;
export function getEntrada() {
    return _entrada;
}
export function setEntrada(novaEntrada) {
    _entrada = novaEntrada;
}
export function atualizarDisplay() {
    display.textContent = _entrada;
    _entrada = display.textContent;
    display.scrollLeft = display.scrollWidth;
    limparDeletar();
}
export function atualizarUltimaConta(ultimaConta) {
    displayHistorico.textContent = ultimaConta;
    displayHistorico.scrollLeft = displayHistorico.scrollWidth;
}
export function mostrarHistorico() {
    const containerHistorico = document.getElementById("containerHistorico");
    const overlay = document.getElementById("overlay");
    containerHistorico?.classList.add("ativo");
    overlay?.classList.add("ativo");
}
export function fecharHistorico() {
    const containerHistorico = document.getElementById("containerHistorico");
    const overlay = document.getElementById("overlay");
    containerHistorico?.classList.remove("ativo");
    overlay?.classList.remove("ativo");
}
