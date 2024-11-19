# TechMind Games

Bem-vindo ao **TechMind Games**, um repositório para jogos interativos de palavras e números desenvolvidos para exercitar habilidades de memória e raciocínio lógico. 
O projeto é feito com HTML, CSS e JavaScript, e armazena os pontos dos jogadores no navegador local usando `localStorage`.

## Funcionalidades

### Jogo de Palavras
O jogo de palavras desafia os jogadores a adivinhar palavras relacionadas à área de TI com base em dicas fornecidas. O jogo oferece três níveis de dificuldade: fácil, médio e difícil.

- **Dificuldade Fácil**: Palavras relacionadas a conceitos básicos de tecnologia.
- **Dificuldade Média**: Palavras relacionadas a termos intermediários de tecnologia.
- **Dificuldade Difícil**: Palavras relacionadas a conceitos mais complexos de TI.

### Jogo de Adivinhação de Números
No jogo de adivinhação de números, o jogador deve tentar adivinhar um número aleatório gerado pelo sistema dentro de um intervalo de 1 a 100.

- O jogador tem que tentar adivinhar o número correto em tentativas limitadas.
- Cada acerto ou erro é feedbackado para ajudar o jogador a acertar.

### Pontuação
- A pontuação do jogador é salva localmente usando o `localStorage` no navegador.
- A pontuação é compartilhada entre os dois jogos, utilizando o mesmo nome de usuário (nickname).
- Ao jogar qualquer um dos dois jogos, a pontuação do jogador é atualizada e salva automaticamente.

### Ranking
- O ranking dos jogadores é exibido com base na pontuação mais alta, sendo atualizada sempre que o jogador tiver um desempenho melhor.
- A pontuação é salva no `localStorage` e pode ser visualizada por todos os jogadores.

