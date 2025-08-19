/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom"
import {
  AvatarList,
  CardComponents,
  CustomChart,
  CustomTable,
  Header,
  StyledH2,
  StyledH3,
  StyledSpan,
} from "@/components"
import { Container, Grid } from "@mui/material"

import { useGet } from "@/hooks"

import { currencyConverter, highlightsTextConverter } from "@/utils"

import type {
  HighlightsData,
  StarsData,
  NewsData,
  CustomChartProps,
} from "@/types"

function Home() {
  const {
    data: highlightsData,
    loading: highlightsLoading,
    error: highlightsError,
  } = useGet<HighlightsData[]>("sales/highlights")

  const {
    data: salesMonthData,
    loading: salesMonthLoading,
    error: salesMonthError,
  } = useGet<CustomChartProps>("sales/month")

  const {
    data: salesStarsData,
    loading: salesStarsLoading,
    error: salesStarsError,
  } = useGet<StarsData[]>("sales/stars")

  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
  } = useGet<NewsData[]>("news")

  const {
    data: salesYearData,
    loading: salesYearLoading,
    error: salesYearError,
  } = useGet<CustomChartProps>("sales/year")

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          {!highlightsError && (
            <>
              <Grid item xs={12} md={4}>
                <CardComponents
                  id="total-sales"
                  className={
                    highlightsLoading
                      ? "skeleton-loading skeleton-loading-mh-1"
                      : ""
                  }
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 className="mb-1">
                        Total de Vendas no mês
                      </StyledH2>

                      <StyledH3 className="mb-1" size={40} lineheight={40}>
                        {currencyConverter(highlightsData[0].value)}
                      </StyledH3>

                      <StyledSpan>{highlightsData[0].subtitle}</StyledSpan>
                    </>
                  )}
                </CardComponents>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={4}>
            <CardComponents
              id="month-goals"
              className={
                highlightsData
                  ? highlightsData[1].subtitle
                  : "skeleton-loading skeleton-loading-mh-1"
              }
            >
              {!highlightsLoading && highlightsData && (
                <>
                  <StyledH2 className="mb-1" color="white">
                    Meta do mês
                  </StyledH2>
                  <StyledH3
                    className="mb-1"
                    size={40}
                    lineheight={40}
                    color="white"
                  >
                    {currencyConverter(highlightsData[1].value)}
                  </StyledH3>
                  <StyledSpan color="white">
                    {highlightsTextConverter(highlightsData[1].subtitle)}
                  </StyledSpan>
                </>
              )}
            </CardComponents>
          </Grid>

          <Grid item xs={12} md={4}>
            <CardComponents
              id="total-leads"
              className={
                highlightsLoading
                  ? "skeleton-loading skeleton-loading-mh-1"
                  : ''
              }
            >
              {!highlightsLoading && highlightsData && (
                <Link to="/leads">
                  <StyledH2 className="mb-1">Leads contactados</StyledH2>
                  <StyledH3 className="mb-1" size={40} lineheight={40}>
                    {highlightsData[2].value}
                  </StyledH3>
                  <StyledSpan>{highlightsData[2].subtitle}</StyledSpan>
                </Link>
              )}
            </CardComponents>
          </Grid>

          <Grid item xs={12} md={7}>
            {!salesMonthError && (
              <CardComponents
                id="month-sales-chart"
                className={
                  salesMonthLoading
                    ? "skeleton-loading skeleton-loading-mh2"
                    : ""
                }
              >
                {!salesMonthLoading && salesMonthData && (
                  <>
                    <StyledH2 className="mb-1">Valor de vendas no mês</StyledH2>
                    <CustomChart
                      labels={salesMonthData.labels.map((label) => label)}
                      data={salesMonthData.data.map((data) => data)}
                      type={salesMonthData.type}
                    />
                  </>
                )}
              </CardComponents>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            {!salesStarsError && (
              <CardComponents
                id="sales-stars"
                className={
                  salesStarsLoading
                    ? "skeleton-loading skeleton-loading-mh-2"
                    : ""
                }
              >
                {!salesStarsLoading && salesStarsData && (
                  <>
                    <StyledH2 className="mb-1">
                      Maiores vendedores do mês
                    </StyledH2>
                    <AvatarList
                      listData={salesStarsData.map((star) => ({
                        avatar: "/dnc-avatar.svg",
                        name: star.name,
                        subtitle: currencyConverter(star.value),
                      }))}
                    />
                  </>
                )}
              </CardComponents>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            {!newsError && (
              <CardComponents>
                  id="news"
                  className={
                    newsLoading
                      ? "skeleton-loading skeleton-loading-mh-1"
                      : ""
                    } 

                {!newsLoading && newsData && (
                  <>
                    <StyledH2 className="mb-1">Notícias relevantes</StyledH2>
                    <CustomTable
                      header={["Título", "Horário"]}
                      rows={newsData.map((news) => [
                        <a
                          className="ellipsis ellipsis-sm"
                          href={news.link}
                          target="_blank"
                        >
                          {news.title}
                        </a>,
                        <a href={news.link} target="_blank">
                          {news.date}
                        </a>,
                      ])}
                    />
                  </>
                )}
              </CardComponents>
            )}
          </Grid>

          <Grid item xs={12} md={7}>
            {!salesYearError && (
              <CardComponents
                id="year-sales-chart"
                className={
                  salesYearLoading
                    ? "skeleton-loading skeleton-loading-mh2"
                    : ""
                }
              >
                {!salesYearLoading && salesYearData && (
                  <>
                    <StyledH2 className="mb-1">Valor de vendas no mês</StyledH2>
                    <CustomChart
                      labels={salesYearData.labels.map((label: any) => label)}
                      data={salesYearData.data.map((data: any) => data)}
                      type={salesYearData.type}
                    />
                  </>
                )}
              </CardComponents>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home
