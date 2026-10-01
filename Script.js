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
    apiKey: "AIzaSyDDQmeauYTWB3duFCgwmtdxgQvD3srqGvI",
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


// Evita que HTML seja executado dentro das mensagens
function escapeHTML(texto) {

    const div =
        document.createElement("div");


    div.textContent =
        texto;


    return div.innerHTML;

}


// Disponibiliza a função para o HTML
window.enviarMensagem =
    enviarMensagem;


// ======================================================
// ======================= JOGO ==========================
// ======================================================


// 10 perguntas de lógica, pegadinhas e raciocínio
const perguntasJogo = [

    {
        pergunta:
            "Você ultrapassa o segundo colocado em uma corrida. Em qual posição você fica?",

        opcoes: [
            "Primeiro",
            "Segundo",
            "Terceiro",
            "Quarto"
        ],

        correta: 1
    },

    {
        pergunta:
            "Um relógio marca 3:15. Qual é aproximadamente o menor ângulo entre os ponteiros?",

        opcoes: [
            "0°",
            "7,5°",
            "15°",
            "30°"
        ],

        correta: 1
    },

    {
        pergunta:
            "Qual número completa a sequência? 2, 6, 12, 20, 30, ?",

        opcoes: [
            "36",
            "40",
            "42",
            "44"
        ],

        correta: 2
    },

    {
        pergunta:
            "Um pai tem 40 anos e seu filho tem 10. Daqui a quantos anos o pai terá exatamente o dobro da idade do filho?",

        opcoes: [
            "10",
            "15",
            "20",
            "30"
        ],

        correta: 2
    },

    {
        pergunta:
            "Você tem 3 interruptores fora de uma sala e apenas uma lâmpada dentro. Só pode entrar na sala uma vez. Como descobrir qual interruptor acende a lâmpada?",

        opcoes: [
            "Ligar os três ao mesmo tempo",
            "Ligar um, esperar, desligar e ligar outro; verificar luz e temperatura",
            "Entrar várias vezes",
            "Não é possível descobrir"
        ],

        correta: 1
    },

    {
        pergunta:
            "Um número de dois dígitos tem soma dos algarismos igual a 9. Ao inverter os algarismos, o número aumenta 27. Qual é o número original?",

        opcoes: [
            "36",
            "45",
            "54",
            "63"
        ],

        correta: 0
    },

    {
        pergunta:
            "Há 5 máquinas que produzem 5 peças em 5 minutos. Mantendo o mesmo ritmo, quanto tempo 100 máquinas levam para produzir 100 peças?",

        opcoes: [
            "5 minutos",
            "20 minutos",
            "100 minutos",
            "500 minutos"
        ],

        correta: 0
    },

    {
        pergunta:
            "Qual número vem a seguir? 1, 11, 21, 1211, 111221, ?",

        opcoes: [
            "312211",
            "212211",
            "111222",
            "311221"
        ],

        correta: 0
    },

    {
        pergunta:
            "Você possui duas cordas. Cada uma leva exatamente 1 hora para queimar, mas queima de maneira irregular. Como medir exatamente 45 minutos?",

        opcoes: [
            "Acender uma ponta de cada corda",
            "Acender as duas pontas de uma corda e uma ponta da outra; quando a primeira acabar, acender a segunda ponta da outra",
            "Acender apenas uma ponta",
            "Não é possível"
        ],

        correta: 1
    },

    {
        pergunta:
            "Um fazendeiro precisa atravessar um rio com uma raposa, uma galinha e um saco de milho. Ele só pode levar um deles por vez. Qual deve ser a ordem correta?",

        opcoes: [
            "Galinha → raposa → milho",
            "Raposa → galinha → milho",
            "Galinha → milho → raposa",
            "Milho → raposa → galinha"
        ],

        correta: 0
    }

];


// ===============================
// VARIÁVEIS DO JOGO
// ===============================

let perguntaAtual = 0;
let pontos = 0;
let vidas = 3;
let jogoComecou = false;


// ===============================
// ELEMENTOS
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
// COMEÇAR
// ===============================

function iniciarQuiz() {

    perguntaAtual = 0;
    pontos = 0;
    vidas = 3;

    jogoComecou = true;

    quizResultado.textContent = "";

    quizBotao.textContent =
        "Recomeçar jogo";

    mostrarPergunta();

}


// ===============================
// MOSTRAR PERGUNTA
// ===============================

function mostrarPergunta() {

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

        botoes[indice].classList.add(
            "correta"
        );

        quizResultado.textContent =
            "✓ Acertou!";

    } else {

        vidas--;

        botoes[indice].classList.add(
            "errada"
        );

        botoes[pergunta.correta].classList.add(
            "correta"
        );

        quizResultado.textContent =
            "✕ Errou!";

    }


    setTimeout(() => {

        quizResultado.textContent = "";

        if (vidas <= 0) {

            finalizarJogo();

        } else {

            perguntaAtual++;

            mostrarPergunta();

        }

    }, 1200);

}


// ===============================
// FINAL
// ===============================

function finalizarJogo() {

    jogoComecou = false;

    quizOpcoes.innerHTML = "";

    quizProgresso.innerHTML =
        "🏁 Fim do jogo";


    quizPergunta.innerHTML = `
        Você fez <strong>${pontos}</strong>
        ponto(s) de ${perguntasJogo.length}.
        <br><br>
        ${mensagemFinal()}
    `;


    quizResultado.textContent = "";

    quizBotao.textContent =
        "Jogar novamente";
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
// ===============================
// MODO NOTURNO
// ===============================

const botaoNoturno =
    document.getElementById("botaoNoturno");


// Verifica se o usuário já tinha escolhido o modo noturno
if (localStorage.getItem("modoNoturno") === "ativado") {

    document.body.classList.add("modo-noturno");

    botaoNoturno.textContent = "☀️";

}


// Ativar / desativar modo noturno
if (botaoNoturno) {

    botaoNoturno.addEventListener("click", () => {

        document.body.classList.toggle("modo-noturno");


        if (
            document.body.classList.contains("modo-noturno")
        ) {

            botaoNoturno.textContent = "☀️";

            localStorage.setItem(
                "modoNoturno",
                "ativado"
            );

        } else {

            botaoNoturno.textContent = "🌙";

            localStorage.setItem(
                "modoNoturno",
                "desativado"
            );

        }

    });

}
