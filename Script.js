import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


/* =========================
   FIREBASE
========================= */

const firebaseConfig = {
    apiKey: "AIzaSyCH643YK8iRy24JS2mBnlb_dc9Y83JSTsQ",
    authDomain: "site-romantico-663fb.firebaseapp.com",
    projectId: "site-romantico-663fb",
    storageBucket: "site-romantico-663fb.firebasestorage.app",
    messagingSenderId: "768746563580",
    appId: "1:768746563580:web:a61ab53f59f8214aa97479"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


/* =========================
   LOGIN ANÔNIMO
========================= */

signInAnonymously(auth)
    .then(() => {

        console.log("Firebase conectado.");

        carregarMensagens();

    })
    .catch((erro) => {

        console.error("Erro na autenticação:", erro);

        const status = document.getElementById("statusMensagem");

        if (status) {
            status.textContent =
                "Não foi possível conectar ao Firebase.";
        }

    });


/* =========================
   SURPRESA
========================= */

function mostrarMensagem() {

    const mensagem =
        document.getElementById("mensagem");

    if (!mensagem) return;

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


/* =========================
   ENVIAR MENSAGEM
========================= */

async function enviarMensagem() {

    const campo =
        document.getElementById("mensagemMaysa");

    const status =
        document.getElementById("statusMensagem");

    if (!campo || !status) return;

    const texto = campo.value.trim();

    if (texto === "") {

        status.textContent =
            "Escreva uma mensagem primeiro. ♥";

        return;
    }

    status.textContent = "Enviando...";

    try {

        await addDoc(
            collection(db, "messages"),
            {
                text: texto,
                createdAt: serverTimestamp()
            }
        );

        campo.value = "";

        status.textContent =
            "Mensagem enviada. ♥";

        setTimeout(() => {

            status.textContent = "";

        }, 3000);

    } catch (erro) {

        console.error(
            "Erro ao enviar mensagem:",
            erro
        );

        status.textContent =
            "Não foi possível enviar a mensagem.";
    }
}


/* =========================
   CARREGAR MENSAGENS
========================= */

function carregarMensagens() {

    const lista =
        document.getElementById("listaMensagens");

    if (!lista) return;

    const mensagensRef =
        collection(db, "messages");

    onSnapshot(
        mensagensRef,

        (snapshot) => {

            lista.innerHTML = "";

            if (snapshot.empty) {

                lista.textContent =
                    "Nenhuma mensagem ainda.";

                return;
            }

            const mensagens = [];

            snapshot.forEach((doc) => {

                const dados = doc.data();

                mensagens.push({
                    id: doc.id,
                    text: dados.text || "",
                    createdAt: dados.createdAt
                });

            });


            mensagens.sort((a, b) => {

                const tempoA =
                    a.createdAt?.toMillis?.() || 0;

                const tempoB =
                    b.createdAt?.toMillis?.() || 0;

                return tempoB - tempoA;

            });


            mensagens.forEach((item) => {

                const div =
                    document.createElement("div");

                div.className =
                    "mensagem-enviada";


                const cabecalho =
                    document.createElement("div");

                cabecalho.className =
                    "mensagem-cabecalho";


                const coracao =
                    document.createElement("div");

                coracao.className =
                    "mensagem-coracao";

                coracao.textContent = "♥";


                const informacoes =
                    document.createElement("div");


                const nome =
                    document.createElement("div");

                nome.className =
                    "mensagem-nome";

                nome.textContent = "Você";


                const hora =
                    document.createElement("div");

                hora.className =
                    "mensagem-hora";

                hora.textContent =
                    "Mensagem enviada";


                informacoes.appendChild(nome);
                informacoes.appendChild(hora);


                cabecalho.appendChild(coracao);
                cabecalho.appendChild(informacoes);


                const texto =
                    document.createElement("div");

                texto.className =
                    "mensagem-texto";

                texto.textContent =
                    item.text;


                div.appendChild(cabecalho);
                div.appendChild(texto);

                lista.appendChild(div);

            });

        },

        (erro) => {

            console.error(
                "Erro ao carregar mensagens:",
                erro
            );

            lista.textContent =
                "Não foi possível carregar as mensagens.";

        }
    );
}


/* =========================
   🎮 JOGO
========================= */

const perguntasQuiz = [

    {
        pergunta:
            "Qual é o nome da pessoa para quem este cantinho foi feito?",

        opcoes: [
            "Maysa",
            "Mariana",
            "Maria",
            "Manuela"
        ],

        correta: 0
    },

    {
        pergunta:
            "Qual símbolo aparece bastante neste site?",

        opcoes: [
            "♥ Coração",
            "☀ Sol",
            "★ Estrela",
            "☁ Nuvem"
        ],

        correta: 0
    },

    {
        pergunta:
            "Quantas partes numeradas existem no site?",

        opcoes: [
            "3",
            "4",
            "5",
            "8"
        ],

        correta: 2
    },

    {
        pergunta:
            "O que pode ser deixado no espaço especial de mensagens?",

        opcoes: [
            "Uma mensagem",
            "Uma senha",
            "Um endereço",
            "Nada"
        ],

        correta: 0
    },

    {
        pergunta:
            "Qual é a ideia principal deste cantinho?",

        opcoes: [
            "Guardar palavras e momentos especiais",
            "Ensinar matemática",
            "Vender produtos",
            "Mostrar notícias"
        ],

        correta: 0
    }

];


let perguntaAtual = 0;
let pontosQuiz = 0;


/* INICIAR */

function iniciarQuiz() {

    perguntaAtual = 0;
    pontosQuiz = 0;

    const botao =
        document.getElementById("quizBotao");

    const resultado =
        document.getElementById("quizResultado");

    if (botao) {
        botao.style.display = "none";
    }

    if (resultado) {
        resultado.textContent = "";
    }

    mostrarPerguntaQuiz();
}


/* MOSTRAR PERGUNTA */

function mostrarPerguntaQuiz() {

    const pergunta =
        perguntasQuiz[perguntaAtual];

    const perguntaElemento =
        document.getElementById("quizPergunta");

    const opcoesElemento =
        document.getElementById("quizOpcoes");

    const progresso =
        document.getElementById("quizProgresso");


    if (!perguntaElemento ||
        !opcoesElemento ||
        !progresso) {

        return;
    }


    progresso.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntasQuiz.length}`;


    perguntaElemento.textContent =
        pergunta.pergunta;


    opcoesElemento.innerHTML = "";


    pergunta.opcoes.forEach(
        (opcao, indice) => {

            const botao =
                document.createElement("button");

            botao.className =
                "quiz-opcao";

            botao.textContent =
                opcao;


            botao.addEventListener(
                "click",
                () => {

                    responderQuiz(indice);

                }
            );


            opcoesElemento.appendChild(botao);

        }
    );
}


/* RESPONDER */

function responderQuiz(indice) {

    const pergunta =
        perguntasQuiz[perguntaAtual];


    if (indice === pergunta.correta) {

        pontosQuiz++;

    }


    perguntaAtual++;


    if (
        perguntaAtual <
        perguntasQuiz.length
    ) {

        mostrarPerguntaQuiz();

    } else {

        finalizarQuiz();

    }
}


/* FINAL */

function finalizarQuiz() {

    const perguntaElemento =
        document.getElementById("quizPergunta");

    const opcoesElemento =
        document.getElementById("quizOpcoes");

    const progresso =
        document.getElementById("quizProgresso");

    const resultado =
        document.getElementById("quizResultado");

    const botao =
        document.getElementById("quizBotao");


    opcoesElemento.innerHTML = "";


    progresso.textContent =
        "Fim do jogo ♥";


    perguntaElemento.textContent =
        "Você chegou ao final!";


    if (pontosQuiz === 5) {

        resultado.textContent =
            "💖 5/5! Você conhece muito bem este cantinho!";

    } else if (pontosQuiz >= 3) {

        resultado.textContent =
            `💕 ${pontosQuiz}/5! Você foi muito bem!`;

    } else {

        resultado.textContent =
            `♥ ${pontosQuiz}/5! Valeu pela tentativa!`;

    }


    botao.textContent =
        "Jogar novamente ♥";

    botao.style.display =
        "inline-block";
}


/* =========================
   BOTÃO DO JOGO
========================= */

const botaoQuiz =
    document.getElementById("quizBotao");

if (botaoQuiz) {

    botaoQuiz.addEventListener(
        "click",
        iniciarQuiz
    );

}


/* =========================
   DEIXAR FUNÇÕES DISPONÍVEIS
========================= */

window.enviarMensagem =
    enviarMensagem;

window.mostrarMensagem =
    mostrarMensagem;
