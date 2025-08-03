function sortearNumero() {
    return Math.floor(Math.random() * 9) + 1;
}

const matriz: number[][] = [];

function gerarNumeroSemDuplicata(arr: number[]) {
    let numeroGer: number | null = null;

    while (numeroGer == null) {
        const num = sortearNumero();

        //cuida para que não gere numeros dupicados horizontalmente em qualquer posição na linha
        if (!arr.includes(num)) {
            numeroGer = num;
            break;
        }
    }

    return numeroGer;
}

let counter = 0;
linhaLoop: do {
    let counterItem = 0;
    let arrAtualLinha: number[] = [];
    
    do {
        //cuida para que não gere numeros dupicados horizontalmente em qualquer posição na linha
        let numero = gerarNumeroSemDuplicata(arrAtualLinha);


        if (numero) {
            if (counter !== 0) {

                const indexNumeroAtual = arrAtualLinha.length;
                const nextPosition = indexNumeroAtual + 1;
                const anteriorPosition = indexNumeroAtual === 0 ? 0 : indexNumeroAtual - 1;

                const numerosVertical = matriz.map(arr => arr[indexNumeroAtual]);

                const posicaoNumeroIgualAtualLinhasAnterior = matriz.map(arr => {
                    if (numero) {
                        const posicao = arr.indexOf(numero);
                        return posicao;
                    } else {
                        return false;
                    }

                }).filter(item => item !== -1);
                console.log({
                    'numero': numero,
                    'next': nextPosition,
                    'antPosition': anteriorPosition,
                    'indexNumeroAtual': indexNumeroAtual,
                    'numerosVertical': numerosVertical,
                    'validacao': numerosVertical.includes(numero),
                    'position': posicaoNumeroIgualAtualLinhasAnterior
                });
                
                if (
                    !numerosVertical.includes(numero) &&
                    !posicaoNumeroIgualAtualLinhasAnterior.includes(nextPosition) &&
                    !posicaoNumeroIgualAtualLinhasAnterior.includes(anteriorPosition)
                  ) {
                    arrAtualLinha.push(numero);
                } else {
                    //se existe algum numero na mesma posição vertical
                    if (numerosVertical.includes(numero)) {
                        let tries = 0;
                        while (tries < 10) {
                            tries += 1;
                            const novoNumero = gerarNumeroSemDuplicata(arrAtualLinha);

                            if (!numerosVertical.includes(novoNumero)) {
                                arrAtualLinha.push(novoNumero);
                                counterItem += 1;
                                break;
                            }
                        }
                    } else if (
                        posicaoNumeroIgualAtualLinhasAnterior.includes(anteriorPosition) ||
                        posicaoNumeroIgualAtualLinhasAnterior.includes(nextPosition)) {
                        let tries = 0;
                        
                        console.log('duplicado')
                    }
                }
                counterItem += 1;
            } else {
                arrAtualLinha.push(numero);
                counterItem += 1;
            }
        }

    } while (counterItem < 9)

    counter += 1;
    matriz.push(arrAtualLinha);

    arrAtualLinha = []
    counterItem = 0;
} while (counter <= 1);

console.log(matriz)

