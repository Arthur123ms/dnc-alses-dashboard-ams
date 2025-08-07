import { CardComponents, Header, StyledH2, StyledButton, FormComponent } from "@/components"

//MUi
import { Container, Grid } from "@mui/material"

//HOOKS
import { useFormValidation, usePost, useGet, useDelete } from '@/hooks'

//TYPES
import type { InputProps } from "@/types"

function Leads () {
    const inputs: InputProps = [] = [
        
    ]
    return(
        <>
            <Header />
           <Container className='mb-2' maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={7}>
                        <CardComponents>
                            <StyledH2>Meus Leads</StyledH2>
                        </CardComponents>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <CardComponents>
                            <StyledH2>Cadastrar Leads</StyledH2>
                            <FormComponent 
                                inputs={inputs.map((input, index) => ({
                                    type: input.type,
                                    placeholder: input.placeholder,
                                    value: formValues[index] || '',
                                    onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(index, (e.target as HTMLInputElement).value)
                                }))}
                                buttons={[
                                    { 
                                        className: 'primary',
                                        disabled: !formValid || loading, 
                                        type: 'submit', 
                                        onClick: handleSubmit,
                                        children: loading ? 'Aguarde...' : 'Login'
                                    }
                                ]}
                                message={handleMessage()}
                            />

                        </CardComponents>
                    </Grid>
                </Grid>
           </Container>
        </>
    )
}

export default Leads