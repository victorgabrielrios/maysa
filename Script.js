// ===============================
// FIREBASE
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getAuth,
    signInAnonymously,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCH643YK8iRy24JS2mBnlb_dc9Y83JSTsQ",
    authDomain: "site-romantico-663fb.firebaseapp.com",
    projectId: "site-romantico-663fb",
    storageBucket: "site-romantico-663fb.firebasestorage.app",
    messagingSenderId: "768746563580",
    appId: "1:768746563580:web:a61ab53f59f8214aa97479"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ===============================
// LOGIN ANÔNIMO
// ===============================

let usuarioLogado = false;

signInAnonymously(auth)
    .catch((erro) => {

        console.error("Erro no login:", erro);

        const status =
            document.getElementById("statusMensagem");

        if (status) {
            status.textContent =
                "Erro Firebase: " +
                (erro.code || erro.message);
        }
    });


onAuthStateChanged(auth, (usuario) => {

    if (usuario) {

        usuarioLogado = true;

        carregarMensagens();

    } else {

        usuarioLogado = false;

    }

});


// ===============================
// ENVIAR MENSAGEM
// ===============================

async function enviarMensagem() {

    const campo =
        document.getElementById("mensagemMaysa");

    const status =
        document.getElementById("statusMensagem");

    if (!campo || !status) return;

    const texto =
        campo.value.trim();


    if (!texto) {

        status.textContent =
            "Escreva uma mensagem primeiro.";

        return;
    }


    if (!usuarioLogado) {

        status.textContent =
            "Aguarde um momento e tente novamente.";

        return;
    }


    try {

        status.textContent =
            "Enviando...";


        await addDoc(
            collection(db, "messages"),
            {
                text: texto,
                createdAt: serverTimestamp()
            }
        );


        campo.value = "";


        status.textContent =
            "Mensagem enviada ♥";


        await carregarMensagens();


    } catch (erro) {

        console.error(
            "Erro ao enviar mensagem:",
            erro
        );


        status.textContent =
            "Erro Firebase: " +
            (erro.code || erro.message);

    }

}


// ===============================
// CARREGAR MENSAGENS
// ===============================

async function carregarMensagens() {

    const lista =
        document.getElementById("listaMensagens");

    if (!lista) return;


    try {

        const q =
            query(
                collection(db, "messages"),
                orderBy("createdAt", "desc")
            );


        const snapshot =
            await getDocs(q);


        if (snapshot.empty) {

            lista.innerHTML =
                "Nenhuma mensagem ainda.";

            return;
        }


        lista.innerHTML = "";


        snapshot.forEach((doc) => {

            const dados =
                doc.data();


            const card =
                document.createElement("div");


            card.className =
                "mensagem-enviada";


            card.innerHTML = `
                <div class="mensagem-cabecalho">

                    <div class="mensagem-coracao">
                        ♥
                    </div>

                    <div>

                        <div class="mensagem-nome">
                            Você
                        </div>

                        <div class="mensagem-hora">
                            Mensagem enviada
                        </div>

                    </div>

                </div>

                <div class="mensagem-texto">
                    ${escapeHTML(dados.text || "")}
                </div>
            `;


            lista.appendChild(card);

        });


    } catch (erro) {

        console.error(
            "Erro ao carregar mensagens:",
            erro
        );


        lista.innerHTML =
            "Erro Firebase: " +
            (erro.code || erro.message);

    }

}


// ===============================
// PROTEÇÃO CONTRA HTML
// ===============================

function escapeHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent =
        texto;

    return div.innerHTML;

}


// Disponibiliza para o HTML
window.enviarMensagem =
    enviarMensagem;


// =========================
// JOGO — 20 PERGUNTAS
// =========================

