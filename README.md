# Brown´s Garage: landing page

Site estático em HTML, CSS e JavaScript, sem dependências e sem build. Para ver o site, abra `index.html` no navegador. Para publicar, envie a pasta inteira para qualquer hospedagem estática (Netlify, Vercel, GitHub Pages ou a hospedagem atual da empresa).

## O que editar

Quase tudo fica em **`js/site.config.js`**:

| Campo | O que faz |
|---|---|
| `whatsapp.number` | Número com DDI e DDD, só dígitos (ex.: `5511912345678`). Enquanto estiver vazio, os botões levam à seção de contato. |
| `whatsapp.*Message` | Mensagens que já chegam preenchidas no WhatsApp. |
| `contact.address`, `contact.phone` | Endereço e telefone exibidos no contato e no rodapé. |
| `hours` | Horários de atendimento (adicione ou remova linhas). |
| `social.instagram` | URL do perfil. Vazio = o link fica oculto. |
| `legal.cnpj` | Texto legal do rodapé. |
| `services` | Nome, descrição e foto de cada serviço. |
| `gallery` | Fotos da galeria (`size`: `wide`, `tall`, `square` ou `half`). |
| `comparison` | Par de fotos do comparador antes e depois. |
| `reviews` | Depoimentos reais. A seção só aparece quando houver pelo menos um. |

As fotos do hero, da seção Sobre e da chamada final ficam em `index.html` (`hero-dark-sedan.webp`, `sobre.webp`, `cta.webp`).

## Fotografias

As imagens em `assets/img/` são **ilustrativas** (Unsplash, licença de uso livre) e não mostram trabalhos da Brown´s Garage. Substitua-as pelas fotos reais da empresa, de preferência mantendo o nome dos arquivos. Use WebP ou JPG com cerca de 1400 px de largura (2400 px para o hero e o fundo da chamada final).

No comparador antes e depois, hoje a mesma foto aparece dos dois lados, com um filtro cinza no lado "antes". Ao trocar por um par real, remova o `filter` da regra `.compare-before` em `css/styles.css`.

## Estrutura

```
index.html          Estrutura e conteúdo fixo
css/styles.css      Identidade visual (cores e fontes em :root)
js/site.config.js   Dados editáveis
js/main.js          Menu, WhatsApp, galeria, comparador e animações
assets/img/         Fotografias
assets/favicon.svg  Ícone da aba
```
