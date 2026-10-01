// ===============================
// FRASES ALEATÓRIAS
// ===============================

const frasesAleatorias = [

    "Alguns momentos simples acabam se tornando os mais especiais.",

    "Um sorriso pode transformar completamente um momento.",

    "Algumas pessoas deixam lembranças bonitas sem nem perceber.",

    "Nem tudo precisa ser explicado. Algumas coisas simplesmente são especiais.",

    "Às vezes, uma conversa simples vira uma lembrança que a gente guarda.",

    "Os melhores momentos nem sempre são planejados.",

    "Pequenos detalhes também podem significar muito.",

    "Algumas lembranças permanecem bonitas justamente porque foram simples.",

    "A vida fica mais bonita quando encontramos motivos para sorrir.",

    "Existem pessoas que tornam determinados momentos inesquecíveis."

];

const botaoFraseAleatoria =
    document.getElementById("botaoFraseAleatoria");

const fraseAleatoria =
    document.getElementById("fraseAleatoria");


if (botaoFraseAleatoria && fraseAleatoria) {

    botaoFraseAleatoria.addEventListener(
        "click",
        () => {

            const indice =
                Math.floor(
                    Math.random() *
                    frasesAleatorias.length
                );

            fraseAleatoria.style.opacity = "0";

            setTimeout(() => {

                fraseAleatoria.textContent =
                    "“" +
                    frasesAleatorias[indice] +
                    "”";

                fraseAleatoria.style.opacity = "1";

            }, 200);

        }
    );

}


// ===============================
// CARTA DIGITAL
// ===============================

const botaoCarta =
    document.getElementById("botaoCarta");

const cartaConteudo =
    document.getElementById("cartaConteudo");


if (botaoCarta && cartaConteudo) {

    botaoCarta.addEventListener(
        "click",
        () => {

            cartaConteudo.classList.toggle("aberta");


            if (
                cartaConteudo.classList.contains("aberta")
            ) {

                botaoCarta.textContent =
                    "Fechar carta ♥";

            } else {

                botaoCarta.textContent =
                    "Abrir carta 💌";

            }

        }
    );

}


// ===============================
// CORAÇÕES AO TOCAR NA TELA
// ===============================

document.addEventListener(
    "pointerdown",
    (evento) => {

        // Não cria coração quando tocar em botões,
        // campos de texto ou controles.
        if (
            evento.target.closest("button") ||
            evento.target.closest("textarea") ||
            evento.target.closest("input")
        ) {
            return;
        }


        const coracao =
            document.createElement("span");

        coracao.className =
            "coracao-toque";

        coracao.textContent =
            Math.random() > 0.5
                ? "♥"
                : "♡";


        coracao.style.left =
            evento.clientX + "px";

        coracao.style.top =
            evento.clientY + "px";


        const movimento =
            (Math.random() * 80 - 40) + "px";

        coracao.style.setProperty(
            "--movimento-x",
            movimento
        );


        document.body.appendChild(
            coracao
        );


        setTimeout(() => {

            coracao.remove();

        }, 1200);

    }
);


// ===============================
// MODO NOTURNO
// ===============================

const botaoNoturno =
    document.getElementById("botaoNoturno");


if (botaoNoturno) {

    // Verifica se o modo noturno estava ativado
    if (
        localStorage.getItem("modoNoturno") === "ativado"
    ) {

        document.body.classList.add(
            "modo-noturno"
        );

        botaoNoturno.textContent =
            "☀️";

    }


    // Ativa/desativa o modo noturno
    botaoNoturno.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "modo-noturno"
            );


            if (
                document.body.classList.contains(
                    "modo-noturno"
                )
            ) {

                botaoNoturno.textContent =
                    "☀️";

                localStorage.setItem(
                    "modoNoturno",
                    "ativado"
                );

            } else {

                botaoNoturno.textContent =
                    "🌙";

                localStorage.setItem(
                    "modoNoturno",
                    "desativado"
                );

            }

        }
    );

}
