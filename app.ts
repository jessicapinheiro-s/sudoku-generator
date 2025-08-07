function sortearNumero() {
    return Math.floor(Math.random() * 9) + 1;
}

const matriz: number[][] = [];

function gerarNumeroSemDuplicata(arr: number[], numerosBlocoDisponiveisBloco?: number[]) {
    let numeroGer: number = 0;
    let flagNumberFound = false;
    while (flagNumberFound === false) {
        const num = sortearNumero();
        /*console.log({
            'num': num,
            'numerosBlocoDisponiveisBloco': numerosBlocoDisponiveisBloco,
            'arr': arr,
        })*/
        //cuida para que não gere numeros dupicados horizontalmente em qualquer posição na linha
        if (!arr.includes(num)) {
            if (numerosBlocoDisponiveisBloco) {
                if (numerosBlocoDisponiveisBloco?.includes(num)) {
                    numeroGer = num;
                    flagNumberFound = true;
                    break;
                }
            } else {
                numeroGer = num;
                flagNumberFound = true;
                break;
            }
        }
    }

    return numeroGer;
}

function sameNumberOtherPositions(arrLinhasBase: number[][], numero: number): number[] {
    const positions = arrLinhasBase.map(arr => {
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
    let rightNumber = true;
    let novoNumeroValido = true;

    while (counterItem < 9) {
        let numero = gerarNumeroSemDuplicata(arrAtualLinha);
        
        let numerosBloco: any[] = [];
        const indexNumeroAtual: number = arrAtualLinha.length;

        const blocosHorizontais = matriz.map((arr, index) => {
            if (counter <= 2) {
                return [
                    matriz[0] ?? [],
                    matriz[1] ?? [],
                    matriz[2] ?? []
                ]
            } else if (counter > 2 && counter <= 5) {
                return [
                    matriz[3] ?? [],
                    matriz[4] ?? [],
                    matriz[5] ?? []
                ]
            } else {
                return [
                    matriz[6] ?? [],
                    matriz[7] ?? [],
                    matriz[8] ?? []
                ]
            }
        })[0];

        blocosHorizontais?.forEach(arr => {
            if (indexNumeroAtual <= 2) {
                numerosBloco = [...numerosBloco, ...[arr[0], arr[1], arr[2]]].filter(item => item !== undefined);
            } else if (indexNumeroAtual > 2 && indexNumeroAtual <= 5) {
                numerosBloco = [...numerosBloco, ...[arr[3], arr[4], arr[5]]].filter(item => item !== undefined);
            } else if (indexNumeroAtual > 5 && indexNumeroAtual <= 8) {
                numerosBloco = [...numerosBloco, ...[arr[6], arr[7], arr[8]]].filter(item => item !== undefined);
            }
        });


        if (numero) {
            if (counter !== 0) {
                const nextPosition: number = indexNumeroAtual + 1;
                const nextPositionForFirst: number = indexNumeroAtual + 2;
                const anteriorPositionForLast: number = indexNumeroAtual - 2;
                const anteriorPosition: number = indexNumeroAtual === 0 ? 0 : indexNumeroAtual - 1;

                const numerosVertical = matriz.map(arr => arr[indexNumeroAtual]);
                const posicaoNumeroIgualAtualLinhasAnterior: number[] = sameNumberOtherPositions((blocosHorizontais ?? [[]]), numero);

                const indexDefinitionToValidationAnt = (currentIndexNumber: number) => {
                    if (currentIndexNumber === 0 || currentIndexNumber === 3 || currentIndexNumber === 6) {
                        return nextPositionForFirst;
                    } else if (currentIndexNumber === 8 || currentIndexNumber === 5 || currentIndexNumber === 2) {
                        return anteriorPositionForLast
                    } else {
                        return nextPosition
                    }
                }

                const indexDefinitionToValidationAft = (currentIndexNumber: number) => {
                    if (currentIndexNumber === 0 || currentIndexNumber === 3 || currentIndexNumber === 6) {
                        return nextPosition;
                    } else if (currentIndexNumber === 8 || currentIndexNumber === 5 || currentIndexNumber === 2) {
                        return anteriorPosition
                    } else {
                        return anteriorPosition
                    }
                }

                //se for 2 ou 5 deve calcular apenas com base nos números anteriores da esquerda, se for 3 ou 6 calcular apenas com base nos números da esquerda
                const validacaoHorizontalVerticalAnt = counter === 3 || counter === 6 ? true : validacaoNumeroHorVer(
                    posicaoNumeroIgualAtualLinhasAnterior,
                    indexDefinitionToValidationAnt(counterItem)
                );

                const validacaoHorizontalVerticalAft = counter === 3 || counter === 6 ? true : validacaoNumeroHorVer(
                    posicaoNumeroIgualAtualLinhasAnterior,
                    indexDefinitionToValidationAft(counterItem)
                );

                if (
                    !numerosVertical.includes(numero) &&
                    validacaoHorizontalVerticalAnt &&
                    validacaoHorizontalVerticalAft
                ) {
                    arrAtualLinha.push(numero);
                } else {
                    let numerosBlocoDisponiveis: any[] = [];
                    //se existe algum numero na mesma posição vertical
                    if (numerosVertical.includes(numero)) {
                        console.log('numerosVertical')
                        novoNumeroValido = false;
                        if (counterItem === 8) {
                            const numeroAnterior: number = arrAtualLinha[anteriorPosition] ?? 0;
                            const numerosVerticalNumeroAnterior = matriz.map(arr => arr[anteriorPosition]);

                            if (!numerosVerticalNumeroAnterior.includes(numero) && !numerosVertical.includes(numeroAnterior)) {
                                arrAtualLinha[anteriorPosition] = numero;
                                arrAtualLinha[indexNumeroAtual] = numeroAnterior;
                            }
                        } else {
                            while (novoNumeroValido === false) {
                                console.log('numerosVertical while entrou');
                                numerosBlocoDisponiveis = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(item => !arrAtualLinha.includes(item) && !numerosBloco.includes(item));
                                console.log('!numerosVertical numerosBlocoDisponiveis', numerosBlocoDisponiveis);
                                console.log('!matriz', matriz);
                                console.log(counter);
                                console.log('!arrAtualLinha', arrAtualLinha);
                                console.log('!numerosBloco', numerosBloco);
                                const novoNumero = counter === 3 || counter === 6 ? gerarNumeroSemDuplicata(arrAtualLinha) : gerarNumeroSemDuplicata(arrAtualLinha, numerosBlocoDisponiveis);
                                console.log(novoNumero);
                                if (!numerosVertical.includes(novoNumero)) {
                                    novoNumeroValido = true;
                                    arrAtualLinha.push(novoNumero);
                                    console.log('caiu');
                                    console.log(arrAtualLinha);
                                }
                            }
                        }
                        console.log('numerosVertical finalizou');
                    } else if (!validacaoHorizontalVerticalAnt) {
                        rightNumber = false;
                        while (rightNumber === false) {
                            numerosBlocoDisponiveis = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(item => !arrAtualLinha.includes(item) && !numerosBloco.includes(item));
                            console.log('!validacaoHorizontalVerticalAnt numerosBlocoDisponiveis', numerosBlocoDisponiveis);
                            const novonNumeroBloco = gerarNumeroSemDuplicata(arrAtualLinha, numerosBlocoDisponiveis);
                            console.log('!validacaoHorizontalAnt');

                            const antposicaoNumeroIgualAtualLinhasAnterior: number[] = sameNumberOtherPositions((blocosHorizontais ?? [[]]), novonNumeroBloco);

                            const antvalidationIndexsAnt = validacaoNumeroHorVer(
                                antposicaoNumeroIgualAtualLinhasAnterior,
                                indexDefinitionToValidationAnt(counterItem)
                            );

                            const antvalidationIndexsAft = validacaoNumeroHorVer(
                                antposicaoNumeroIgualAtualLinhasAnterior,
                                indexDefinitionToValidationAft(counterItem)
                            );
                            console.log({
                                'numeros bloco disponiveis': numerosBlocoDisponiveis,
                                'matriz': matriz,
                                'numerosBloco': numerosBloco,
                                'arrAtualLinha': arrAtualLinha,
                                'novonNumeroBloco': novonNumeroBloco,
                                'antvalidationIndexsAnt': antvalidationIndexsAnt,
                                'antvalidationIndexsAft': antvalidationIndexsAft,
                                'numerosVertical.includes(novonNumeroBloco)': numerosVertical.includes(novonNumeroBloco)
                            })
                            if (
                                antvalidationIndexsAnt &&
                                antvalidationIndexsAft &&
                                !numerosVertical.includes(novonNumeroBloco)
                            ) {
                                arrAtualLinha.push(novonNumeroBloco);
                                rightNumber = true;
                                console.log('caiu');
                                console.log(arrAtualLinha);
                                break;
                            }
                        }

                    } else if (!validacaoHorizontalVerticalAft) {
                        rightNumber = false;
                        console.log('!validacaoHorizontalAft');

                        while (rightNumber === false) {
                            numerosBlocoDisponiveis = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(item => !arrAtualLinha.includes(item) && !numerosBloco.includes(item)); //546  7, 5, 8, 9, 6, 1
                            console.log('!validacaoHorizontalAft numerosBlocoDisponiveis', numerosBlocoDisponiveis);
                            const novonNumeroBloco = gerarNumeroSemDuplicata(arrAtualLinha, numerosBlocoDisponiveis);
                            const aftposicaoNumeroIgualAtualLinhasAnteriorNovo: number[] = sameNumberOtherPositions((blocosHorizontais ?? [[]]), novonNumeroBloco);

                            const aftvalidationIndexsAnt = validacaoNumeroHorVer(
                                aftposicaoNumeroIgualAtualLinhasAnteriorNovo,
                                indexDefinitionToValidationAnt(counterItem)
                            );

                            const aftvalidationIndexsAft = validacaoNumeroHorVer(
                                aftposicaoNumeroIgualAtualLinhasAnteriorNovo,
                                indexDefinitionToValidationAft(counterItem)
                            );

                            console.log({
                                'numeros bloco disponiveis': numerosBlocoDisponiveis,
                                'matriz': matriz,
                                'arrAtualLinha': arrAtualLinha,
                                'novonNumeroBloco': novonNumeroBloco,
                                'aftvalidationIndexsAnt': aftvalidationIndexsAnt,
                                'aftvalidationIndexsAft': aftvalidationIndexsAft,
                                'numerosVertical.includes(novonNumeroBloco)': numerosVertical.includes(novonNumeroBloco)
                            })

                            if (
                                aftvalidationIndexsAnt &&
                                aftvalidationIndexsAft &&
                                !numerosVertical.includes(novonNumeroBloco)
                            ) {
                                arrAtualLinha.push(novonNumeroBloco);
                                rightNumber = true;
                                console.log('caiu');
                                console.log(arrAtualLinha);
                                break;
                            }
                        }

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
        numerosBloco = [];
    }

    counter += 1;
    matriz.push(arrAtualLinha);
    arrAtualLinha = []
    counterItem = 0;
} while (counter < 5);

console.log(matriz);
