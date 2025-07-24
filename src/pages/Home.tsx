import { AvatarsList, CardComponents, Header } from "@/components"
import { Container } from "@mui/material"
import { currencyConverter } from "@/utils"


function Home () {
    const mockListData = [
        {
            avatar: '/dnc-avatar.svg',
            name: 'Nome Sobrenome 1',
            subtitle: currencyConverter(1234.54)
        },

           {
            avatar: '/dnc-avatar.svg',
            name: 'Nome Sobrenome 2',
            subtitle: currencyConverter(3455.89)
            },

           {
            avatar: '/dnc-avatar.svg',
            name: 'Nome Sobrenome 3',
            subtitle: currencyConverter(9087.60)
        },
    ]
    return(
        <>
            <Header />
            <Container maxWidth='lg'>
                <CardComponents>
                    CARD
                </CardComponents>
                <CardComponents>
                    <AvatarsList listData={mockListData}/>
                </CardComponents>
            </Container>

        </>
    )
}

export default Home