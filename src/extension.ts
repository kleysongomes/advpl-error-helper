import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('advplErrorHelper.searchError', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('Abra um arquivo e selecione um erro.');
      return;
    }

    const text = editor.document.getText(editor.selection).trim();
    if (!text) {
      vscode.window.showInformationMessage('Selecione uma mensagem de erro para buscar.');
      return;
    }

    showSuggestions(text);
  });

  context.subscriptions.push(disposable);
}

function showSuggestions(query: string) {
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}+ADVPL`;
  const forumUrl = `https://forum.totvs.io/search?q=${encodeURIComponent(query)}`;
  const tdnSearch = `https://www.google.com/search?q=site%3Atdn.totvs.com+${encodeURIComponent(query)}`;
  const zendeskSearch = `https://totvscst.zendesk.com/hc/pt-br#search?query=${encodeURIComponent(query)}&lang=pt-br`;

  const panel = vscode.window.createWebviewPanel(
    'advplErrorHelper',
    `Soluções para: ${query}`,
    vscode.ViewColumn.Beside,
    {}
  );

  panel.webview.html = getWebviewContent(query, googleUrl, forumUrl, tdnSearch, zendeskSearch);
}

function getWebviewContent(query: string, google: string, forum: string, tdn: string, zendesk: string): string {
  return `
    <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sugestão de Solução</title>
    <style>
        /* Define as variáveis de cor para facilitar a manutenção */
        :root {
            --primary-color: #ffffff;
            --secondary-color: #e0e0e0;
            --accent-color: #c5a6ff;
            --background-start: #1c1d2c;
            --background-end: #5c2d91;
            --glass-bg: rgba(255, 255, 255, 0.1);
            --glass-border: rgba(255, 255, 255, 0.2);
            --shadow-color: rgba(31, 38, 135, 0.37);
        }

        /* Estilização base do corpo da página */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: var(--primary-color);
            
            /* Fundo com gradiente animado */
            background: linear-gradient(45deg, var(--background-start), var(--background-end), #a862b7);
            background-size: 400% 400%;
            animation: gradientAnimation 15s ease infinite;
        }

        /* Animação do gradiente de fundo */
        @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Container principal com o efeito Glassmorphism */
        .glass-container {
            width: 100%;
            max-width: 600px;
            padding: 40px;
            background: var(--glass-bg);
            border-radius: 16px;
            box-shadow: 0 8px 32px 0 var(--shadow-color);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px); /* Suporte para Safari */
            border: 1px solid var(--glass-border);
            text-align: center;
        }

        /* Título principal */
        h2 {
            font-size: 1.8em;
            margin-bottom: 8px;
            font-weight: 600;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        /* Estilo para o código da query */
        h2 code {
          color: var(--accent-color);
          font-weight: bold;
        }

        /* Parágrafos de introdução e notas */
        p {
            font-size: 1.1em;
            line-height: 1.6;
            color: var(--secondary-color);
            margin-bottom: 30px;
        }

        /* Lista de links de solução */
        ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
        }

        li {
            margin-bottom: 15px;
        }

        /* Estilização dos links */
        a {
            display: block;
            padding: 15px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            text-decoration: none;
            color: var(--primary-color);
            font-weight: 500;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        a:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-3px); /* Efeito de levantar ao passar o mouse */
        }
        
        a:active {
            transform: translateY(-1px);
        }

        /* Nota de rodapé */
        .footer-note {
            font-size: 0.9em;
            color: var(--secondary-color);
            margin-top: 40px;
            margin-bottom: 0;
        }
    </style>
</head>
<body>

    <div class="glass-container">
        <h2>Análise do Erro: <code>${query}</code></h2>
        <p>Após analisar sua consulta, encontramos as seguintes sugestões de solução. Explore os recursos abaixo para encontrar a ajuda que precisa.</p>
        
        <ul>
            <li><a href="${google}" target="_blank">🔍 Veja o que encontramos no Google</a></li>
            <li><a href="${forum}" target="_blank">💬 Explorar o Fórum TOTVS (forum.totvs.io)</a></li>
            <li><a href="${tdn}" target="_blank">📚 Consultar a Documentação (TDN)</a></li>
            <li><a href="${zendesk}" target="_blank">🛠 Abrir um chamado no Suporte TOTVS</a></li>
        </ul>
        
        <p class="footer-note">
            <strong>Atenção:</strong> As soluções propostas são pontos de partida. Sinta-se à vontade para adaptá-las conforme a arquitetura e as especificidades do seu projeto.
        </p>
    </div>

</body>
</html>
  `;
}

export function deactivate() {}
