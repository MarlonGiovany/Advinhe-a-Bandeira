# 🌎🚩 Adivinhe a Bandeira do Nicolas!

Jogo educativo de bandeiras para crianças, feito para ser usado principalmente em **tablet**, direto no navegador.
Uma bandeira grande aparece na tela, a criança toca em uma de **três alternativas** e:

- **Acertou:** "Parabéns Nicolas!!!! 🥳🎉🏆 Você acertou!" com confetes, estrelas e o mascote pulando.
- **Errou:** "Quaseeem! 😁 Tente novamente, outro país!" — sem perder pontos; a opção errada fica apagada e ele tenta de novo.

## Como funciona

- **40 países em 5 níveis.** O Nível 1 tem as bandeiras famosas (Brasil, Argentina, Estados Unidos, França, Itália, Japão, Portugal e Alemanha).
- A cada **8 acertos** sobe de nível (com troféu e chuva de confetes). Depois do Nível 5 vira **Mestre das Bandeiras** e todas aparecem misturadas.
- **Dificuldade gradual:** nos primeiros níveis as alternativas erradas são bandeiras bem diferentes da certa; depois vão aparecendo bandeiras parecidas.
- As bandeiras saem de um "baralho" embaralhado, então não se repetem muito. A resposta certa muda de posição e nunca fica 3 vezes seguidas no mesmo lugar.
- **Meu Álbum:** cada bandeira acertada vira uma figurinha.
- O progresso fica salvo no próprio tablet (localStorage). Não precisa de conta nem de internet além do primeiro acesso.
- Botão de som (só efeitos curtos, sem narração) e botão de tela cheia.

## Rodar no computador

Precisa do [Node.js](https://nodejs.org) 20.19 ou mais novo.

```bash
npm install
```

```bash
npm run dev
```

Abra o endereço que aparecer (ex.: `http://localhost:5173`). Para testar no tablet na mesma rede Wi‑Fi, use o endereço "Network" que o comando mostra.

## Publicar de graça na Vercel

1. Crie um repositório no GitHub e envie o projeto:

   ```bash
   git init
   ```

   ```bash
   git add . && git commit -m "Adivinhe a Bandeira do Nicolas!"
   ```

   ```bash
   git branch -M main && git remote add origin https://github.com/MarlonGiovany/Advinhe-a-Bandeira.git && git push -u origin main
   ```

2. Entre em [vercel.com](https://vercel.com) com a conta do GitHub → **Add New… → Project** → escolha o repositório → **Deploy**.
   A Vercel detecta tudo sozinha (Vite, comando `npm run build`, pasta `dist`) — está configurado também no `vercel.json`.
3. Pronto! Abra o link no Chrome do tablet. Dica: no menu ⋮ do Chrome, toque em **Adicionar à tela inicial** — o jogo ganha um ícone e abre em tela cheia, como um aplicativo.

Cada novo `git push` publica a versão nova automaticamente.

## Estrutura

```
src/
  data/countries.ts     países, níveis e curiosidades
  game/engine.ts        sorteio das rodadas, dificuldade e progresso
  game/storage.ts       salvar/carregar progresso no navegador
  game/sound.ts         efeitos sonoros (gerados no navegador, sem arquivos)
  game/confetti.ts      confetes e estrelas
  screens/              Início, Jogo e Álbum
  components/           mascote, barra do topo, comemoração, etc.
  assets/flags/         bandeiras em SVG (incluídas no projeto)
public/                 ícones e manifesto do app
```

Para adicionar um país: copie o SVG para `src/assets/flags/` e acrescente uma linha em `src/data/countries.ts`.

## Créditos

- Bandeiras: [flag-icons](https://github.com/lipis/flag-icons) — licença MIT (ver `src/assets/flags/LICENSE-flag-icons.txt`).
- Fonte: [Fredoka](https://fonts.google.com/specimen/Fredoka) — SIL Open Font License.
- Confetes: [canvas-confetti](https://github.com/catdad/canvas-confetti) — licença ISC.
