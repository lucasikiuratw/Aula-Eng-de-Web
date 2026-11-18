function executar(evento) {
  evento.preventDefault();
  limparForm();
  if (!validarForm()) {
    return;
  }

  chamarApi();
}

async function chamarApi() {
  const dados = {
    nome: document.querySelector("#nome").value,
    idade: Number(document.querySelector("#idade").value),
    celular: document
      .querySelector("#celular")
      .value.replace(/\D/g, "")
      .slice(0, 11),
    email: document.querySelector("#email").value,
    cpf: document.querySelector("#cpf").value.replace(/\D/g, ""),
    cep: document.querySelector("#cep").value.replace(/\D/g, ""),
    cidade: document.querySelector("#cidade").value.trim(),
    estado: document.querySelector("#estado").value.trim().toUpperCase(),
    curso: document.querySelector("#curso").value.trim(),
    matricula: document.querySelector("#matricula").value.trim(),
  };

  try {
    const resposta = await fetch("https://postman-echo.com/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
    }

    const resultado = await resposta.json();
    alert(`Cadastro realizado com sucesso, ${resultado.json.email}!`);
  } catch (erro) {
    alert("Não foi possível enviar o cadastro: " + erro.message);
  }
}

function validarForm() {
  const nome = document.querySelector("#nome").value;
  const erroNome = document.querySelector("#erro-nome");
  if (nome.trim() === "") {
    erroNome.textContent = "Nome não pode estar vazio!";
    erroNome.classList.add("erro");
    erroNome.classList.remove("oculto");
  }

  const idade = document.querySelector("#idade").value;
  const erroIdade = document.querySelector("#erro-idade");
  if (idade === "") {
    erroIdade.textContent = "Idade não pode estar vazio!";
    erroIdade.classList.add("erro");
    erroIdade.classList.remove("oculto");
  } else if (!Number.isInteger(Number(idade)) || Number(idade) < 18) {
    erroIdade.textContent = "É necessário ter 18 anos!";
    erroIdade.classList.add("erro");
    erroIdade.classList.remove("oculto");
  }

  // Validar o email com regex (desafio da aula)
  const email = document.querySelector("#email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarErro("email", "Digite um e-mail válido!");
  }

  const celular = document.querySelector("#celular").value.replace(/\D/g, "");
  if (celular.length !== 11) {
    mostrarErro("celular", "Digite um celular com DDD e 11 números!");
  }

  const cpf = document.querySelector("#cpf").value.replace(/\D/g, "");
  if (cpf.length !== 11) {
    mostrarErro("cpf", "Digite um CPF com 11 números!");
  }

  const cep = document.querySelector("#cep").value.replace(/\D/g, "");
  if (cep.length !== 8) {
    mostrarErro("cep", "Digite um CEP com 8 números!");
  }

  for (const campo of ["cidade", "curso", "matricula"]) {
    if (document.querySelector(`#${campo}`).value.trim() === "") {
      mostrarErro(campo, "Este campo é obrigatório!");
    }
  }

  const estado = document.querySelector("#estado").value.trim();
  if (!/^[a-zA-Z]{2}$/.test(estado)) {
    mostrarErro("estado", "Digite a sigla do estado com 2 letras!");
  }

  const termos = document.querySelector("#termos");
  const erroTermos = document.querySelector("#erro-termos");
  if (!termos.checked) {
    erroTermos.textContent = "É preciso aceitar os termos!";
    erroTermos.classList.add("erro");
    erroTermos.classList.remove("oculto");
  }

  const concluido = document.querySelector("#concluido");
  const valido = document.querySelectorAll(".erro").length === 0;

  if (!valido) {
    concluido.textContent = "Corrija os erros antes de prosseguir!";
    concluido.classList.add("erro");
    concluido.classList.remove("oculto");
  }

  return valido;
}

//() => {} arrow function
function limparForm() {
  document.querySelectorAll(".erro").forEach((item) => {
    item.classList.remove("erro");
    item.classList.add("oculto");
  });
  document.querySelector("#concluido").classList.add("oculto");
}

function mascararCelular(evento) {
  const campo = evento.target;

  const numeros = campo.value.replace(/\D/g, "").slice(0, 11);

  const ddd = numeros.slice(0, 2);
  const inicio = numeros.slice(2, 7);
  const fim = numeros.slice(7);

  if (numeros.length > 7) {
    campo.value = `(${ddd}) ${inicio}-${fim}`;
  } else if (numeros.length > 2) {
    campo.value = `(${ddd}) ${inicio}`;
  } else if (numeros.length > 0) {
    campo.value = `(${ddd}`;
  } else {
    campo.value = "";
  }
}


// Exibir erros usando as mesmas classes do exemplo do professor
function mostrarErro(campo, mensagem) {
  const erro = document.querySelector(`#erro-${campo}`);
  erro.textContent = mensagem;
  erro.classList.add("erro");
  erro.classList.remove("oculto");
}

function mascararCpf(evento) {
  const numeros = evento.target.value.replace(/\D/g, "").slice(0, 11);
  evento.target.value = numeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function mascararCep(evento) {
  const numeros = evento.target.value.replace(/\D/g, "").slice(0, 8);
  evento.target.value = numeros.replace(/^(\d{5})(\d)/, "$1-$2");
}
