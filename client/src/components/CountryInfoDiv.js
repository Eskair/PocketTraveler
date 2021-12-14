import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CountryInfoDiv = (props) => {
  const {
    country_name: {
      country_name: {
        conventional_long_form,
        conventional_short_form,
        etymology,
        local_long_form,
        local_short_form,
      },
    },
    capital: {
      capital: { name, time_difference },
    },
    area,
    population: { population },
    government_type: { government_type },
    location: { location },
    climate: { climate },
    background: { background },
    national_anthem: {
      national_anthem: { audio_url },
    },
    natural_resources: { natural_resources },
    environment: { environment },
  } = props.countryInfo;

  return (
    <Wrapper>
      <CountryInfoGen>
        <StP> {conventional_short_form}</StP>
        <TableSt>
          <tbody>
            <tr>
              <td>
                <TdSpan>Capital:</TdSpan>
              </td>
              <td>
                {name.indexOf(";") !== -1
                  ? name.substring(0, name.indexOf(";"))
                  : name}
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <TdSpan>Area:</TdSpan>
              </td>
              <td>{area} sq km</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <TdSpan>Population:</TdSpan>
              </td>
              <td>{population} inh.</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <TdSpan>Local name:</TdSpan>
              </td>
              <td>{local_long_form}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <TdSpan>Government Type:</TdSpan>
              </td>
              <td>{government_type}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <TdSpan>Location:</TdSpan>
              </td>
              <td>{location}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <TdSpan>Climate:</TdSpan>
              </td>
              <td>{climate}</td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td>
                <TdSpan>Time Difference:</TdSpan>
              </td>
              <td>
                {/* <StCountryLink to={`/${audio_url}`}>
                  National Anthem Audio
                </StCountryLink> */}
                {time_difference.note}
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <TdSpan>Natural Resources:</TdSpan>
              </td>
              <td>{natural_resources.join(", ")}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <TdSpan>Environment Issues:</TdSpan>
              </td>
              <td>{environment.toString()}</td>
            </tr>
          </tbody>
        </TableSt>
      </CountryInfoGen>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: var(--dark-blue);
  height: 100%;
`;

const CountryInfoGen = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: var(--light-gray);
  width: 75%;
  margin-top: 25px;
  margin-bottom: 25px;
  padding: 15px 20px 20px 20px;
  /* margin: 25px 15px 15px 15px; */
`;

const StP = styled.p`
  font-family: var(--font-body);
  font-size: 25px;
  font-weight: 500;
  color: var(--bright-orange);
  margin: 0;
  margin-bottom: 10px;
`;

const TableSt = styled.table`
  font-family: var(--font-body);
  font-size: 13px;
  margin: 0;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;

  width: 100%;

  td {
    border-top: 1px dashed #b9c4cc;
    border-bottom: 1px dashed #b9c4cc;
    padding: 10px;
    :nth-child(1) {
      width: 25%;
    }
  }
  tr {
  }
  tbody {
    :nth-child(odd) {
      background-color: #cfdce5;
    }
  }
`;

const TdSpan = styled.span`
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
`;

const StCountryLink = styled(Link)`
  color: var(--dark-blue);
  font-size: 13px;
  font-family: var(--font-body);
  text-decoration: none;
`;

export default CountryInfoDiv;
