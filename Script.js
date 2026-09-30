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


// ===============================
// CONFIGURAÇÃO DO FIREBASE
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyCH643YK8iRy24JS2mBnlb_dc9Y83JSTsQ",
    authDomain: "site-romantico-663fb.firebaseapp.com",
    projectId: "site-romantico-663fb",
    storageBucket: "site-romantico-663fb.firebasestorage.app",
    messagingSenderId: "768746563580",
    appId: "1:768746563580:web:a61ab53f59f8214aa97479"
};


// ===============================
// INICIAR FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);


// ===============================
// AUTENTICAÇÃO ANÔNIMA
// ===============================

signInAnonymously(auth)
    .then(() => {
        console.log("Firebase conectado.");

        carregarMensagens();
    })
    .catch((erro) => {
        console.error("Erro na autenticação:", erro);

        const status = document.getElementById("statusMensagem");

        if (status) {
            status.textContent = "Não foi possível conectar ao Firebase.";
        }
    });


// ===============================
// SURPRESA
// ===============================

function mostrarMensagem() {

    const mensagem = document.getElementById("mensagem");

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


// ===============================
// ENVIAR MENSAGEM
// ===============================

async function enviarMensagem() {

    const campo = document.getElementById("mensagemMaysa");
    const status = document.getElementById("statusMensagem");

    if (!campo || !status) return;

    const texto = campo.value.trim();

    if (texto === "") {

        status.textContent = "Escreva uma mensagem primeiro. ♥";

        return;
    }

    status.textContent = "Enviando...";

    try {

        await addDoc(collection(db, "messages"), {

            text: texto,

            createdAt: serverTimestamp()

        });

        campo.value = "";

        status.textContent = "Mensagem enviada. ♥";

        setTimeout(() => {

            status.textContent = "";

        }, 3000);

    } catch (erro) {

        console.error("Erro ao enviar mensagem:", erro);

        status.textContent =
            "Não foi possível enviar a mensagem.";

    }
}


// ===============================
// CARREGAR MENSAGENS
// ===============================

function carregarMensagens() {

    const lista = document.getElementById("listaMensagens");

    if (!lista) return;


    const mensagensRef = collection(db, "messages");


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


            // Mais recentes primeiro
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

                div.textContent =
                    item.text;

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


// ===============================
// IMPORTANTE
// ===============================
// Como o seu HTML usa onclick="...",
// precisamos deixar essas funções
// disponíveis para o HTML.
// ===============================

window.enviarMensagem = enviarMensagem;

window.mostrarMensagem = mostrarMensagem;
