import { divideByShape, divideByShapeReverse, prettyDiff } from '../lib/lib'

/* eslint-disable no-console */
export function run(): void {
  const strDeck = 'abbbbccccdbeedddabbbaffbdddgecbeggaggggggceddcaahaddb'

  console.log(`playing 'divide by shape' with the following deck:\n${strDeck}`)

  const discardPiles = divideByShape([...strDeck])

  console.log()
  console.log(`resulted in the following discard piles:`)
  console.log(`left:  ${discardPiles.left.join('')}`)
  console.log(`right: ${discardPiles.right.join('')}`)

  const restoredDeck = divideByShapeReverse(discardPiles)
  const strRestoredDeck = restoredDeck.join('')

  console.log()
  console.log(
    `restored the following deck based on the discard piles:\n${strRestoredDeck}`,
  )
  console.log()

  if (strRestoredDeck === strDeck) {
    console.log('restored deck matches the original deck')
  } else {
    const diffDecks = prettyDiff(strDeck, strRestoredDeck)

    console.log('restored deck does not match the original deck:')
    console.log(`original: ${diffDecks.original}`)
    console.log(`restored: ${diffDecks.restored}`)
  }
}
/* eslint-enable no-console */
