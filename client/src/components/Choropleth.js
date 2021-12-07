import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

import { scaleLinear } from "d3-scale";

const mapData = require("../assets/world-110m.json");
const mapStyles = {
  width: "600px",
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
  } = props; // -> Props from MenuGlobe

  const [error, setError] = useState(false);
  const [choroplethData, setChoroplethData] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

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
              fill="white"
              opacity="1"
              stroke="#CFD8DC"
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
                        const toolTips = `${NAME}: ${country?.val} ${wfCategUnits}`;

                        setTooltipContent(`${toolTips}`);
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
  justify-content: center;
`;

const StyledP = styled.p`
  color: #486070;
  font-size: 12px;
  font-family: var(--font-body);
  margin-left: 10px;
`;

export default Choropleth;
