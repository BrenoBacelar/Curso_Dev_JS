// Regras de Negócio (RN)
// Preço por Página: R$ 500,00
// Custo Adicional de Design: R$ 1.000,00
// Taxa de Urgência:
//    - Se o prazo for menor que 5 dias: 10% sobre o valor base (páginas + design).
//    - Se o prazo for menor que 15 dias: 5% sobre o valor base (páginas + design).
//    - Se for 15 dias ou mais, a taxa é zero.
// Desconto: O desconto percentual é aplicado sobre a soma de todos os custos únicos (páginas + design + taxa de urgência).

const rnPrecoPorPagina = 500;
const rnPrecoAdicionalDesing = 1000;

document.querySelector(".seu-nome").textContent = "Lucas Torquato";

const inputPaginas = document.querySelector("#qtd-paginas");
const inputPrazo = document.querySelector("#prazo-entrega");
const inputDesconto = document.querySelector("#desconto");
const checkboxDesign = document.querySelector("#inclui-design");

const resumoSubtotal = document.querySelector("#resumo-subtotal");
const resumoAdicional = document.querySelector("#resumo-adicional");
const resumoUrgencia = document.querySelector("#resumo-urgencia");
const resumoDesconto = document.querySelector("#resumo-desconto");
const resumoTotal = document.querySelector("#resumo-total");

const calcularSubtotal = (quantidade) => quantidade * rnPrecoPorPagina; // numero de paginas vezes os 500 reais
function calcularTaxaDeUrgencia(prazo,valor){
    if (prazo >0 && prazo < 5) {
       return valor * 0,1;
    } else if (prazo >= 5 && prazo < 15) {
        return valor * 0.05;
    } else {
        return 0;
    }
}

const calcularValorDesconto = (valor,porcentagem) => valor * (porcentagem / 100);

function gerarValorTotal(){
    const qtdPaginas = Number (inputPaginas.value);
    const prazo = Number (inputPrazo.value);
    const PCdesconto = Number (inputDesconto.value);
    const incluirDesing = checkboxDesign.checked;


    const subtotal = calcularSubtotal(qtdPaginas);
    const valorDesign = incluirDesing ? rnPrecoAdicionalDesing : 0;

    const taxaUrgencia = calcularTaxaDeUrgencia(prazo,(subtotal+valorDesign));

    const valorDesconto = calcularValorDesconto((subtotal + valorDesign + taxaUrgencia),PCdesconto);

    const total = (subtotal + valorDesign + taxaUrgencia + valorDesconto);

    const formatarValor = valor =>{
       return valor.toLocaleString("pr-BR",{
            style: "currency",
            currency: "BRL"
        })
    }

    resumoSubtotal.textContent = formatarValor (subtotal);
    resumoAdicional.textContent = formatarValor (valorDesign);
    resumoUrgencia.textContent = formatarValor (taxaUrgencia);
    resumoDesconto.textContent = formatarValor (valorDesconto);
    resumoTotal.textContent = formatarValor (total);
}
const todosInputs = [inputPaginas,inputPrazo,inputDesconto,checkboxDesign];
todosInputs.forEach(input => {
    input.addEventListener('input', gerarValorTotal);
});

document.addEventListener('DOMContentLoaded',gerarValorTotal);
