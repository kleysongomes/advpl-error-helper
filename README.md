# ADVPL Error Helper

Esta extensão do VSCode permite buscar rapidamente soluções para erros ADVPL diretamente no Google e nos fóruns da TOTVS.

<img width="1600" height="851" alt="image" src="https://github.com/user-attachments/assets/9836a041-9b06-41d8-abf8-05f479b40a63" />


## Como usar

1. Selecione um erro no seu código ou terminal.
2. Pressione `Ctrl+Shift+P` e escolha `Buscar Solução ADVPL`.
3. Duas abas do navegador serão abertas com buscas:
   - No fórum da TOTVS
   - No Google com "ADVPL"

## Requisitos

- Node.js instalado
- VSCode instalado

## Comandos para rodar o projeto

```bash
# 1. Instale dependências
npm install

# 2. Compile o projeto
npm run compile

# 3. Rode o VSCode para testes (isso abre uma nova janela do VSCode com sua extensão carregada)
code .

# 4. Pressione F5 para abrir uma janela de teste (Extension Development Host)
```

## Atalho
Selecione qualquer erro no código ADVPL e chame: `Buscar Solução ADVPL`
