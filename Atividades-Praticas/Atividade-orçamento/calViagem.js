

document.querySelector(".seu-nome").textContent = "Breno Bacelar";

const inputDistancia = document.querySelector("#km-distancia");
const inputConsumo = document.querySelector("#km-consumo");
const inputCombustivel = document.querySelector("#preco-combustivel");
const inputPessoa = document.querySelector("#custo-pessoa");

const resumoPessoa = document.querySelector("#resumo-pessoa");
const resumoTotal = document.querySelector("#resumo-total");

const litrosNecessarios = (distancia,consumo) => distancia / consumo;

const calcularCombustivel = (valor,litros) => valor * litros;

const CustoPorPessoa = (custo,viajantes) => custo / viajantes;

function gerarValorTotal(){
    const KMdistancia = Number (inputDistancia.value);
    const TXConsumo = Number (inputConsumo.value);
    const Combustivel = Number (inputCombustivel.value);
    const Pessoa = Number (inputPessoa.value);
    
    const litros = litrosNecessarios (KMdistancia,TXConsumo);
    const valor = calcularCombustivel (TXConsumo,litros);
    const CPessoa = CustoPorPessoa (CPessoa,valor);
     
    const VCombustivel = calcularValorCombustivel((VCombustivel + KMdistancia + TXConsumo),Pessoa);

    const total = (KMdistancia + TXConsumo + Combustivel + Pessoa);

    const formatarValor = valor =>{
       return valor.toLocaleString("pr-BR",{
            style: "currency",
            currency: "BRL"
        })
    }

    resumoDistancia.textContent = formatarValor (Distancia);
    resumoConsumo.textContent = formatarValor (TXConsumo);
    resumoCombustivel.textContent = formatarValor (Combustivel);
    resumoPessoa.textContent = formatarValor (Pessoa);
    resumoTotal.textContent = formatarValor (total);
}
const todosInputs = [inputDistancia,inputConsumo,inputCombustivel,inputPessoa];
todosInputs.forEach(input => {
    input.addEventListener('input', gerarValorTotal);
});

document.addEventListener('DOMContentLoaded',gerarValorTotal);
