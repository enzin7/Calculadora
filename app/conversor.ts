// Importações
import { getEntrada } from "./ui.js";
import {
  sinais,
  formatarDecimal,
  formatarPorcentagem,
  formatarSinais,
} from "./calculadora.js";

// Variáveis Globais
const select: HTMLSelectElement = document.getElementById(
  "moeda"
) as HTMLSelectElement;
const moedaSelecionada: HTMLElement = document.getElementById(
  "moedaSelecionada"
) as HTMLElement;
const resultado: HTMLElement = document.getElementById(
  "valor-convertido"
) as HTMLElement;

resultado.textContent = "0,00";

select.addEventListener("change", () => {
  moedaSelecionada.textContent = select.value;
  converter();
});

export function converter(): void {
  let valor: string = getEntrada();
  const moeda: string = select.value;

  if (sinais.includes(valor) || valor.includes("%")) {
    valor = formatarPorcentagem(formatarSinais(valor));
  }

  valor = eval(valor);

  const apiUrl = `https://v6.exchangerate-api.com/v6/2759982764cc197890048b48/latest/BRL`;

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
