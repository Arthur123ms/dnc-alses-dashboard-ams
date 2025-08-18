/**

* Convert to text from highlights api
* @param text -Text to be converted
* @returns Converter text

*/

export function highlightsTextConverter(text: string): string {
    switch (text) {
        case 'alert': 
            return '* Meta longe de ser batida'
        case 'sucess': 
            return '* A meta foi batida com sucesso'
        case 'warning': 
            return '* Falta pouco, vamos lá!'
        default: 
            return '* Sem dados no momento'
    }
}