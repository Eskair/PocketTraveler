import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import * as d3 from "d3";
import { useParams, NavLink } from "react-router-dom";

import CountryInfoDiv from "./CountryInfoDiv";

const CountryInfo = () => {
  const { clickedCountry } = useParams();
  const [countryInfo, setcountryInfo] = useState(null);
  const [centerCoord, setCenterCoord] = useState([0, 0]);
  const [error, setError] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  useEffect(() => {
    fetch(`api/worldbook-country/${clickedCountry}`, {
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
          setcountryInfo(data.countryData[0]);
          if (
            data.countryData[0].longitudeHem === "W" &&
            data.countryData[0].latitudeHem === "N"
          ) {
            setCenterCoord([
              data.countryData[0].latitude,
              `-${data.countryData[0].longitude}`,
            ]);
          } else if (
            data.countryData[0].latitudeHem === "S" &&
            data.countryData[0].longitudeHem === "E"
          ) {
            setCenterCoord([
              `-${data.countryData[0].latitude}`,
              data.countryData[0].longitude,
            ]);
          } else if (
            data.countryData[0].latitudeHem === "N" &&
            data.countryData[0].longitudeHem === "E"
          ) {
            setCenterCoord([
              data.countryData[0].latitude,
              data.countryData[0].longitude,
            ]);
          } else {
            setCenterCoord([
              `-${data.countryData[0].latitude}`,
              `-${data.countryData[0].longitude}`,
            ]);
          }
        }
      });
  }, [clickedCountry]);

  const options = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  // if (loadError) {
  //   return "error loading maps";
  // }
  // if (!isLoaded) {
  //   return <Loading />;
  // }

  if (countryInfo !== null) {
    const {
      country_name: {
        country_name: {
          conventional_long_form,
          conventional_short_form,
          etymology,
        },
      },
      // capital: {
      //   capital: { name, time_difference },
      // },
    } = countryInfo;

    let scale = d3.scaleLinear().domain([0, 17098242]).range([5, 3]);
    let scaleRounded = Math.round(scale(countryInfo.area));

    const center = {
      lat: parseInt(centerCoord[0]),
      lng: parseInt(centerCoord[1]),
    };

    return (
      <WrapperDiv>
        <CountryNameDiv>
          <HomeHead>
            {conventional_long_form.indexOf(";") !== -1
              ? conventional_long_form.substring(
                  0,
                  conventional_long_form.indexOf(";")
                )
              : conventional_long_form}
          </HomeHead>
          <ButtonSt>Data Table</ButtonSt>
        </CountryNameDiv>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={scaleRounded}
          options={options}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
        <CountryInfoDiv countryInfo={countryInfo} />
      </WrapperDiv>
    );
  } else {
    return (
      <LoadingDiv>
        <LoadingP>Data is Loading...</LoadingP>
      </LoadingDiv>
    );
  }
};

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const CountryNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const LoadingP = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  color: #004e82;
  margin-top: 200px;
`;

const HomeHead = styled.h1`
  font-family: var(--font-heading);
  color: var(--light-gray);
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  margin-left: 50px;
`;
const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const ButtonSt = styled.button`
  background-color: #004e82;
  border: 0px solid #aaa;
  border-radius: 5px;
  color: var(--light-gray);
  font-size: 12px;
  margin-right: 45px;
  color: #82cdff;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 15px;
  padding-right: 15px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #006db6;
  }
`;
export default CountryInfo;
