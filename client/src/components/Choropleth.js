import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Modal from "react-modal";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

import { scaleLinear } from "d3-scale";

import CountryTopList from "./CountryTopList";

const mapData = require("../assets/world-110m.json");
const mapStyles = {
  width: "700px",
  height: "auto",
};

const Choropleth = (props) => {
  const {
    center,
    setTooltipContent,
    handleClick,
    handleGeographyClick,
    handleClickTwo,
    wfCateg,
    setWfCategUnits,
    wfCategUnits,
    wfCategName,
  } = props; // -> Props from MenuGlobe

  const [error, setError] = useState(false);
  const [choroplethData, setChoroplethData] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  // -------------------------------------------------------------- React Modal
  const [isOpen, setIsOpen] = useState(false);
  Modal.setAppElement("#root");
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const customStyles = {
    content: {
      width: "100%",
      height: "100%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(18, 43, 63, 1)",
    },
  };

  //----------------------------------------------------------------

  useEffect(() => {
    if (wfCateg !== "") {
      fetch(`/api/worldbook-category/${wfCateg}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== 200) {
            setError({ status: data.status, message: data.message });
            setChoroplethData([]);
          } else {
            setChoroplethData(data.categoryData);
          }
        });
    }
  }, [wfCateg]);
  // -> Calculates Min and Max values in Array
  useEffect(() => {
    if (choroplethData) {
      const minMaxValues = [];

      choroplethData.forEach((element) => {
        if (element.val !== "null") {
          minMaxValues.push(Number(element.val));
        }
      });

      const minMaxValuesSorted = minMaxValues.sort((a, b) => a - b);
      setMinValue(minMaxValuesSorted[0]);
      setMaxValue(minMaxValuesSorted[minMaxValuesSorted.length - 1]);
      setWfCategUnits(choroplethData[0].units);
    }
  }, [choroplethData]);

  const minColor = "#BCE4FF";
  const maxColor = "#006DB6";

  const customScale = scaleLinear()
    .domain([minValue, maxValue])
    .range([minColor, maxColor]);

  if (choroplethData) {
    return (
      <Wrapper>
        <ComposableMap
          width={500}
          height={500}
          projection="orthographic"
          projectionConfig={{ scale: 220 }}
          style={mapStyles}
        >
          <ZoomableGlobe center={center}>
            <circle
              cx={250}
              cy={250}
              r={220}
              fill="#e1eaf0"
              opacity="1"
              stroke="#e1eaf0"
              strokeWidth="0.2"
            />
            <Graticule globe={true} strokeWidth="0.1" />
            <Geographies disableOptimization geography={mapData}>
              {(geos, proj) =>
                geos.map((geo, i) => {
                  const country = choroplethData.find((d) => {
                    return d.id === geo.properties.ISO_A3;
                  });

                  return (
                    <Geography
                      key={geo.properties.ISO_A3 + i}
                      geography={geo}
                      projection={proj}
                      fill={"#D2D2D2"}
                      style={{
                        default: {
                          fill: country ? customScale(country.val) : "#ECEFF1",
                          stroke: "#006DB6",
                          strokeWidth: 0.3,
                          outline: "none",
                        },
                        hover: {
                          fill: country ? customScale(country.val) : "#ECEFF1",
                          stroke: "#006DB6",
                          strokeWidth: 0.3,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#82cdff",
                          stroke: "#FFF",
                          strokeWidth: 0.3,
                          outline: "none",
                        },
                      }}
                      data-tip
                      data-for="countryTip"
                      onMouseEnter={() => {
                        const { NAME } = geo.properties;
                        let valueFixed;
                        if (wfCateg === "gdp") {
                          valueFixed =
                            parseInt(parseInt(country?.val) / 1000000) + " M";
                        } else {
                          valueFixed = parseInt(country?.val);
                        }

                        const toolTips = `${NAME}: ${valueFixed} ${wfCategUnits}`;
                        const toolTipsNoData = `${NAME}: No Data`;

                        if (country?.val !== "null") {
                          setTooltipContent(`${toolTips}`);
                        } else {
                          setTooltipContent(`${toolTipsNoData}`);
                        }
                      }}
                      onClick={(e) => {
                        handleClick(geo.properties.ISO_A3, geo);
                        handleGeographyClick(geo, geo.properties.ISO_A3);
                        handleClickTwo(geo);
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGlobe>
        </ComposableMap>
        <ButtonSt onClick={toggleModal}>Data Table</ButtonSt>
        <Modal
          style={customStyles}
          isOpen={isOpen}
          onRequestClose={toggleModal}
          closeTimeoutMS={500}
        >
          <CountryTopList
            choroplethData={choroplethData}
            wfCateg={wfCateg}
            wfCategUnits={wfCategUnits}
            wfCategName={wfCategName}
            toggleModal={toggleModal}
          />
        </Modal>
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledP = styled.p`
  color: #486070;
  font-size: 12px;
  font-family: var(--font-body);
  margin-left: 10px;
`;

const ButtonSt = styled.button`
  background-color: #004e82;
  border: 0px solid #aaa;
  border-radius: 5px;
  color: var(--light-gray);
  font-size: 12px;
  margin-top: 10px;
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

export default Choropleth;
