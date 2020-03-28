import chalk from 'chalk'
import { diffChars } from 'diff'

export type DiscardPiles = {
  left: string[]
  right: string[]
}

export type Decks = {
  original: string
  restored: string
}

export function divideByShape(deck: string[]): DiscardPiles {
  const discardPiles: DiscardPiles = {
    left: [],
    right: [],
  }

  deck.reduce<string | undefined>((prevCard, currCard) => {
    const targetPile =
      currCard !== prevCard ? discardPiles.right : discardPiles.left

    targetPile.push(currCard)

    return currCard
  }, undefined)

  return discardPiles
}

export function divideByShapeReverse(discardPiles: DiscardPiles): string[] {
  const deckArr: string[] = []
  const reverseDiscPiles: DiscardPiles = {
    left: discardPiles.left.reverse(),
    right: discardPiles.right.reverse(),
  }

  reverseDiscPiles.right.forEach((card) => {
    deckArr.unshift(card)

    while (reverseDiscPiles.left[0] === card) {
      deckArr.unshift(reverseDiscPiles.left.shift() as string)
    }
  })

  return deckArr
}

export function prettyDiff(strOriginal: string, strRestored: string): Decks {
  const diffs = diffChars(strOriginal, strRestored)
  const arrOriginal: string[] = []
  const arrRestored: string[] = []

  diffs.forEach((diff) => {
    if (!diff.added) {
      arrOriginal.push(chalk`{${diff.removed ? 'red' : 'grey'} ${diff.value}}`)
    }
    if (!diff.removed) {
      arrRestored.push(chalk`{${diff.added ? 'green' : 'grey'} ${diff.value}}`)
    }
  })

  return {
    original: arrOriginal.join(''),
    restored: arrRestored.join(''),
  }
}
