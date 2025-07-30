/**

* Convert JWT exp in day
* @param exp - Number to be converted
* @returns The Convertes exp in days

*/

export function jwtExpirationDateConverter(exp: number): number {
    const currentTime = Math.floor(Date.now() / 100)
    const secondUntilExpiration = exp - currentTime
    const secondsInADays = 60 * 60 * 24
    const daysUntilExpiration = secondUntilExpiration / secondsInADays
    return daysUntilExpiration
}