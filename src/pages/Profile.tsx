/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  CardComponents,
  FormComponent,
  Header,
  StyledH2,
  StyledButton,
} from "@/components"
import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { AppThemeContext } from "@/contexts/AppThemeContext"

// MUI
import { Container, Grid } from "@mui/material"

// HOOKS
import { useFormValidation, useGet, usePut, useDelete } from "@/hooks"

// TYPES
import type{
  InputProps,
  ProfileData,
  ProfileEditableData,
  MessageProps,
} from "@/types"

// SERVICES
import { logout } from "@/services"
import Cookies from "js-cookie"

function Profile() {
  const themeContext = useContext(AppThemeContext)

  const [updateMessage, setUpdateMessage] = useState<MessageProps>({
    type: "success",
    msg: "",
  })

  const clearMessage = () => {
    setTimeout(() => {
      setUpdateMessage({ type: "success", msg: "" })
    }, 3000)
  }

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useGet<ProfileData>("profile")

  const {
    data: profileUpdateData,
    putData: profilePutData,
    loading: profileUpdateLoading,
    error: profileUpdateError,
  } = usePut<ProfileEditableData>("profile/update")

    const {deleteData: profileDeleteData, loading: profileDeleteLoading} = useDelete("profile/delete")

  const inputs: InputProps[] = [
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "email", type: "email", placeholder: "Email", disabled: true },
    { name: "phone", type: "tel", placeholder: "Telefone", required: true },
  ]

  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  useEffect(() => {
    if (profileData) {
      handleChange(0, profileData.name)
      handleChange(1, profileData.email)
      handleChange(2, profileData.phone)
    }
  }, [profileData])

  useEffect(() => {
    if (profileUpdateData) {
      setUpdateMessage({
        msg: "Perfil Atualizado com sucesso",
        type: "success",
      })
    } else if (profileUpdateError) {
      setUpdateMessage({
        msg: "Não foi possível realizar a operação. Entre em contato com nossa equipe de suporte.",
        type: "error",
      })
    }
    clearMessage()
  }, [profileUpdateData, profileUpdateError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await profilePutData({
      name: String(formValues[0]),
      phone: String(formValues[2]),
    })
  }

  const handleDelete = async () => {
    if(confirm('Tem certeza que deseja excluir sua conta? Se sim, certique-se de deletar as seus leads antes')){
        try{
            await profileDeleteData()
            alert('Perfil deletado com sucesso')
            Cookies.remove('Authorization')
            window.location.href = '/'
        } catch (e) {
            alert('Não foi possível realizar a operação. Entre em contato com o nosso suporte')
        }
    }
  }

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            {!profileError && (
              <CardComponents
                className={
                  profileLoading
                    ? "skeleton-loading skeleton-loading-mh2"
                    : ""
                }
              >
                {!profileLoading && profileData && (
                  <>
                    <StyledH2 className="mb-1">Seus Dados</StyledH2>
                    <FormComponent
                      inputs={inputs.map((input, index) => ({
                        ...input,
                        value: formValues[index] || "",
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(index, e.target.value),
                      }))}
                      buttons={[
                        {
                          className: "primary",
                          disabled: !formValid || profileUpdateLoading,
                          type: "submit",
                          onClick: handleSubmit,
                          children: profileUpdateLoading ? 'Aguarde...' : "Atualizar meu perfil",
                        },
                        {
                          className: "alert",
                          disabled: profileDeleteLoading,
                          type: "button",
                          onClick: handleDelete,
                          children: profileDeleteLoading 
                            ? 'Aguarde...'
                            : 'Excluir minha conta'
                        },
                      ]}
                      message={updateMessage}
                    />
                  </>
                )}
              </CardComponents>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardComponents>
              <StyledButton
                className="primary mb-1"
                onClick={themeContext?.toggleTheme}
              >
                Trocar para tema{" "}
                {themeContext?.appTheme === "light" ? "escuro" : "claro"}
              </StyledButton>
              <StyledButton className="alert" onClick={logout}>
                Logout
              </StyledButton>
            </CardComponents>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Profile
