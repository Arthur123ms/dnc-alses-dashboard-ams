import {CardComponents, Header } from "@/components"
import { Container } from "@mui/material"

function Home () {
    return(
        <>
            <Header />
            <Container maxWidth='lg'>
                <CardComponents>Card</CardComponents>
            </Container>

        </>
    )
}

export default Home