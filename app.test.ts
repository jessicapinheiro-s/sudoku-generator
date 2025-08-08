import { generateSudoku, sortearNumero, gerarNumeroSemDuplicata } from './app';


describe('sortearNumero', () => {
    test('Deve retornar um numero sorteado do array', () => {
        const numeros = [1, 2, 3, 4];
        const result = sortearNumero(numeros);
        expect(numeros).toContain(result)
    });
})