const perguntas = [
    {
        pergunta: "Qual planeta possui o dia mais longo do Sistema Solar?",
        opcoes: ["Mercúrio", "Vênus", "Marte", "Júpiter"],
        correta: 1
    },
    {
        pergunta: "Em qual camada da atmosfera ocorre a maior parte dos fenômenos meteorológicos?",
        opcoes: ["Estratosfera", "Mesosfera", "Troposfera", "Termosfera"],
        correta: 2
    },
    {
        pergunta: "Qual destes países NÃO faz parte da América do Sul?",
        opcoes: ["Suriname", "Guiana", "Panamá", "Paraguai"],
        correta: 2
    },
    {
        pergunta: "Qual elemento químico possui o símbolo W?",
        opcoes: ["Tungstênio", "Titânio", "Tálio", "Tório"],
        correta: 0
    },
    {
        pergunta: "Na mitologia grega, quem era o deus dos mares?",
        opcoes: ["Ares", "Hades", "Poseidon", "Hermes"],
        correta: 2
    },

    {
        pergunta: "Qual é o maior órgão do corpo humano?",
        opcoes: ["Fígado", "Pulmão", "Intestino", "Pele"],
        correta: 3
    },
    {
        pergunta: "Qual destes números é primo?",
        opcoes: ["91", "87", "83", "81"],
        correta: 2
    },
    {
        pergunta: "Qual país é conhecido por ter a cidade de Petra?",
        opcoes: ["Egito", "Jordânia", "Turquia", "Líbano"],
        correta: 1
    },
    {
        pergunta: "Quem escreveu 'Dom Quixote'?",
        opcoes: [
            "Miguel de Cervantes",
            "William Shakespeare",
            "Dante Alighieri",
            "Victor Hugo"
        ],
        correta: 0
    },
    {
        pergunta: "Qual é o menor osso do corpo humano?",
        opcoes: ["Estribo", "Fêmur", "Martelo", "Rádio"],
        correta: 0
    },

    {
        pergunta: "Se 3 máquinas produzem 3 peças em 3 minutos, quantas peças 9 máquinas produzem em 9 minutos?",
        opcoes: ["9", "18", "27", "81"],
        correta: 2
    },
    {
        pergunta: "Qual é a capital da Austrália?",
        opcoes: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correta: 2
    },
    {
        pergunta: "Qual destes animais é um mamífero?",
        opcoes: ["Pinguim", "Morcego", "Crocodilo", "Tubarão"],
        correta: 1
    },
    {
        pergunta: "Qual linguagem é conhecida por usar a estrutura 'if' para criar condições?",
        opcoes: ["HTML", "CSS", "JavaScript", "JSON"],
        correta: 2
    },
    {
        pergunta: "Qual é o resultado de 2⁵ × 2²?",
        opcoes: ["32", "64", "128", "256"],
        correta: 2
    },

    {
        pergunta: "Qual civilização construiu Machu Picchu?",
        opcoes: ["Maias", "Astecas", "Incas", "Egípcios"],
        correta: 2
    },
    {
        pergunta: "Qual é o único número que é simultaneamente par e primo?",
        opcoes: ["0", "1", "2", "4"],
        correta: 2
    },
    {
        pergunta: "Qual destes filmes pertence ao universo de 'O Senhor dos Anéis'?",
        opcoes: [
            "As Crônicas de Nárnia",
            "A Sociedade do Anel",
            "Eragon",
            "Stardust"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é aproximadamente a velocidade da luz no vácuo?",
        opcoes: [
            "30 mil km/s",
            "300 mil km/s",
            "3 milhões km/s",
            "30 milhões km/s"
        ],
        correta: 1
    },
    {
        pergunta: "Se você ultrapassa a pessoa que está em segundo lugar em uma corrida, em qual posição você fica?",
        opcoes: ["Primeiro", "Segundo", "Terceiro", "Quarto"],
        correta: 1

const quizPergunta = document.getElementById("quizPergunta");
const quizOpcoes = document.getElementById("quizOpcoes");
const quizResultado = document.getElementById("quizResultado");
const quizBotao = document.getElementById("quizBotao");
const quizProgresso = document.getElementById("quizProgresso");

function iniciarJogo() {

    perguntaAtual = 0;
    pontuacao = 0;

    quizBotao.style.display = "none";
    quizResultado.innerText = "";

    mostrarPergunta();
}

function mostrarPergunta() {

    const atual = perguntas[perguntaAtual];

    quizProgresso.innerText =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    quizPergunta.innerText = atual.pergunta;

    quizOpcoes.innerHTML = "";

    atual.opcoes.forEach((opcao, indice) => {

        const botao = document.createElement("button");

        botao.className = "quiz-opcao";
        botao.innerText = opcao;

        botao.onclick = () => verificarResposta(indice);

        quizOpcoes.appendChild(botao);
    });
}

function verificarResposta(indice) {

    const atual = perguntas[perguntaAtual];

    const botoes =
        document.querySelectorAll(".quiz-opcao");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indice === atual.correta) {

        pontuacao++;

        quizResultado.innerText = "✓ Resposta correta!";
    } else {

        quizResultado.innerText =
            `✗ Resposta errada! A correta era: ${atual.opcoes[atual.correta]}`;
    }

    setTimeout(() => {

        perguntaAtual++;

        quizResultado.innerText = "";

        if (perguntaAtual < perguntas.length) {

            mostrarPergunta();

        } else {

            finalizarJogo();
        }

    }, 1200);
}

function finalizarJogo() {

    quizOpcoes.innerHTML = "";

    quizProgresso.innerText =
        "Fim do desafio!";

    quizPergunta.innerText =
        `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;

    if (pontuacao === 20) {

        quizResultado.innerText =
            "🏆 Perfeito! Você acertou todas!";

    } else if (pontuacao >= 15) {

        quizResultado.innerText =
            "🔥 Excelente resultado!";

    } else if (pontuacao >= 10) {

        quizResultado.innerText =
            "👏 Bom resultado!";

    } else {

        quizResultado.innerText =
            "💗 Foi um desafio difícil! Tente novamente.";
    }

    quizBotao.innerText = "Jogar novamente ♥";
    quizBotao.style.display = "inline-block";
}

quizBotao.addEventListener("click", iniciarJogo);
// ===============================
// VARIÁVEIS DO JOGO
// ===============================



// ===============================
// ELEMENTOS DO JOGO
// ===============================

const quizBotao =
    document.getElementById("quizBotao");

const quizPergunta =
    document.getElementById("quizPergunta");

const quizOpcoes =
    document.getElementById("quizOpcoes");

const quizResultado =
    document.getElementById("quizResultado");

const quizProgresso =
    document.getElementById("quizProgresso");


// ===============================
// COMEÇAR JOGO
// ===============================

function iniciarQuiz() {

    perguntaAtual = 0;
    pontos = 0;
    vidas = 3;

    if (quizResultado) {
        quizResultado.textContent = "";
    }

    if (quizBotao) {
        quizBotao.textContent =
            "Recomeçar jogo";
    }

    mostrarPergunta();
}


// ===============================
// MOSTRAR PERGUNTA
// ===============================

function mostrarPergunta() {

    if (!quizPergunta || !quizOpcoes || !quizProgresso) {
        return;
    }


    if (perguntaAtual >= perguntasJogo.length) {

        finalizarJogo();

        return;
    }


    const pergunta =
        perguntasJogo[perguntaAtual];


    quizProgresso.innerHTML =
        `Pergunta ${perguntaAtual + 1} de ${perguntasJogo.length}
        <br>
        ❤️ Vidas: ${"♥".repeat(vidas)}${"♡".repeat(3 - vidas)}
        <br>
        ⭐ Pontos: ${pontos}`;


    quizPergunta.textContent =
        pergunta.pergunta;


    quizOpcoes.innerHTML = "";


    pergunta.opcoes.forEach(
        (opcao, indice) => {

            const botao =
                document.createElement("button");

            botao.className =
                "quiz-opcao";

            botao.textContent =
                opcao;


            botao.onclick = () =>
                responder(indice);


            quizOpcoes.appendChild(botao);

        }
    );
}


// ===============================
// RESPONDER
// ===============================

function responder(indice) {

    const pergunta =
        perguntasJogo[perguntaAtual];


    const botoes =
        document.querySelectorAll(".quiz-opcao");


    botoes.forEach(
        botao => botao.disabled = true
    );


    if (indice === pergunta.correta) {

        pontos++;

        if (botoes[indice]) {
            botoes[indice].classList.add("correta");
        }

        if (quizResultado) {
            quizResultado.textContent =
                "✓ Acertou!";
        }

    } else {

        vidas--;

        if (botoes[indice]) {
            botoes[indice].classList.add("errada");
        }

        if (botoes[pergunta.correta]) {
            botoes[pergunta.correta].classList.add("correta");
        }

        if (quizResultado) {
            quizResultado.textContent =
                "✕ Errou!";
        }
    }


    setTimeout(() => {

        if (quizResultado) {
            quizResultado.textContent = "";
        }

        if (vidas <= 0) {

            finalizarJogo();

        } else {

            perguntaAtual++;

            mostrarPergunta();

        }

    }, 1200);
}


// ===============================
// FINAL DO JOGO
// ===============================

function finalizarJogo() {

    if (quizOpcoes) {
        quizOpcoes.innerHTML = "";
    }

    if (quizProgresso) {
        quizProgresso.innerHTML =
            "🏁 Fim do jogo";
    }


    if (quizPergunta) {

        quizPergunta.innerHTML = `
            Você fez <strong>${pontos}</strong>
            ponto(s) de ${perguntasJogo.length}.
            <br><br>
            ${mensagemFinal()}
        `;

    }


    if (quizResultado) {
        quizResultado.textContent = "";
    }


    if (quizBotao) {
        quizBotao.textContent =
            "Jogar novamente";
    }
}


// ===============================
// MENSAGEM FINAL
// ===============================

function mensagemFinal() {

    if (pontos === 10) {
        return "🧠 INSANO! Você acertou tudo!";
    }

    if (pontos >= 8) {
        return "🔥 Muito difícil e você foi excelente!";
    }

    if (pontos >= 6) {
        return "🧩 Mandou bem! Mas algumas pegadinhas te pegaram.";
    }

    if (pontos >= 4) {
        return "👀 Nada mal... mas ainda dá para melhorar.";
    }

    return "😈 As pegadinhas venceram dessa vez!";
}


// ===============================
// BOTÃO DO JOGO
// ===============================

if (quizBotao) {

    quizBotao.addEventListener(
        "click",
        iniciarQuiz
    );

}


// ======================================================
// =================== MODO NOTURNO =====================
// ======================================================

const botaoNoturno =
    document.getElementById("botaoNoturno");


if (
    localStorage.getItem("modoNoturno") ===
    "ativado"
) {

    document.body.classList.add(
        "modo-noturno"
    );

    if (botaoNoturno) {
        botaoNoturno.textContent = "☀️";
    }
}


if (botaoNoturno) {

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


// ======================================================
// ================= FRASES ALEATÓRIAS ==================
// ======================================================

const frasesAleatorias = [

    "Algumas pessoas deixam o dia mais bonito simplesmente por existirem. ♥",

    "Um sorriso pode transformar completamente um momento simples.",

    "Entre tantas pessoas, algumas acabam se tornando especiais sem perceber.",

    "As melhores lembranças muitas vezes nascem dos momentos mais simples.",

    "Tem pessoas que fazem a gente sorrir só de lembrar delas.",

    "Algumas histórias começam sem que a gente perceba.",

    "Um pequeno momento pode se transformar em uma grande lembrança.",

    "Existem pessoas que tornam qualquer lugar um pouco mais especial.",

    "Às vezes, um simples sorriso já consegue dizer muita coisa.",

    "Certas lembranças merecem ser guardadas para sempre. ♥"

];


const botaoFraseAleatoria =
    document.getElementById(
        "botaoFraseAleatoria"
    );

const fraseAleatoria =
    document.getElementById(
        "fraseAleatoria"
    );


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
                    frasesAleatorias[indice];

                fraseAleatoria.style.opacity = "1";

            }, 200);

        }
    );

}


// ======================================================
// ==================== CARTA DIGITAL ====================
// ======================================================

const botaoCarta =
    document.getElementById("botaoCarta");

const cartaConteudo =
    document.getElementById("cartaConteudo");


if (botaoCarta && cartaConteudo) {

    botaoCarta.addEventListener(
        "click",
        () => {

            cartaConteudo.classList.toggle(
                "aberta"
            );


            if (
                cartaConteudo.classList.contains(
                    "aberta"
                )
            ) {

                botaoCarta.textContent =
                    "Fechar carta ♥";

            } else {

                botaoCarta.textContent =
                    "Abrir carta ♥";

            }

        }
    );

}


// ======================================================
// ================= CORAÇÕES AO TOCAR ==================
// ======================================================

document.addEventListener(
    "click",
    (evento) => {

        // Não cria coração quando clicar em botões
        // ou na caixa de texto.

        if (
            evento.target.tagName === "BUTTON" ||
            evento.target.tagName === "TEXTAREA"
        ) {
            return;
        }


        const coracao =
            document.createElement("span");


        coracao.className =
            "coracao-toque";

        coracao.textContent =
            "♥";


        coracao.style.left =
            evento.clientX + "px";

        coracao.style.top =
            evento.clientY + "px";


        const movimento =
            (Math.random() * 100 - 50) + "px";


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
