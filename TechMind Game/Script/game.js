let score = 0;
let currentWord = '';
let currentHint = '';
let currentNumber = 0;
let difficulty = '';
let nickname = '';


const easyWords = [
    { word: 'cpu', hint: 'Unidade de Processamento Central' },
    { word: 'ram', hint: 'Memória de Acesso Aleatório' },
    { word: 'bit', hint: 'Unidade mínima de dados' },
    { word: 'byte', hint: '8 bits formam um' }
];
const mediumWords = [
    { word: 'frontend', hint: 'Parte visível de um site ou aplicativo' },
    { word: 'backend', hint: 'Parte lógica de um sistema' },
    { word: 'servidor', hint: 'Máquina que fornece recursos em rede' }
];
const hardWords = [
    { word: 'criptografia', hint: 'Técnica de segurança para proteger dados' },
    { word: 'inteligencia', hint: 'Capacidade das máquinas de aprender e resolver problemas' },
    { word: 'algoritmo', hint: 'Sequência de instruções para resolver problemas' }
];

function loadScore() {
    let savedScore = localStorage.getItem(nickname); 
    score = savedScore ? parseInt(savedScore) : 0; 
    document.getElementById('score').innerText = score; 
}

function saveScore() {
    localStorage.setItem(nickname, score); 
    updateRanking(); 
}

function updateRanking() {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    let player = ranking.find(p => p.nickname === nickname);

    if (player) {
        if (score > player.score) player.score = score; 
    } else {
        ranking.push({ nickname, score });
    }

    ranking.sort((a, b) => b.score - a.score); 
    localStorage.setItem('ranking', JSON.stringify(ranking)); 
    displayRanking(ranking);
}

function displayRanking(ranking) {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = ''; 
    ranking.forEach(player => {
        const listItem = document.createElement('li');
        listItem.innerText = `${player.nickname}: ${player.score} pontos`; 
        rankingList.appendChild(listItem);
    });
}

function selectGame(game) {
    nickname = document.getElementById('nickname').value; 
    if (nickname === '') {
        alert('Por favor, insira seu nick!'); 
        return;
    }
    loadScore(); 

    if (game === 'word') {
        document.getElementById('word-game').style.display = 'block';
        document.getElementById('number-game').style.display = 'none';
    } else {
        document.getElementById('word-game').style.display = 'none';
        document.getElementById('number-game').style.display = 'block';
        startNumberGame(); 
    }
}

function setDifficulty(level) {
    difficulty = level;
}

function shuffleWord(word) {
    let shuffled = word;
    while (shuffled === word) {
        shuffled = word.split('').sort(() => Math.random() - 0.5).join('');
    }
    return shuffled;
}

function generateWord() {
    let wordList = difficulty === 'easy' ? easyWords : difficulty === 'medium' ? mediumWords : hardWords;
    let randomIndex = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[randomIndex].word; 
    currentHint = wordList[randomIndex].hint; 

    let shuffledWord = shuffleWord(currentWord);

    document.getElementById('word').innerText = shuffledWord; 
    document.getElementById('hint').innerText = `Dica: ${currentHint}`; 
}

function checkWord() {
    let guess = document.getElementById('guess-word').value;
    if (guess.toLowerCase() === currentWord.toLowerCase()) {
        alert('Correto!');
        score += 10; 
        document.getElementById('score').innerText = score; 
        saveScore();
        document.getElementById('guess-word').value = ''; 
        generateWord(); 
    } else {
        alert('Errado! Tente novamente.');
    }
}

function startGame() {
    if (difficulty === '') {
        alert('Escolha uma dificuldade!'); 
        return;
    }
    generateWord(); 
}

function startNumberGame() {
    currentNumber = Math.floor(Math.random() * 100) + 1; 
    document.getElementById('number-feedback').innerText = ''; 
}

function checkNumber() {
    let guess = parseInt(document.getElementById('guess-number').value);
    if (guess === currentNumber) {
        alert('Você acertou!');
        score += 10;
        document.getElementById('score').innerText = score; 
        saveScore(); 
        startNumberGame(); 
    } else if (guess < currentNumber) {
        document.getElementById('number-feedback').innerText = 'Muito baixo!';
    } else {
        document.getElementById('number-feedback').innerText = 'Muito alto!';
    }
}

function resetRanking() {
    localStorage.removeItem('ranking');
    document.getElementById('ranking-list').innerHTML = ''; 
}

window.onbeforeunload = function () {
    if (nickname) saveScore();
};

document.getElementById('nickname').addEventListener('input', function () {
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = this.value.trim() === '';
});
