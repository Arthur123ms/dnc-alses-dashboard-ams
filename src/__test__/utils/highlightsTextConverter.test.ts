import { highlightsTextConverter } from "@/utils";

describe('highlightsTextConverter', () => {
    it('should return the correct text for "alert"', () => {
        expect(highlightsTextConverter('alert')).toBe('* Meta longe de ser batida')
    })

    it('should return the correct text for "sucess"', () => {
        expect(highlightsTextConverter('sucess')).toBe('* A meta foi batida com sucesso')
    })

    it('should return the correct text for "warning"', () => {
        expect(highlightsTextConverter('warning')).toBe('* Falta pouco, vamos lá!')
    })

    it('should return the deafault for unknown input', () => {
        expect(highlightsTextConverter('un')).toBe('* Sem dados no momento')
    })
    

})