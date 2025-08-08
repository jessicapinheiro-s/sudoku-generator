import { generateSudoku, sortearNumero, gerarNumeroSemDuplicata } from './app';


describe('sortearNumero', () => {
    test('Deve retornar um numero sorteado do array', () => {
        const numeros = [1, 2, 3, 4];
        const result = sortearNumero(numeros);
        expect(numeros).toContain(result)
    });

    test('Deve lidar com array vazio', () => {
        const numeros: [] = [];
        const result = sortearNumero(numeros);
        expect(result).toBe(undefined);
    });

})

describe('gerarNumeroSemDuplicata', () => {
    test('Deve Retornar um numero VALIDO', () => {
        //[1,5,7 - 2,6,3, - 8,4,9]
        //[2,9,6]
        const wrong = [2, 9, 6, 3];
        const arrNumerosLinhaAtual = [2, 9, 6]
        const arrNumerosDisponiveisBloco = [1, 8, 4, 5, 7];

        const result = gerarNumeroSemDuplicata(arrNumerosLinhaAtual, arrNumerosDisponiveisBloco);

        expect(wrong).not.toContain(result);
    });
    test('Deve Retornar null caso o arr de numeros disponiveis venha vazio', () => {
        //[1,5,7 - 2,6,3, - 8,4,9]
        //[2,9,6]
        const wrong = [2, 9, 6, 3];
        const arrNumerosLinhaAtual = [2, 9, 6]
        const arrNumerosDisponiveisBloco: [] = [];

        const result = gerarNumeroSemDuplicata(arrNumerosLinhaAtual, arrNumerosDisponiveisBloco);

        expect(result).toBe(null);
    });

});

describe('generateSudoku', () => {
    test('Deve retornar um arr com 9 itens', () => {
        const result = generateSudoku();
        expect(result).toHaveLength(9);
    });


    test('Deve retornar uma matriz', () => {
        const result = generateSudoku();

        expect(result.every(Array.isArray)).toBe(true);
    });

    test('Deve retornar o numero apenas uma vez na horizontal na mesma linha', () => {
        const result = generateSudoku();
        const baseNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        result.forEach(arr => {
            baseNumeros.forEach(numero => {
                const filNum = arr.filter(numArr => numArr === numero).length === 1;
                expect(filNum).toBe(true);
            })
        })
    });


    test('Deve retornar o numero apenas uma vez na vertical em linhas diferentes', () => {
        const result = generateSudoku();
        const baseNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const indexesBase = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        indexesBase.forEach(index => {
            const allNumbers = result.map(arr => {
                const numeroSamePosition = arr[index];
                return numeroSamePosition;
            });

            baseNumeros.forEach(numero => {
                const filNum = allNumbers.filter(numArr => numArr === numero).length === 1;
                expect(filNum).toBe(true);
            })
        })

    });
})