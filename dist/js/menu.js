//--- Variaveis Globais ---
const conversao = document.querySelector(".display-convertido");
export const moedaEscolhida = document.getElementById("moeda-escolhida");
const menu = document.getElementById("menu-container");
const overlay = document.getElementById("overlay");
const displayI = document.getElementById("display");
export const moedaS = document.getElementById("moeda-e");
// --- Menu Tipo da Calculadora ---
export function mostrarOpcoes() {
    const ativo = menu?.classList.toggle("active");
    if (ativo) {
        overlay?.classList.add("ativo");
    }
    else {
        overlay?.classList.remove("ativo");
    }
}
export function fecharOpcoes() {
    overlay?.classList.remove("ativo");
    menu?.classList.remove("active");
}
document.getElementById("overlay")?.addEventListener("click", fecharOpcoes);
export function calcBasica() {
    moedaEscolhida.classList.add("hidden");
    conversao?.classList.remove("ativo");
    document.getElementById("conversao").style.color = "white";
    document.getElementById("conversao").style.fontWeight = "100";
    document.getElementById("basica").style.color = "#ffa500";
    document.getElementById("basica").style.fontWeight = "bold";
    displayI.classList.remove("e");
    moedaS.classList.add("hidden");
    fecharOpcoes();
}
export function calcConversao() {
    moedaEscolhida.classList.remove("hidden");
    conversao?.classList.add("ativo");
    document.getElementById("basica").style.color = "white";
    document.getElementById("basica").style.fontWeight = "100";
    document.getElementById("conversao").style.color = "#ffa500";
    document.getElementById("conversao").style.fontWeight = "bold";
    displayI.classList.add("e");
    moedaS.classList.remove("hidden");
    fecharOpcoes();
}
document.getElementById("basica")?.addEventListener("click", calcBasica);
document.getElementById("conversao")?.addEventListener("click", calcConversao);
