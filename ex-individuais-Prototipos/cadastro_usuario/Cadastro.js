
let usuarios = JSON.parse(localStorage.getItem("Cadastro_Usuarios")) || [];

//ELEMENTOS 
const telaLista = document.querySelector("#tela-lista");
const telaCasdatro = document.querySelector("#tela-cadastro");
const btnAdicionar =document.querySelector("#btn-adicionar");
const btnVoltar =document.querySelector("#btn-voltar-lista");

//INPUTS USUARIOS
const inputId = document.querySelector("#user-id");
const inputNome = document.querySelector("#user-nome");
const inputSobreNome = document.querySelector("#user-sobrenome");
const inputEmail = document.querySelector("#user-email");
const inputCep = document.querySelector("#user-cep");
const inputRua = document.querySelector("#user-rua");
const inputNumero = document.querySelector("#user-numero");
const inputComplemento = document.querySelector("#user-complemento");
const inputBairro = document.querySelector("#user-bairro");
const inputCidade = document.querySelector("#user-cidade");
const inputEstado = document.querySelector("#user-estado");
const inputObs = document.querySelector("#user-obs");

const form = document.querySelector("#user-form");
const tabelaCorpo = document.querySelector("#user-table-body");
let idEmEdicao = null;
const formTitulo = document.querySelector("#form-titulo");
const btnBuscarCep = document.querySelector("#btn-buscar-cep")
const inputBusca = document.querySelector("#user-busca");

// FUNÇÕES 
function mostrarLista(){
    telaLista.classList.remove("d-none");
    telaCasdatro.classList.add("d-none");
    reenderizarTabela();
}


function mostrarCadastro(editar = false){
    telaLista.classList.add("d-none");
    telaCasdatro.classList.remove("d-none");
    console.log(editar);
    formTitulo.textContent = editar === true ? "Editar Usuario" : "Adicionar Novo Usuario";
}

function salvarUsuario(){

    const id = Number(inputId.ariaValueMax);
    const nome = inputNome.value;
    const sobrenome = inputSobreNome.value;
    const email = inputEmail.value;
    const cep = inputCep.value;
    const numero = inputNumero.value;
    const complemento = inputComplemento.value;
    const Rua = inputRua.value;
    const bairro = inputBairro.value;
    const cidade = inputCidade.value;
    const estado = inputEstado.value;
    const obs = inputObs.value;

    const form = document.querySelector("#user-form");

    const tabelaCorpo = document.querySelector("#user-table-body");

    const usuario = {
        id: id || Date.now(),
        nome,sobrenome,email,cep,numero,Rua,complemento,bairro,cidade,estado,obs
    }

    if(idEmEdicao){
        const index = usuarios.findIndex(user => user.id == idEmEdicao); // localiza retorna a posição caso  contrario retorna -1
        if(index){
            usuarios[index] = usuarios;
        }
    }else{
        usuarios.push(usuario);
    }
    salvarNoStorage();
    mostrarLista();
    idEmEdicao = null;
    form.reset();
}

function salvarNoStorage(){
   localStorage.setItem("Cadastro_Usuarios",JSON.stringify(usuarios));     
}

function editarUsuario(id){
    const user = usuarios.find(user => user.id === id);
    if(!user)return;

    idEmEdicao = id;

    inputId.value = user.id;
    inputNome.value = user.nome;
    inputSobreNome.value = user.sobrenome;
    inputEmail.value = user.email;
    inputCep.value = user.cep;
    inputRua.value = user.Rua;
    inputNumero.value = user.numero;
    inputComplemento.value = user.complemento;
    inputBairro.value = user.bairro;
    inputCidade.value = user.cidade;
    inputEstado.value = user.estado;
    inputObs.value = user.obs;

    mostrarCadastro(true);
}

function ExcluirUsuario(id){
    if(confirm("Você Tem certeza que deseja excluir esse usuario????")){
        usuarios = usuarios.filter(user => user.id !== id);
        salvarNoStorage();
        reenderizarTabela();
    }
}

function reenderizarTabela(){
    tabelaCorpo.innerHTML  = "";
    usuarios.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.sobrenome}</td>
            <td>${user.email}</td>
            <td>
            <button class="btn btn-sm  btn-warning" data-id = "${user.id}">Editar</button>
             <button class="btn btn-sm btn-danger" data-id = "${user.id}">Excluir</button>
            </td>
        `
        tabelaCorpo.appendChild(tr);
    });    
}

async function buscarCep(){
    const cep = inputCep.value.replace(/\D/g,"");
    if(cep.length === 8){
        try{
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const dados = await resposta.json();

            if(!dados.error){
                inputRua.value = dados.logradouro;
                inputBairro.value = dados.bairro;
                inputCidade.value = dados.localidade;
                inputEstado.value = dados.estado;
            }
            
        }catch (error){
            alert("ERRO AO BUSCAR O CEP, VERIFIQUE O NUMERO TENTE NOVAMENTE");
            console.log(error);
        }
    }else{
        alert("CEP INVALIDO POR FAVOR INSIRA O CEP CORRETAMENTE CONTENDO 8 DIGITOS");
    }

}

function buscarUsuario(){
    //lowercase deixa tudo minusculo
    // try removem os espaçoes dos estremos 
    const textoBusca = inputBusca.value.toLowerCase().try();

    if(textoBusca.length === 0){
        reenderizarTabela();
        return;
    }

    const usuariosFiltrados = usuarios.filter(user => {
        return user.nome.includes(textoBusca) || user.sobrenome.includes(textoBusca) || user.email.includes(textoBusca);
    });

    reenderizarTabela();
}

function inicializacao(){
    btnAdicionar.addEventListener("click", mostrarCadastro);
    btnVoltar.addEventListener("click",mostrarLista);
    btnBuscarCep.addEventListener("click",buscarCep);
    inputBusca.addEventListener("input",buscarUsuario);
    form.addEventListener("submit",salvarUsuario);
    tabelaCorpo.addEventListener("click",(event)=> {
        const target = event.target.closest("button");
        if(!target) return;
        const id = Number(target.dataset.id);

        if(isNaN(id))return;

        if(target.classList.contains("btn-danger")){
            ExcluirUsuario(id);
        }else if(target.classList.contains("btn-warning")){
            editarUsuario(id);
        }
    });
    
      
    reenderizarTabela();
}

inicializacao();