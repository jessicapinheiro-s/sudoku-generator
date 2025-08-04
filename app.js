function sortearNumero() {
    return Math.floor(Math.random() * 9) + 1;
}
var matriz = [];
function gerarNumeroSemDuplicata(arr) {
    var numeroGer = null;
    while (numeroGer == null) {
        var num = sortearNumero();
        //cuida para que não gere numeros dupicados horizontalmente em qualquer posição na linha
        if (!arr.includes(num)) {
            numeroGer = num;
            break;
        }
    }
    return numeroGer;
}
var counter = 0;
linhaLoop: do {
    var counterItem = 0;
    var arrAtualLinha = [];
    var _loop_1 = function () {
        //cuida para que não gere numeros dupicados horizontalmente em qualquer posição na linha
        var numero = gerarNumeroSemDuplicata(arrAtualLinha);
        if (numero) {
            if (counter !== 0) {
                var indexNumeroAtual_1 = arrAtualLinha.length;
                var nextPosition = indexNumeroAtual_1 + 1;
                var anteriorPosition = indexNumeroAtual_1 === 0 ? 0 : indexNumeroAtual_1 - 1;
                var numerosVertical = matriz.map(function (arr) { return arr[indexNumeroAtual_1]; });
                var posicaoNumeroIgualAtualLinhasAnterior = matriz.map(function (arr) {
                    if (numero) {
                        var posicao = arr.indexOf(numero);
                        return posicao;
                    }
                    else {
                        return false;
                    }
                }).filter(function (item) { return item !== -1; });
                console.log({
                    'numero': numero,
                    'next': nextPosition,
                    'antPosition': anteriorPosition,
                    'indexNumeroAtual': indexNumeroAtual_1,
                    'numerosVertical': numerosVertical,
                    'validacao': numerosVertical.includes(numero),
                    'position': posicaoNumeroIgualAtualLinhasAnterior
                });
                if (!numerosVertical.includes(numero) &&
                    !posicaoNumeroIgualAtualLinhasAnterior.includes(nextPosition) &&
                    !posicaoNumeroIgualAtualLinhasAnterior.includes(anteriorPosition)) {
                    arrAtualLinha.push(numero);
                }
                else {
                    //se existe algum numero na mesma posição vertical
                    if (numerosVertical.includes(numero)) {
                        var tries = 0;
                        while (tries < 10) {
                            tries += 1;
                            var novoNumero = gerarNumeroSemDuplicata(arrAtualLinha);
                            if (!numerosVertical.includes(novoNumero)) {
                                arrAtualLinha.push(novoNumero);
                                counterItem += 1;
                                break;
                            }
                        }
                    }
                    else if (posicaoNumeroIgualAtualLinhasAnterior.includes(anteriorPosition) ||
                        posicaoNumeroIgualAtualLinhasAnterior.includes(nextPosition)) {
                        var tries = 0;
                        console.log('duplicado');
                    }
                }
                counterItem += 1;
            }
            else {
                arrAtualLinha.push(numero);
                counterItem += 1;
            }
        }
    };
    do {
        _loop_1();
    } while (counterItem < 9);
    counter += 1;
    matriz.push(arrAtualLinha);
    arrAtualLinha = [];
    counterItem = 0;
} while (counter <= 1);
console.log(matriz);
