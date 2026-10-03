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

signInAnonymously(auth).catch((erro) => {

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

    usuarioLogado = !!usuario;

    if (usuario) {
        carregarMensagens();
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

window.enviarMensagem =
    enviarMensagem;


// ======================================================
// ======================= JOGO ==========================
// ======================================================


        const perguntasJogo = [

    {
        pergunta:
            "Qual planeta do Sistema Solar possui rotação retrógrada, girando em sentido contrário ao da maioria dos outros planetas?",

        opcoes:
            ["Marte", "Vênus", "Júpiter", "Mercúrio"],

        correta: 1
    },

    {
        pergunta:
            "Qual é o único país completamente cercado pelo território da África do Sul?",

        opcoes:
            ["Botsuana", "Lesoto", "Eswatini", "Namíbia"],

        correta: 1
    },

    {
        pergunta:
            "Qual elemento químico possui número atômico 26?",

        opcoes:
            ["Cobre", "Ferro", "Zinco", "Níquel"],

        correta: 1
    },

    {
        pergunta:
            "Em que ano foi assinado o Tratado de Tordesilhas?",

        opcoes:
            ["1492", "1494", "1500", "1517"],

        correta: 1
    },

    {
        pergunta:
            "Qual é a capital do Cazaquistão?",

        opcoes:
            ["Almaty", "Tashkent", "Astana", "Bishkek"],

        correta: 2
    },

    {
        pergunta:
            "Qual camada da atmosfera contém a maior concentração de ozônio?",

        opcoes:
            ["Troposfera", "Estratosfera", "Mesosfera", "Exosfera"],

        correta: 1
    },

    {
        pergunta:
            "Qual foi a civilização responsável pela criação do sistema de escrita conhecido como cuneiforme?",

        opcoes:
            ["Egípcios", "Romanos", "Sumérios", "Gregos"],

        correta: 2
    },

    {
        pergunta:
            "Qual é o resultado de 17²?",

        opcoes:
            ["279", "289", "297", "307"],

        correta: 1
    },

    {
        pergunta:
            "Qual é o maior vulcão conhecido do Sistema Solar?",

        opcoes:
            ["Etna", "Mauna Loa", "Olympus Mons", "Krakatoa"],

        correta: 2
    },

    {
        pergunta:
            "Quem escreveu a obra 'O Príncipe'?",

        opcoes:
            [
                "Maquiavel",
                "Platão",
                "Aristóteles",
                "Dante Alighieri"
            ],

        correta: 0
    },

    {
        pergunta:
            "Qual protocolo é tradicionalmente associado ao código de erro 404 na internet?",

        opcoes:
            ["FTP", "HTTP", "SMTP", "DNS"],

        correta: 1
    },

    {
        pergunta:
            "Qual organela celular é conhecida principalmente por produzir ATP através da respiração celular?",

        opcoes:
            ["Ribossomo", "Lisossomo", "Mitocôndria", "Complexo de Golgi"],

        correta: 2
    },

    {
        pergunta:
            "Qual artista pintou a obra 'Guernica'?",

        opcoes:
            ["Salvador Dalí", "Pablo Picasso", "Van Gogh", "Claude Monet"],

        correta: 1
    },

    {
        pergunta:
            "Qual é aproximadamente a aceleração da gravidade na superfície da Terra?",

        opcoes:
            ["2,8 m/s²", "5,4 m/s²", "9,8 m/s²", "15,2 m/s²"],

        correta: 2
    },

    {
        pergunta:
            "Qual destes países NÃO possui território banhado pelo Mar Mediterrâneo?",

        opcoes:
            ["Itália", "Grécia", "Portugal", "Espanha"],

        correta: 2
    },

    {
        pergunta:
            "Se todos os Bloops são Razzies e nenhum Razzie é Lazzie, o que podemos concluir?",

        opcoes:
            [
                "Todo Bloop é Lazzie",
                "Nenhum Bloop é Lazzie",
                "Todo Lazzie é Bloop",
                "Alguns Bloops são Lazzies"
            ],

        correta: 1
    },

    {
        pergunta:
            "Qual é o número mínimo de movimentos necessários para resolver a Torre de Hanói com 3 discos?",

        opcoes:
            ["5", "6", "7", "8"],

        correta: 2
    },

    {
        pergunta:
            "Qual destes números é divisível simultaneamente por 3, 4 e 5?",

        opcoes:
            ["40", "50", "60", "70"],

        correta: 2
    },

    {
        pergunta:
            "Na Segunda Guerra Mundial, qual país foi invadido pela Alemanha em 1939, dando início ao conflito na Europa?",

        opcoes:
            ["França", "Polônia", "Bélgica", "Noruega"],

        correta: 1
    },

    {
        pergunta:
            "Um relógio marca exatamente 3 horas. Qual é o menor ângulo entre os ponteiros?",

        opcoes:
            ["60°", "90°", "120°", "180°"],

        correta: 1
    }

];


// ======================================================
// VARIÁVEIS DO JOGO
// ======================================================

let perguntaAtual = 0;
let pontos = 0;


// ======================================================
// ELEMENTOS DO JOGO
// ======================================================

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


// ======================================================
// COMEÇAR JOGO
// ======================================================

function iniciarQuiz() {

    perguntaAtual = 0;
    pontos = 0;

    if (quizResultado) {

        quizResultado.textContent =
            "";

    }

    if (quizBotao) {

        quizBotao.style.display =
            "none";

    }

    mostrarPergunta();

}


// ======================================================
// MOSTRAR PERGUNTA
// ======================================================

function mostrarPergunta() {

    if (
        !quizPergunta ||
        !quizOpcoes ||
        !quizProgresso
    ) {

        return;

    }

    const pergunta =
        perguntasJogo[perguntaAtual];

    if (!pergunta) {

        finalizarJogo();

        return;

    }

    quizProgresso.innerHTML =
        `Pergunta ${perguntaAtual + 1} de ${perguntasJogo.length}
        <br>
        ⭐ Pontos: ${pontos}`;

    quizPergunta.textContent =
        pergunta.pergunta;

    quizOpcoes.innerHTML =
        "";

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

                    responder(indice);

                }
            );

            quizOpcoes.appendChild(
                botao
            );

        }
    );

}


