/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, type ChangeEvent } from "react";
import {
  CardComponents,
  FormComponent,
  Header,
  StyledH2,
  StyledButton,
  Styledp,
  StyledSpan,
  CustomTable,
} from "@/components";

// HOOKS
import {
  useFormValidation,
  useGet,
  useDelete,
  usePost,
} from "@/hooks";

// MUI
import { Container, Grid } from "@mui/material";

// TYPES
import type {
  InputProps,
  LeadsData,
  LeadsPostData,
  MessageProps,
} from "@/types";

function Leads() {
  // HOOKS
  const {
    data: createLeadsData,
    loading: createLeadsLoading,
    error: createLeadsError,
    postData: createLeadsPostData,
  } = usePost<LeadsData, LeadsPostData>("leads/create", true);

  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
    getData: getLeads,
  } = useGet<LeadsData[]>("leads");

  const { deleteData: leadsDeleteData, loading: leadsDeleteLoading } =
    useDelete("leads/delete");

  // FORM
  const inputs: InputProps[] = [
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "phone", type: "tel", placeholder: "Telefone", required: true },
  ];

  const { formValues, formValid, handleChange } = useFormValidation(inputs);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createLeadsPostData({
      name: String(formValues[0]),
      email: String(formValues[1]),
      phone: String(formValues[2]),
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir seu lead?")) {
      try {
        await leadsDeleteData({ params: { id } });
        alert("Lead deletado com sucesso");
        getLeads();
      } catch (e) {
        alert(
          "Não foi possível realizar a operação. Entre em contato com o nosso suporte"
        );
      }
    }
  };

  const [createMessage, setCreateMessage] = useState<MessageProps>({
    type: "success",
    msg: "",
  });

  const clearMessage = () => {
    setTimeout(() => {
      setCreateMessage({ type: "success", msg: "" });
    }, 3000);
  };

  useEffect(() => {
    if (createLeadsData?.id) {
      setCreateMessage({
        msg: "Lead criada com sucesso",
        type: "success",
      });
      getLeads();
      clearMessage();
    } else if (createLeadsError) {
      setCreateMessage({
        msg: "Não possível realizar a operação, por favor entre em contato com o nosso suporte",
        type: "error",
      });
    } else {
      clearMessage();
    }
  }, [createLeadsData, createLeadsError]);

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={7}>
            <CardComponents
              className={
                leadsLoading
                  ? "skeleton-loading skeleton-loading-mh-2"
                  : ""
              }
            >
              <StyledH2 className="mb-1">Meus leads</StyledH2>

              {!leadsError && !leadsLoading && (
                <>
                  {leadsData?.length ? (
                    <CustomTable
                      header={["Nome", "Email", "Telefone", ""]}
                      rows={leadsData.map((lead) => [
                        <Styledp>{lead.name}</Styledp>,
                        <Styledp>{lead.email}</Styledp>,
                        <Styledp>{lead.phone}</Styledp>,
                        <StyledButton
                          className="borderless-alert"
                          onClick={() => handleDelete(lead.id)}
                          disabled={leadsDeleteLoading}
                        >
                          Excluir
                        </StyledButton>,
                      ])}
                    />
                  ) : (
                    <StyledSpan>Sem leads cadastrados</StyledSpan>
                  )}
                </>
              )}
            </CardComponents>
          </Grid>

          <Grid item xs={12} sm={5}>
            <CardComponents>
              <StyledH2 className="mb-1">Cadastrar Leads</StyledH2>
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
                    disabled:
                      !formValid || createLeadsLoading || leadsDeleteLoading,
                    type: "submit",
                    onClick: handleSubmit,
                    children: "Cadastrar leads",
                  },
                ]}
                message={createMessage}
              />
            </CardComponents>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Leads;
