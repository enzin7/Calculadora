// ui.ts
// Variáveis Globais de DOM
export const display = document.getElementById("display");
export const displayHistorico = document.getElementById("displayHistorico");
// Variável de Estado PRIVADO (stateEntrada)
let stateEntrada = "0";
// --- Funções de Acesso ao Estado (Getters e Setters) ---
// Usada para LER o valor atual por qualquer módulo.
export function getEntrada() {
    return stateEntrada;
}
// Usada para ESCREVER o novo valor por qualquer módulo.
export function setEntrada(novaEntrada) {
    stateEntrada = novaEntrada;
}
// --- Funções de Atualizações da Interface --- 
export function atualizarDisplay() {
    // Lê o estado centralizado e o exibe no display principal
    display.textContent = stateEntrada;
    display.scrollLeft = display.scrollWidth;
}
export function atualizarUltimaConta(ultimaConta) {
    displayHistorico.textContent = ultimaConta;
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
