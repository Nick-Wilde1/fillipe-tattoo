# Fillipe Tattoo — Landing Page

Site em Vite puro (HTML + CSS + JS vanilla, sem frameworks e sem libs de animação).

## Rodando o projeto

```bash
npm install
npm run dev
```

Build de produção (gera `dist/`, funciona até abrindo o `index.html` direto no navegador, sem servidor):

```bash
npm run build
```

## Fotos e vídeos

Todas as fotos e vídeos em `public/assets/` já são reais, extraídos e recortados dos
vídeos originais do Fillipe (pasta `YURI TATTO/VIDEOS`). Para cada um foi removida a
marca d'água "@fillipetattooo" (borrão discreto no canto onde ela aparecia) e cortada
a vinheta de encerramento ("@fillipetattooo" em tela cheia) que existia no fim de vários
clipes — o vídeo/foto usado no site mostra só o processo/resultado.

| Arquivo | Origem | Conteúdo |
|---|---|---|
| `video/hero.mp4` + `img/hero-poster.jpg` | vídeo de aplicação (close-up) | loop do hero |
| `video/bastidores-preparo.mp4` | preparo dos potinhos de tinta | bastidor "Preparo" |
| `video/bastidores-transferencia.mp4` | transferência do decalque nas costas | bastidor "Transferência" |
| `video/bastidores-aplicacao.mp4` | aplicação da phoenix colorida | bastidor "Aplicação" |
| `video/cobertura.mp4` + `img/cobertura.jpg` | cobertura completa (leão/Jesus) | seção Coberturas |
| `img/gallery-1..6.jpg` | 6 peças finalizadas (realismo, blackwork, colorido, cobertura) | Galeria |
| `img/tribute-1..6.jpg` | 6 retratos de tributo finalizados (sem decalque, só resultado) | seção Tributo |
| `img/artist.jpg` | still do Fillipe tatuando | seção "Quem sou eu" |

Se quiser trocar qualquer um por um arquivo mais recente/melhor, é só substituir mantendo
o mesmo nome — não precisa mexer no `index.html`.

## Animações

O site usa **scroll-driven animations nativas do CSS** (`animation-timeline: view()` /
`scroll()`) + IntersectionObserver — sem nenhuma biblioteca. Inclui:
barra de progresso no topo, parallax scroll-linked nas fotos (galeria/tributo/artista),
reveals em cascata, faixa (marquee) contínua, spotlight que segue o mouse no hero,
botões magnéticos, tilt 3D nos cards e destaque da seção ativa no menu.

> **Se o site aparecer "parado" (sem animação):** provavelmente o **"Reduzir movimento"**
> está ligado no sistema. No Windows: *Configurações → Acessibilidade → Efeitos visuais →
> Efeitos de animação = Ativado*. O site respeita essa preferência de propósito
> (acessibilidade) — com ela ligada, mantém só um fade suave.

## Pendências de conteúdo

- **Número de WhatsApp**: troque `https://wa.me/55XXXXXXXXXXX` (aparece no botão flutuante
  e na seção de contato, em `index.html`) pelo número real, no formato `55DDXXXXXXXXX`.
- **Texto "Quem sou eu"**: o texto atual é genérico — ajuste com os detalhes reais da
  trajetória do Fillipe (nenhum ano de experiência, prêmio ou número foi inventado).

## Observação sobre a marca d'água dos vídeos

O `@fillipetattooo` "quica" pela tela nos vídeos originais. Nas **fotos** ele foi removido
de forma limpa (reconstrução `delogo`). Nos **vídeos**, como ele se move, foi usado `delogo`
nos dois cantos — o @ deixa de ser legível, mas em áreas escuras pode sobrar uma leve
suavização. Para remoção 100% perfeita, o ideal é exportar os vídeos originais já sem o @.
