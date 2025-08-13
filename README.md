# Gerador de Sudoku em TypeScript

Este projeto implementa um **gerador de Sudoku** em TypeScript, capaz de criar grades completas e gerar desafios com diferentes níveis de dificuldade.  
O sistema garante que os números sejam distribuídos sem duplicatas, respeitando as regras clássicas do Sudoku (linhas, colunas e blocos 3x3).

## Funcionalidades

- **Gerar Sudoku completo**: Cria uma matriz 9x9 válida com todos os números distribuídos corretamente.
- **Evitar duplicatas**: Garante que cada linha, coluna e bloco 3x3 não possua números repetidos.
- **Gerar Sudoku por dificuldade**: Permite remover números da matriz completa de acordo com o nível de dificuldade selecionado (Fácil, Médio, Difícil).

## Tecnologias

- **TypeScript**
- **ts-node** (execução direta de scripts TypeScript)
- **Jest** (testes unitários)
