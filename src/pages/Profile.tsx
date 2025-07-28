import { CardComponents, Header, StyledButton } from "@/components"
import  { useContext } from 'react'
import { AppThemeContext } from "@/contexts/AppThemeContext"

function Profile () {
    const themeContext = useContext(AppThemeContext)
    return(
        <>
        <Header />
        <CardComponents>
            <StyledButton className="primary" onClick={themeContext?.toggleTheme}>
                Trocar para tema { ' ' }
                {themeContext?.appTheme === 'light' ? 'escuro' : 'claro'}
            </StyledButton>
        </CardComponents>
           
        </>
    )
}
export default Profile