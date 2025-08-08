function sortearNumero(numerosDisponiveis: number[]) {
    const indexAleatorio: number = Math.floor(Math.random() * numerosDisponiveis.length);
    return numerosDisponiveis[indexAleatorio];
}

const matriz: number[][] = [];

function gerarNumeroSemDuplicata(
    arr: number[],
    numerosBlocoDisponiveisBloco: number[]
) {
    let numeroGer: number = 0;
    let flagNumberFound = false;

    if (numerosBlocoDisponiveisBloco.length === 0) {
        return null;
    } else {
        while (flagNumberFound === false) {
            const num = sortearNumero(numerosBlocoDisponiveisBloco);
            if (num) {

                if (!arr.includes(num)) {
                    if (numerosBlocoDisponiveisBloco?.includes(num)) {
                        numeroGer = num;
                        flagNumberFound = true;
                        break;
                    }
                }
            } else {
                flagNumberFound = true;
                break;
                console.log('[ERRO]Numero invalido')
            }
        }
        return numeroGer;
    }
}


function generateSudoku() {
    let counter = 0;
    const numerosBaseMatriz = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    do {
        let counterItem = 0;
        let arrAtualLinha: number[] = [];

        const blocosHorizontais = matriz.map(() => {
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


        while (counterItem < 9) {
            let numerosBloco: any[] = [];
            let numerosBlocoDisponiveis: any[] = [];

            const indexNumeroAtual: number = arrAtualLinha.length;
            const numerosVertical = matriz.map(arr => arr[indexNumeroAtual]).filter(item => item !== undefined);

            blocosHorizontais?.forEach(arr => {
                if (indexNumeroAtual <= 2) {
                    numerosBloco = [...numerosBloco, ...[arr[0], arr[1], arr[2]]].filter(item => item !== undefined);
                } else if (indexNumeroAtual > 2 && indexNumeroAtual <= 5) {
                    numerosBloco = [...numerosBloco, ...[arr[3], arr[4], arr[5]]].filter(item => item !== undefined);
                } else if (indexNumeroAtual > 5 && indexNumeroAtual <= 8) {
                    numerosBloco = [...numerosBloco, ...[arr[6], arr[7], arr[8]]].filter(item => item !== undefined);
                }
            });

            numerosBlocoDisponiveis = numerosBaseMatriz.filter(item => !arrAtualLinha.includes(item) && !numerosBloco.includes(item) && !numerosVertical.includes(item));
            let numero = gerarNumeroSemDuplicata(arrAtualLinha, numerosBlocoDisponiveis);

            if (numero === null) {
                counterItem = 0;
                arrAtualLinha = [];
            }

            if (numero) {
                if (counter !== 0) {
                    arrAtualLinha.push(numero);
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
    } while (counter < 9);
}

generateSudoku();