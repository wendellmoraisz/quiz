const info = document.querySelector('.info-box')
const start = document.querySelector('.start_btn')
const resultado = document.querySelector('.result-box') // flex
const quiz = document.querySelector('.quiz-box')

const restart = document.querySelectorAll('.restart')

const numQuestoes = document.getElementById('num-questoes')

const quit = document.getElementById('quit')
const fquit = document.getElementById('fquit')

quit.onclick = function(){
    location.reload()
}

fquit.onclick = function(){
    nextElement(info, start)
}

start.onclick = function() {
    nextElement(start, info)
}

restart.forEach((e) => e.onclick = function(){
    nextElement(info, quiz)
    contador()
})

function nextElement(atual, proximo) {
    atual.style.display = 'none'
    proximo.style.display = 'block'
}

function nextElementFlex(atual, proximo) {
    atual.style.display = 'none'
    proximo.style.display = 'flex'
    document.querySelector('.score-txt').innerHTML = `<span>Você acertou <p>${respostasCorretas}</p> De <p>5</p> questões</span>`
}

class Questão {
    constructor(enunciado, option1, option2, option3, option4, opcaoCorreta) {
            this.enunciado = enunciado
            this.option1 = option1
            this.option2 = option2
            this.option3 = option3
            this.option4 = option4
            this.opcaoCorreta = opcaoCorreta
        }
}

const questions = [
    new Questão ('Qual é a porta padrão do protocolo HTTPS?',
    '80',
    '8080',
    '443',
    '434',
    3),

    new Questão ('3 bytes contém quantos bits?',
    '9',
    '12',
    '16',
    '24',
    4),

    new Questão('Qual foi o primeiro computador desenvolvido pela Apple?',
    'Macintosh',
    'Lisa',
    'Apple 1',
    'Apple PC',
    3),
    
    new Questão('Qual foi o primeiro computador eletrônico do mundo?',
    'ENIAC',
    'Turing Computer',
    'IBM PC',
    'NPL Pilot Ace',
    1)
]

let indexQuestion = -1
function getQuestion() {
    indexQuestion < 3 ? indexQuestion++ : nextElementFlex(quiz, resultado)
    if (indexQuestion == 3){
        clearInterval(setTempo)
    }
    return indexQuestion
}

let numquestion = 1
function numQuestions() {
    numquestion++
    return numquestion
}

const alternativas = document.querySelectorAll('.option')
const opcoes = document.querySelectorAll('.icon')
const icons = document.querySelectorAll('.fas')

function nextQuestion(question) {
    clearInterval(setTempo)

    numQuestoes.innerHTML = `<p>${numQuestions()}</p>de<p>5</p>Questões`
    document.getElementById('enunciado').innerHTML = question.enunciado
    document.getElementById('option1').innerHTML = question.option1
    document.getElementById('option2').innerHTML = question.option2
    document.getElementById('option3').innerHTML = question.option3
    document.getElementById('option4').innerHTML = question.option4
    
    document.querySelector('.correct').classList.add('wrong')
    document.querySelector('.correct').classList.remove('correct')
    alternativas[question.opcaoCorreta - 1].classList.remove('wrong')
    alternativas[question.opcaoCorreta - 1].classList.add('correct')
    
    document.querySelector('.tick').style.display = 'none'
    document.querySelectorAll('.cross').forEach(e => e.style.display = 'none')
    document.querySelector('.tick').classList.add('cross')
    document.querySelector('.tick').classList.remove('tick')
    document.querySelector('.fa-check').classList.add('fa-times')
    document.querySelector('.fa-check').classList.remove('fa-check')
    opcoes[question.opcaoCorreta - 1].classList.remove('cross')
    opcoes[question.opcaoCorreta - 1].classList.add('tick')

    icons[question.opcaoCorreta - 1].classList.remove('fa-times')
    icons[question.opcaoCorreta - 1].classList.add('fa-check')
    
    contador()
    correctAnswer()
    wrongAnswer()
}

const correct = document.querySelector('.tick')
const incorrect = document.querySelectorAll('.cross')
const timer = document.querySelector('.time-sec') //


function contador() {
    timer.innerHTML = 15
    
    let tempo = 15

    setTempo = setInterval(() => {
        --tempo
        if(tempo >= 0){
            timer.innerHTML = tempo
        }else if (tempo == -1){
            correct.style.display = 'block'
            incorrect.forEach((e) => e.style.display = 'block')
        }else if (tempo < -1.5){
            correct.style.display = 'none'
            incorrect.forEach((e) => e.style.display = 'none')
            nextQuestion(questions[getQuestion()])
        }
    }, 1000)

}

let respostasCorretas = 0
function correctAnswer(){
    document.querySelector('.correct').onclick = function(){
        respostasCorretas++
        clearInterval(setTempo)
        document.querySelector('.tick').style.display = 'block'
        let i = 0
        let intevalo = setInterval(()=> {
            i++
            if(i == 2){
                nextQuestion(questions[getQuestion()])
                clearInterval(intevalo)
            }
        },1000)
    }
}

function wrongAnswer(){
    document.querySelectorAll('.wrong').forEach(e => e.onclick = function(){
        clearInterval(setTempo)
        incorrect.forEach(e => e.style.display = 'block')
        correct.style.display = 'block'
        let i = 0
        let intevalo = setInterval(()=> {
            i++
            if(i == 2){
                nextQuestion(questions[getQuestion()])
                clearInterval(intevalo)
            }
        },1000)
    })
}

wrongAnswer()
correctAnswer()