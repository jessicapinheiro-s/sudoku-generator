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


function validationIndexes(arr: number[], index: number, counterLine: number, counterNumber: number, where?: string ) {
    //se for 2 ou 5 deve calcular apenas com base nos números anteriores da esquerda, se for 3 ou 6 calcular apenas com base nos números da esquerda
    
    if (counterLine === 4 || counterLine === 7 || counterNumber === 2 || counterNumber === 3 || counterNumber === 5 || counterNumber === 6) {
        if(counterLine === 7 || counterLine === 4) return true;

        if(where === 'after'){

        }else{
            w
        }
    } else {
        return validacaoNumeroHorVer(arr, index);
    }
}


let counter = 0;
linhaLoop: do {
    let counterItem = 0;
    let arrAtualLinha: number[] = [];

    while (counterItem < 9) {
        let numero = gerarNumeroSemDuplicata(arrAtualLinha);

        if (numero) {
            if (counter !== 0) {

                const indexNumeroAtual = arrAtualLinha.length;
                const nextPosition = indexNumeroAtual + 1;
                const nextPositionForFirst = indexNumeroAtual + 2;
                const anteriorPositionForLast = indexNumeroAtual - 2;
                const anteriorPosition = indexNumeroAtual === 0 ? 0 : indexNumeroAtual - 1;

                const numerosVertical = matriz.map(arr => arr[indexNumeroAtual]);
                const posicaoNumeroIgualAtualLinhasAnterior: number[] = sameNumberOtherPositions(numero);


                const validacaoHorizontalVerticalAnt = validationIndexes(
                    posicaoNumeroIgualAtualLinhasAnterior,
                    counterItem === 0 ? nextPositionForFirst : counterItem === 8 ? anteriorPositionForLast : nextPosition,
                    counter,
                    counterItem
                );
                const validacaoHorizontalVerticalAft = validationIndexes(
                    posicaoNumeroIgualAtualLinhasAnterior,
                    counterItem === 0 ? nextPosition : counterItem === 8 ? anteriorPosition : anteriorPosition,
                    counter,
                    counterItem
                );



                if (
                    !numerosVertical.includes(numero) &&
                    validacaoHorizontalVerticalAnt &&
                    validacaoHorizontalVerticalAft
                ) {
                    arrAtualLinha.push(numero);
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
                    } else if (!validacaoHorizontalVerticalAnt) {
                        console.log('!validacaoHorizontalAnt');
                        console.log({
                            'matriz': matriz,
                            'arrAtualLinha': arrAtualLinha
                        })

                        let rightNumber = false;

                        do {
                            const novonNumeroBloco = gerarNumeroSemDuplicata(arrAtualLinha);
                            
                            const antposicaoNumeroIgualAtualLinhasAnterior: number[] = sameNumberOtherPositions(novonNumeroBloco);

                            const antvalidationIndexsAnt = validationIndexes(
                                antposicaoNumeroIgualAtualLinhasAnterior,
                                (counterItem === 0 ? nextPositionForFirst : counterItem === 8 ? anteriorPositionForLast : nextPosition),
                                counter,
                                counterItem
                            );

                            const antvalidationIndexsAft = validationIndexes(
                                antposicaoNumeroIgualAtualLinhasAnterior,
                                (counterItem === 0 ? nextPosition : counterItem === 8 ? anteriorPosition : anteriorPosition),
                                counter,
                                counterItem
                            );

                            if (
                                antvalidationIndexsAnt &&
                                antvalidationIndexsAft &&
                                !numerosVertical.includes(novonNumeroBloco)
                            ) {
                                arrAtualLinha.push(novonNumeroBloco);
                                rightNumber = true;
                            }
                        } while (rightNumber === false)


                    } else if (!validacaoHorizontalVerticalAft) {
                        let rightNumber = false;
                        let indexN = 0;
                        console.log('!validacaoHorizontalAft');
                        console.log({
                            'matriz': matriz,
                            'arrAtualLinha': arrAtualLinha
                        })

                        do {
                            const novonNumeroBloco = gerarNumeroSemDuplicata(arrAtualLinha);
                            const aftposicaoNumeroIgualAtualLinhasAnteriorNovo: number[] = sameNumberOtherPositions(novonNumeroBloco);

                            const aftvalidationIndexsAnt = validationIndexes(
                                aftposicaoNumeroIgualAtualLinhasAnteriorNovo,
                                (counterItem === 0 ? nextPositionForFirst : counterItem === 8 ? anteriorPositionForLast : nextPosition),
                                counter,
                                counterItem
                            );

                            const aftvalidationIndexsAft = validationIndexes(
                                aftposicaoNumeroIgualAtualLinhasAnteriorNovo,
                                (counterItem === 0 ? nextPosition : counterItem === 8 ? anteriorPosition : anteriorPosition),
                                counter,
                                counterItem
                            );

                            if (
                                aftvalidationIndexsAnt &&
                                aftvalidationIndexsAft &&
                                !numerosVertical.includes(novonNumeroBloco)
                            ) {
                                arrAtualLinha.push(novonNumeroBloco);
                                rightNumber = true;
                            }
                            indexN += 1;
                        } while (rightNumber === false || indexN === 10)


                    } else {
                        console.log('não caiu na posição acima')
                    }
                }
                counterItem += 1;
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
} while (counter < 5);

console.log(matriz);



//console.log('| NUMERO |', numero);
//console.log('| COUNTER | ', counterItem);
//console.log('| Index num Atual|', indexNumeroAtual);
//console.log('| posicaoNumeroIgualAtualLinhasAnterior | ', posicaoNumeroIgualAtualLinhasAnterior);
//console.log('| nextPosition | ', counterItem === 0 ? nextPositionForFirst : counterItem === 8 ? anteriorPositionForLast : nextPosition);
//console.log('| anteriorPositionForLast | ', counterItem === 0 ? nextPosition : counterItem === 8 ? anteriorPosition : anteriorPosition);


/*
   console.log('validacaoHorizontalAft duplicado')
                        console.log({
                            'numero que deu problema': numero,
                            'proxima posição': nextPosition,
                            'posição anterior': anteriorPosition,
                            'index do numero atual': indexNumeroAtual,
                            'arrAtualLinha': arrAtualLinha,
                            'mesmo numero linhas anteriores posição': posicaoNumeroIgualAtualLinhasAnterior
                        });

                            console.log({
                                'novonNumeroBloco': novonNumeroBloco,
                                'matriz': matriz,
                                'arrAtualLinha': arrAtualLinha,
                                'posicaoNumeroIgualAtualLinhasAnteriorNovo': posicaoNumeroIgualAtualLinhasAnteriorNovo,
                                '!validacaoHorizontalAft': '!validacaoHorizontalAft',
                                'nextPosition': aftvalidationIndexsAnt,
                                'anteriorPosition': aftvalidationIndexsAft
                            })
*/