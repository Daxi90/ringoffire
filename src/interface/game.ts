export interface Game {
    id?: string,
    currentPlayer: string,
    playedCards: string[],
    players: string[],
    stack: string[]
}
