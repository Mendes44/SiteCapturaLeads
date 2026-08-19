console.log("JS Carregado!!!");

const formulario = document.getElementById("leadForm");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("myButton");

formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;

  const dadosLead = {
    nome: nome.trim(),
    telefone: telefone.trim(),
    email: email.trim().toLowerCase(),
  };
  console.log("Dados Enviados", dadosLead);

  //Bloqueia o botão enquanto a requisição e realizada
  botao.disabled = true;
  botao.textContent = "Enviando...";

  mensagem.textContent = "";

  try {
    const resposta = await fetch(
      "https://voxrjndqnzlsjitnhgrx.supabase.co/rest/v1/LEADS",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          apiKey: "sb_publishable_9TF-N8EGJ3VRm_t11k_l8w_8Nuljlc5",
        },

        body: JSON.stringify(dadosLead),
      },
    );

    console.log("Status", resposta.status);

    if (resposta.ok) {
      mensagem.textContent = "Cadastro enviado com Sucesso!";
      mensagem.style.color = "green";

      //Limpa Formulario
      formulario.reset();
    } else {
      const erro = await resposta.json();

      console.log("Erro retornado: ", erro);

      if (erro.code === "23505") {
        mensagem.textContent = "Este e-mail ja está cadastrado.";
      } else {
        mensagem.textContent =
          "Não foi possivel realizar o cadastro, tente novamente!";
      }

      mensagem.style.color = "red";
    };
  } catch (erro) {
    console.log("Erro de Conexão", erro);

    mensagem.textContent = "Não foi possivel conectar ao servidor";
    mensagem.style.color = "red";
  } finally {
    //Aqui acontece tanto com erro ou sem erro
    botao.disabled = false;
    botao.textContent = "Cadastrar";
  }
});

//Teste para capturar os dados no local
// formulario.addEventListener("submit", function(evento){
//     evento.preventDefault();

//     console.log('Formulario enviado!');

//     const nome = document.getElementById("nome").value;
//     const telefone = document.getElementById("telefone").value;
//     const email = document.getElementById("email").value;

//     const dadosLead = {
//         nome: nome.trim(),
//         telefone: telefone.trim(),
//         email: email.trim().toLowerCase()
//     };

//     console.log(dadosLead);
//     mensagem.textContent = "Dados Capturados Com Sucesso!"
//     mensagem.style.color = 'green'

// });
