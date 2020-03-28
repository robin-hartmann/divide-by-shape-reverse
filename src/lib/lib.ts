import chalk from 'chalk'
import { diffChars } from 'diff'

export type DiscardPiles = {
  left: string[]
  right: string[]
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
    deckArr.push(card)

    while (reverseDiscPiles.left[0] === card) {
      deckArr.push(reverseDiscPiles.left.shift() as string)
    }
  })

  return deckArr.reverse()
}

export function prettyDiff(strDeck1: string, strDeck2: string): string {
  const diffs = diffChars(strDeck1, strDeck2)
  const coloredDiff = diffs.map((diff) => {
    if (diff.added) {
      return chalk.green(diff.value)
    }

    if (diff.removed) {
      return chalk.red(diff.value)
    }

    return chalk.grey(diff.value)
  })

  return coloredDiff.join('')
}
