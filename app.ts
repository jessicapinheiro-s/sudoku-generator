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

function sameNumberOtherPositions(numero: number): number[] {
    const positions = matriz.map(arr => {
        if (numero) {
            const posicao = arr.indexOf(numero);
            return posicao;
        } else {
            return false;
        }

    }).filter(item => item !== -1).filter(item => item !== false);

    return positions;
}

function validacaoNumeroHorVer(arr: number[], numero: number): boolean {
    return !arr.includes(numero);
}


let counter = 0;
linhaLoop: do {
    let counterItem = 0;
    let arrAtualLinha: number[] = [];

    while (counterItem < 9) {
        let numero = gerarNumeroSemDuplicata(arrAtualLinha);

        if (numero) {
            if (counter !== 0) {
                console.log('| NUMERO |', numero);
                console.log('| COUNTER | ', counterItem);
                const indexNumeroAtual = arrAtualLinha.length;
                const nextPosition = indexNumeroAtual + 1;
                const anteriorPosition = indexNumeroAtual === 0 ? 0 : indexNumeroAtual - 1;

                const numerosVertical = matriz.map(arr => arr[indexNumeroAtual]);

                const posicaoNumeroIgualAtualLinhasAnterior: number[] = sameNumberOtherPositions(numero);

                const blocosVerticais = posicaoNumeroIgualAtualLinhasAnterior.map((item, index) => {
                    if (index === 2) {
                        return [
                            posicaoNumeroIgualAtualLinhasAnterior[0],
                            posicaoNumeroIgualAtualLinhasAnterior[1],
                            posicaoNumeroIgualAtualLinhasAnterior[2]
                        ]
                    } else if (index === 5) {
                        return [
                            posicaoNumeroIgualAtualLinhasAnterior[3],
                            posicaoNumeroIgualAtualLinhasAnterior[4],
                            posicaoNumeroIgualAtualLinhasAnterior[5]
                        ]
                    } else if (index === 8) {
                        return [
                            posicaoNumeroIgualAtualLinhasAnterior[6],
                            posicaoNumeroIgualAtualLinhasAnterior[7],
                            posicaoNumeroIgualAtualLinhasAnterior[8]
                        ]
                    } else {
                        return false;
                    }
                }).filter(item => item !== false);

                const validacaoHorizontalAnt = (counter === 4 || counter === 7) ? true : validacaoNumeroHorVer(posicaoNumeroIgualAtualLinhasAnterior, nextPosition);
                const validacaoHorizontalAft = (counter === 4 || counter === 7) ? true : validacaoNumeroHorVer(posicaoNumeroIgualAtualLinhasAnterior, anteriorPosition);

                if (
                    !numerosVertical.includes(numero) &&
                    validacaoHorizontalAnt &&
                    validacaoHorizontalAft
                ) {
                    arrAtualLinha.push(numero);
                    counterItem += 1;
                } else {
                    //se existe algum numero na mesma posição vertical
                    if (numerosVertical.includes(numero)) {
                        console.log('numerosVertical')
                        let novoNumeroValido = false;

                        while (!novoNumeroValido) {
                            const novoNumero = gerarNumeroSemDuplicata(arrAtualLinha);
                            if (!numerosVertical.includes(novoNumero)) {
                                novoNumeroValido = true;
                                arrAtualLinha.push(novoNumero);
                            }
                        }
                    } else if (!validacaoHorizontalAnt) {
                        console.log('!validacaoHorizontalAnt')
                        let rightNumber = false;

                        do {
                            const novonNumeroBloco = gerarNumeroSemDuplicata(arrAtualLinha);
                            const posicaoNumeroIgualAtualLinhasAnteriorNovo: number[] = sameNumberOtherPositions(novonNumeroBloco);

                            //console.log('novonNumeroBlocoAnt', novonNumeroBloco)

                            if (
                                validacaoNumeroHorVer(posicaoNumeroIgualAtualLinhasAnteriorNovo, nextPosition) &&
                                validacaoNumeroHorVer(posicaoNumeroIgualAtualLinhasAnteriorNovo, anteriorPosition) &&
                                !numerosVertical.includes(novonNumeroBloco)
                            ) {
                                arrAtualLinha.push(novonNumeroBloco);
                                rightNumber = true;
                            }
                        } while (rightNumber === false)

                        //console.log('validacaoHorizontalAnt duplicado');
                        /*console.log({
                            'numero que deu problema': numero,
                            'proxima posição': nextPosition,
                            'posição anterior': anteriorPosition,
                            'index do numero atual': indexNumeroAtual,
                            'arrAtualLinha': arrAtualLinha,
                            'mesmo numero linhas anteriores posição': posicaoNumeroIgualAtualLinhasAnterior
                        });*/
                    } else if (!validacaoHorizontalAft) {
                        console.log('!validacaoHorizontalAft')
                        let rightNumber = false;

                        do {
                            const novonNumeroBloco = gerarNumeroSemDuplicata(arrAtualLinha);
                            const posicaoNumeroIgualAtualLinhasAnteriorNovo: number[] = sameNumberOtherPositions(novonNumeroBloco);

                            //console.log('novonNumeroBlocoAft', novonNumeroBloco)

                            if (
                                validacaoNumeroHorVer(posicaoNumeroIgualAtualLinhasAnteriorNovo, nextPosition) &&
                                validacaoNumeroHorVer(posicaoNumeroIgualAtualLinhasAnteriorNovo, anteriorPosition) &&
                                !numerosVertical.includes(novonNumeroBloco)
                            ) {
                                arrAtualLinha.push(novonNumeroBloco);
                                rightNumber = true;
                            }
                        } while (rightNumber === false)

                        //console.log('validacaoHorizontalAft duplicado')
                        /*console.log({
                            'numero que deu problema': numero,
                            'proxima posição': nextPosition,
                            'posição anterior': anteriorPosition,
                            'index do numero atual': indexNumeroAtual,
                            'arrAtualLinha': arrAtualLinha,
                            'mesmo numero linhas anteriores posição': posicaoNumeroIgualAtualLinhasAnterior
                        });*/

                    } else {
                        console.log('não caiu na posição acima')
                    }
                    counterItem += 1;
                }
            } else {
                arrAtualLinha.push(numero);
                counterItem += 1;
            }
        }
    }

    counter += 1;
    matriz.push(arrAtualLinha);
    arrAtualLinha = []
    counterItem = 0;
} while (counter <= 1);

console.log(matriz)

