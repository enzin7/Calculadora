// Importações
import { getEntrada } from "./ui.js";
import {
  sinais,
  formatarDecimal,
  formatarPorcentagem,
  formatarSinais,
} from "./calculadora.js";
import { moedaEscolhida, moedaS } from "./menu.js";

// Variáveis Globais
const select: HTMLSelectElement = document.getElementById(
  "moeda"
) as HTMLSelectElement;
const moedaSelecionada: HTMLElement =
  document.getElementById("moedaSelecionada");
const resultado: HTMLElement = document.getElementById("valor-convertido");

resultado.textContent = "0,00";

moedaEscolhida.addEventListener("change", () => {
  moedaS.textContent = moedaEscolhida.value;
  converter();
});

select.addEventListener("change", () => {
  moedaSelecionada.textContent = select.value;
  converter();
});

export function converter(): void {
  let valor: string = getEntrada();
  const moeda: string = select.value;
  const moedaE: string = moedaEscolhida.value;

  if (sinais.includes(valor) || valor.includes("%")) {
    valor = formatarPorcentagem(formatarSinais(valor));
  }

  valor = eval(valor);

  const apiUrl = `https://v6.exchangerate-api.com/v6/2759982764cc197890048b48/latest/${moedaE}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const conversao: number = data.conversion_rates[moeda];
      let valorConvertido: number = parseFloat(valor) * conversao;

      resultado.textContent = `${formatarDecimal(valorConvertido.toFixed(2))}`;
    })
    .catch(() => {
      resultado.textContent = "ERRO ao buscar a taxa de câmbio";
    });
}
