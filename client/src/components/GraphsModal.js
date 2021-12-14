import React, { useState, useEffect } from "react";
import styled from "styled-components";

import D3LinearChart from "./D3LinearChart";

const GraphsModal = (props) => {
  const [graphData, setGraphData] = useState(null);
  const { toggleModal, clickedCountry, fixedName } = props;
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/worldbook-year/${clickedCountry}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          setError({ status: data.status, message: data.message });
          console.log(error);
        } else {
          setGraphData(data.countryDataByYear);
        }
      });
  }, [clickedCountry]);

  if (graphData) {
    const {
      yearsPopulation,
      yearsMedianAge,
      yearsPopulation_growth_rate,
      yearsAdult_obesity,
      yearsGdp,
      yearsGdpPc,
      yearsReal_growth_rate,
      yearsCarbon_dioxide_emissions,
      yearsMobile_cellular,
    } = graphData;

    return (
      <Wrapper>
        <HeadDiv>
          <TopListButton onClick={toggleModal}>Close</TopListButton>
          <HomeHead>{fixedName}</HomeHead>
          <StyledPTwo>Historical Data (2007-2020)</StyledPTwo>
        </HeadDiv>
        <ChartDiv>
          <D3LinearChart title={"GDP PPP"} units={"USD"} dataset={yearsGdp} />
          <D3LinearChart
            title={"GDP Per Capita PPP"}
            units={"USD"}
            dataset={yearsGdpPc}
          />
          <D3LinearChart
            title={"Growth Rate"}
            units={"%"}
            dataset={yearsReal_growth_rate}
          />
          <D3LinearChart
            title={"Population"}
            units={"Inhabitants"}
            dataset={yearsPopulation}
          />
          <D3LinearChart
            title={"Population Growth Rate"}
            units={"%"}
            dataset={yearsPopulation_growth_rate}
          />
          <D3LinearChart
            title={"Median Age"}
            units={"Years"}
            dataset={yearsMedianAge}
          />
          <D3LinearChart
            title={"Adult Obesity"}
            units={"Years"}
            dataset={yearsAdult_obesity}
          />

          <D3LinearChart
            title={"CO2 Emission"}
            units={"Tonnes"}
            dataset={yearsCarbon_dioxide_emissions}
          />
          <D3LinearChart
            title={"Mobile Cellular"}
            units={"Subs./100 inh."}
            dataset={yearsMobile_cellular}
          />
        </ChartDiv>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <StyledP>Loading Data...</StyledP>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
  background-color: var(--dark-blue);
  top: 0px;
  min-width: 1200px;
  width: 80%;
  height: 100%;
  margin: auto;
  margin-top: 30px;
`;

const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  border-bottom: 1px solid var(--light-gray);
  padding-bottom: 5px;
  align-items: flex-end;
`;

const ChartDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
  margin-top: 50px;
`;

const TopListButton = styled.button`
  font-family: var(--font-body);
  font-size: 12px;
`;

const StyledP = styled.p`
  color: #486070;
  font-size: 12px;
  font-family: var(--font-body);
  margin-left: 10px;
`;

const StyledPTwo = styled.p`
  color: var(--light-gray);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 400;
  margin: 0;
`;

const HomeHead = styled.h1`
  font-family: var(--font-heading);
  color: var(--light-gray);
  font-size: 25px;
  font-weight: 700;
  margin: 0;
`;

export default GraphsModal;
