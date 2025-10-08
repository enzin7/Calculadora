import { limparDeletar } from "./calculadora.js";

// Variáveis Globais
export const display: HTMLElement = document.getElementById("display");
const displayHistorico: HTMLElement =
  document.getElementById("displayHistorico");

let _entrada: string;

export function getEntrada(): string {
  return _entrada;
}

export function setEntrada(novaEntrada: string): void {
  _entrada = novaEntrada;
}

export function atualizarDisplay(): void {
  display.textContent = _entrada;
  _entrada = display.textContent;

  display.scrollLeft = display.scrollWidth;
  limparDeletar();
}

export function atualizarUltimaConta(ultimaConta: string): void {
  displayHistorico.textContent = ultimaConta;

  displayHistorico.scrollLeft = displayHistorico.scrollWidth;
}

export function mostrarHistorico(): void {
  const containerHistorico: HTMLElement =
    document.getElementById("containerHistorico");
  const overlay = document.getElementById("overlay");

  containerHistorico?.classList.add("ativo");
  overlay?.classList.add("ativo");
}

export function fecharHistorico(): void {
  const containerHistorico: HTMLElement =
    document.getElementById("containerHistorico");
  const overlay: HTMLElement = document.getElementById("overlay");

  containerHistorico?.classList.remove("ativo");
  overlay?.classList.remove("ativo");
}
