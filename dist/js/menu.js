// --- Menu Tipo da Calculadora ---
export function mostrarOpcoes() {
    const menu = document.getElementById("menu-container");
    const overlay = document.getElementById("overlay");
    const ativo = menu?.classList.toggle("active");
    if (ativo) {
        overlay?.classList.add("ativo");
    }
    else {
        overlay?.classList.remove("ativo");
    }
}
export function fecharOpcoes() {
    const menu = document.getElementById("menu-container");
    const overlay = document.getElementById("overlay");
    overlay?.classList.remove("ativo");
    menu?.classList.remove("active");
}
document.getElementById("overlay")?.addEventListener("click", fecharOpcoes);
export function calcBasica() {
    const conversao = document.querySelector(".display-convertido");
    conversao?.classList.remove("ativo");
    document.getElementById("conversao").style.color = "white";
    document.getElementById("conversao").style.fontWeight = "100";
    document.getElementById("basica").style.color = "#ffa500";
    document.getElementById("basica").style.fontWeight = "bold";
    fecharOpcoes();
}
export function calcConversao() {
    const conversao = document.querySelector(".display-convertido");
    conversao?.classList.add("ativo");
    document.getElementById("basica").style.color = "white";
    document.getElementById("basica").style.fontWeight = "100";
    document.getElementById("conversao").style.color = "#ffa500";
    document.getElementById("conversao").style.fontWeight = "bold";
    fecharOpcoes();
}
document.getElementById("basica")?.addEventListener("click", calcBasica);
document.getElementById("conversao")?.addEventListener("click", calcConversao);
