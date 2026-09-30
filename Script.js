function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML = `
        <p>
            Maysa, talvez você não saiba, mas existem
            momentos simples que acabam ficando
            guardados de um jeito especial.
        </p>

        <p>
            Esse pequeno cantinho foi feito para
            guardar um pouco dessas lembranças
            e mostrar o carinho por trás delas. ♥
        </p>

        <p>
            Espero que você goste da surpresa. ✨
        </p>
    `;

    mensagem.style.display = "block";
}