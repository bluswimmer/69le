import { WORDS, EQUATIONS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { getGuessStatuses } from './statuses'
import Rand from 'rand-seed'

export const isWordInWordList = (word: string) => {
  return evaluate(word) === 69
}

const evaluate = (equation: string) => {
  if (
    !(equation.charAt(0) >= '0' && equation.charAt(0) <= '9') ||
    !(equation.charAt(5) >= '0' && equation.charAt(5) <= '9')
  ) {
    return -1
  }
  const operations = []
  var numbers = []
  var wasOperation = false
  var n = 0

  for (let i = 1; i < 5; i++) {
    if (
      equation.charAt(i) === '+' ||
      equation.charAt(i) === '-' ||
      equation.charAt(i) === '*' ||
      equation.charAt(i) === '/'
    ) {
      if (wasOperation) {
        return -1
      }
      wasOperation = true
      operations.push(equation.charAt(i))
    } else {
      wasOperation = false
    }
  }

  numbers = equation.split(/\+|-|\*|\//)

  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === '*') {
      n = +numbers[i] * +numbers[i + 1]
      numbers[i] = n.toString()
      numbers.splice(i + 1, 1)
      operations.splice(i, 1)
      i--
    } else if (operations[i] === '/') {
      if (+numbers[i + 1] === 0) {
        return -1
      }
      n = +numbers[i] / +numbers[i + 1]
      numbers[i] = n.toString()
      numbers.splice(i + 1, 1)
      operations.splice(i, 1)
      i--
    }
  }

  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === '+') {
      n = +numbers[i] + +numbers[i + 1]
      numbers[i] = n.toString()
      numbers.splice(i + 1, 1)
      operations.splice(i, 1)
      i--
    } else if (operations[i] === '-') {
      n = +numbers[i] - +numbers[i + 1]
      numbers[i] = n.toString()
      numbers.splice(i + 1, 1)
      operations.splice(i, 1)
      i--
    }
  }

  return +numbers[0]
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  const knownLetterSet = new Set<string>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess)

    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
      if (statuses[i] === 'correct' && word[i] !== guess[i]) {
        return `Must use ${guess[i]} in position ${i + 1}`
      }
    }
  }

  for (const letter of Array.from(knownLetterSet.values())) {
    // fail fast, always return first failed letter if applicable
    if (!word.includes(letter)) {
      return `Guess must contain ${letter}`
    }
  }
  return false
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('February 10, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs
  const r = new Rand(WORDS[index % WORDS.length])

  return {
    solution: EQUATIONS[Math.floor(r.next() * EQUATIONS.length)],
    solutionIndex: index + 1,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