// ======================================================
// RESPONDER
// ======================================================

function responder(indice) {

    const pergunta =
        perguntasJogo[perguntaAtual];

    if (!pergunta) return;

    const botoes =
        document.querySelectorAll(
            ".quiz-opcao"
        );

    botoes.forEach(
        (botao) => {

            botao.disabled =
                true;

        }
    );

    if (indice === pergunta.correta) {

        pontos++;

        if (botoes[indice]) {

            botoes[indice].classList.add(
                "correta"
            );

        }

        if (quizResultado) {

            quizResultado.textContent =
                "✓ Acertou!";

        }

    } else {

        if (botoes[indice]) {

            botoes[indice].classList.add(
                "errada"
            );

        }

        if (botoes[pergunta.correta]) {

            botoes[
                pergunta.correta
            ].classList.add(
                "correta"
            );

        }

        if (quizResultado) {

            quizResultado.textContent =
                "✕ Errou!";

        }

    }

    setTimeout(
        () => {

            perguntaAtual++;

            if (quizResultado) {

                quizResultado.textContent =
                    "";

            }

            if (
                perguntaAtual <
                perguntasJogo.length
            ) {

                mostrarPergunta();

            } else {

                finalizarJogo();

            }

        },
        1200
    );

}


// ======================================================
// FINAL DO JOGO
// ======================================================

function finalizarJogo() {

    if (quizOpcoes) {

        quizOpcoes.innerHTML =
            "";

    }

    if (quizProgresso) {

        quizProgresso.innerHTML =
            "🏁 Fim do desafio!";

    }

    if (quizPergunta) {

        quizPergunta.innerHTML = `
            Você acertou
            <strong>${pontos}</strong>
            de
            <strong>${perguntasJogo.length}</strong>
            perguntas.

            <br><br>

            ${mensagemFinal()}
        `;

    }

    if (quizResultado) {

        quizResultado.textContent =
            "";

    }

    if (quizBotao) {

        quizBotao.textContent =
            "Jogar novamente ♥";

        quizBotao.style.display =
            "inline-block";

    }

}


// ======================================================
// MENSAGEM FINAL
// ======================================================

function mensagemFinal() {

    if (pontos === 20) {

        return "🏆 PERFEITO! Você acertou todas!";

    }

    if (pontos >= 16) {

        return "🔥 Excelente! Esse desafio não foi fácil.";

    }

    if (pontos >= 12) {

        return "🧠 Muito bom! Você foi longe.";

    }

    if (pontos >= 8) {

        return "👏 Bom resultado! Algumas pegadinhas venceram.";

    }

    return "😈 As pegadinhas venceram dessa vez!";

}


// ======================================================
// BOTÃO DO JOGO
// ======================================================

if (quizBotao) {

    quizBotao.addEventListener(
        "click",
        iniciarQuiz
    );

}


// ======================================================
// =================== MODO NOTURNO ======================
// ======================================================

const botaoNoturno =
    document.getElementById(
        "botaoNoturno"
    );

if (
    localStorage.getItem(
        "modoNoturno"
    ) === "ativado"
) {

    document.body.classList.add(
        "modo-noturno"
    );

    if (botaoNoturno) {

        botaoNoturno.textContent =
            "☀️";

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
// ================= FRASES ALEATÓRIAS ===================
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

if (
    botaoFraseAleatoria &&
    fraseAleatoria
) {

    botaoFraseAleatoria.addEventListener(
        "click",
        () => {

            const indice =
                Math.floor(
                    Math.random() *
                    frasesAleatorias.length
                );

            fraseAleatoria.style.opacity =
                "0";

            setTimeout(
                () => {

                    fraseAleatoria.textContent =
                        frasesAleatorias[indice];

                    fraseAleatoria.style.opacity =
                        "1";

                },
                200
            );

        }
    );

}


// ======================================================
// ==================== CARTA DIGITAL ====================
// ======================================================

const botaoCarta =
    document.getElementById(
        "botaoCarta"
    );

const cartaConteudo =
    document.getElementById(
        "cartaConteudo"
    );

if (
    botaoCarta &&
    cartaConteudo
) {

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
// ================= CORAÇÕES AO TOCAR ===================
// ======================================================

document.addEventListener(
    "click",
    (evento) => {

        if (
            evento.target.closest("button") ||
            evento.target.closest("textarea") ||
            evento.target.closest("input")
        ) {

            return;

        }

        const coracao =
            document.createElement(
                "span"
            );

        coracao.className =
            "coracao-toque";

        coracao.textContent =
            "♥";

        coracao.style.left =
            `${evento.clientX}px`;

        coracao.style.top =
            `${evento.clientY}px`;

        document.body.appendChild(
            coracao
        );

        setTimeout(
            () => {

                coracao.remove();

            },
            1200
        );

    }
);
