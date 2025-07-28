import { createContext, useState, useEffect, type ReactNode} from 'react'
import { ThemeProvider } from 'styled-components'
import  { darkTheme, lightTheme} from '@/styles'
import { type AppThemeConstextProps } from '@/types'

// eslint-disable-next-line react-refresh/only-export-components
export const AppThemeContext = createContext<AppThemeConstextProps | undefined>(undefined)

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
    const savedTheme = localStorage.getItem('theme')
    const [appTheme, setAppTheme] = useState(savedTheme ?? 'light')

    const toggleTheme = () => {
        setAppTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light') )
    }

    useEffect(() => {
        localStorage.setItem('theme', appTheme)
    })
    return(
        <AppThemeContext.Provider value={{ appTheme, toggleTheme}}>
            <ThemeProvider theme={appTheme === 'light' ? lightTheme : darkTheme }>
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}