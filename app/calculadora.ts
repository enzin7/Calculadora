// Importações
import {
  getEntrada,
  setEntrada,
  atualizarDisplay,
  atualizarUltimaConta,
  display,
} from "./ui.js";
import { atualizarHistorico, historico } from "./historico.js";
import { converter } from "./conversor.js";

// Variáveis Globais
export const sinais: string[] = ["+", "-", "x", "÷"];
export const numeros: string[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

// --- Funções da Calculadora ---
export function adicionarNumero(valor: string): void {
  let entrada: string = getEntrada();

  if (entrada === "0") {
    entrada = "";
  } else if (entrada.endsWith("%") || entrada.endsWith(")")) {
    return;
  }

  entrada += valor;
  setEntrada(entrada);
  atualizarDisplay();
  converter();
}

export function adicionarOperador(operador: string): void {
  let entrada: string = getEntrada();

  const ultString: string = entrada.trim().slice(-1);

  if (ultString === operador) {
    return;
  } else if (entrada === "0" && !sinais.includes(operador)) {
    entrada = operador + " ";
  } else if (sinais.includes(ultString)) {
    entrada = entrada.slice(0, -2) + operador + " ";
  } else if (ultString === ",") {
    entrada += "00 " + operador + " ";
  } else {
    entrada += " " + operador + " ";
  }

  setEntrada(entrada);
  atualizarDisplay();
}

export function adicionarDecimal(ponto: string): void {
  let entrada: string = getEntrada();

  const sinal: number = entrada.search(/[+\-÷x](?!.*[+\-÷x])/);
  const contaAtual: string = entrada.slice(sinal + 1);

  if (contaAtual.includes(ponto)) {
    return;
  } else if (contaAtual === " ") {
    entrada += "0" + ponto;
  } else {
    entrada += ponto;
  }

  setEntrada(entrada);
  atualizarDisplay();
  converter();
}

export function adicionarPorcentagem(sPorcentagem: string): void {
  let entrada: string = getEntrada();

  const ultString: string = entrada.trim().slice(-1);
  const perc: number = entrada.lastIndexOf(")");
  const penulSinal: number = entrada.search(/.*[+\-x÷](?!.*[+\-x÷])/);

  if (
    entrada === "0" ||
    entrada.endsWith("%") ||
    entrada.substring(0, perc).endsWith(sPorcentagem)
  ) {
    return;
  } else if (entrada.trim().endsWith(")")) {
    entrada =
      entrada.substring(0, perc) + sPorcentagem + entrada.substring(perc);
  } else if (
    entrada.substring(penulSinal - 2) === "%" &&
    sinais.includes(ultString)
  ) {
    entrada = entrada.replace(entrada.trim().slice(-1), sPorcentagem);
  } else if (numeros.includes(ultString)) {
    entrada += sPorcentagem;
  }

  setEntrada(entrada);
  atualizarDisplay();
}

export function limpar(): void {
  let entrada: string = getEntrada();

  entrada = "0";
  setEntrada(entrada);
  atualizarDisplay();
  atualizarUltimaConta("");
}

export function deletar(): void {
  let entrada: string = getEntrada();

  const final: boolean = sinais.includes(entrada.trim().slice(-1));

  if (entrada === "0" || entrada.trim().endsWith(")")) {
    return;
  } else if (final || entrada.endsWith(" ")) {
    entrada = entrada.slice(0, -3);
  } else {
    entrada = entrada.slice(0, -1);
    if (entrada === "") {
      entrada = "0";
    }
  }

  setEntrada(entrada);
  atualizarDisplay();
}

export function limparDeletar() {
  const btnLimparDeletar: HTMLElement =
    document.getElementById("btn-limpar-deletar");

  let timeout: number;

  btnLimparDeletar.addEventListener("mousedown", () => {
    timeout = window.setTimeout(() => {
      limpar();
    }, 800);
  });

  btnLimparDeletar.addEventListener("mouseup", () => {
    clearTimeout(timeout);
  });

  btnLimparDeletar.addEventListener("mouseleave", () => {
    clearTimeout(timeout);
  });

  if (getEntrada().length < 2) {
    btnLimparDeletar.textContent = "AC";
    btnLimparDeletar.onclick = limpar;
  } else {
    const svg: string = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24"
        viewBox="0 -1 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 19L-1 12l6-7h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6z"/>
        <line x1="9.5" y1="9.5" x2="14.5" y2="14.5"/>
        <line x1="14.5" y1="9.5" x2="9.5" y2="14.5"/>
      </svg>
    `;

    btnLimparDeletar.innerHTML = svg;
    btnLimparDeletar.onclick = deletar;
  }
}

export function inverterValor(): void {
  let entrada: string = getEntrada();

  const sinais: string[] = ["+", "x", "÷"];
  const sinal: number = entrada.search(/[+÷x](?!.*[+÷x])/);
  let pConta: string = entrada.slice(0, sinal + 1);
  let contaS: string = entrada.slice(sinal + 1);
  const neg: number = entrada.lastIndexOf("-");
  const parenteses: number = entrada.lastIndexOf("(-");
  let ultNeg: string = entrada.slice(parenteses + 3, neg + 1);

  if (ultNeg.endsWith("-") && !contaS.endsWith(" ")) {
    const indice: number = ultNeg.lastIndexOf("-");
    entrada =
      entrada.substring(0, indice + 1) + " + " + entrada.substring(indice + 3);

    entrada = entrada;
  } else {
    if (entrada === "0" || contaS.endsWith(" ")) {
      return;
    } else if (sinais.includes(pConta.slice(-1))) {
      if (!contaS.trim().startsWith("(-")) {
        contaS = " (-" + contaS + ")";
      } else {
        contaS = contaS.slice(3, -1);
      }

      entrada = pConta + contaS;
    } else if (!entrada.trim().startsWith("(-")) {
      pConta = "(- " + entrada + ")";

      entrada = pConta;
    } else {
      entrada = entrada.slice(2, -1);
    }
  }

  setEntrada(entrada);
  atualizarDisplay();
  converter();
}

export function calcular(): void {
  let entrada: string = getEntrada();

  let resultado: string = formatarSinais(entrada);

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

  setEntrada(resultado);
  atualizarDisplay();
  converter();
}

// --- Funções de Formatação ---
export function formatarSinais(display: string): string {
  return display.replace(/x/g, "*").replace(/÷/g, "/").replace(/,/g, ".");
}

export function formatarPorcentagem(display: string): string {
  while (display.includes("%")) {
    const ultPorc: number = display.indexOf("%");

    const ultSinal: number = Math.max(
      display.slice(0, ultPorc).lastIndexOf("-"),
      display.slice(0, ultPorc).lastIndexOf("+"),
      display.slice(0, ultPorc).lastIndexOf("*"),
      display.slice(0, ultPorc).lastIndexOf("/")
    );

    const pSinal: number = Math.max(
      display.slice(0, ultSinal).lastIndexOf("-"),
      display.slice(0, ultSinal).lastIndexOf("+"),
      display.slice(0, ultSinal).lastIndexOf("*"),
      display.slice(0, ultSinal).lastIndexOf("/")
    );

    const sinal: string = display.charAt(ultSinal);

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
    } else if (sinal === "*" || sinal === "/") {
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

export function formatarDecimal(s: string): string {
  s = Number.parseFloat(s).toFixed(2).replace(".", ",");

  return s;
}
