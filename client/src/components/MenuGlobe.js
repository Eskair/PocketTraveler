import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

import { geoPath } from "d3-geo";
import { geoTimes } from "d3-geo-projection";

import Choropleth from "./Choropleth";

const mapData = require("../assets/world-110m.json"); //-> geoJSON for country maps layer

const mapStyles = {
  width: "700px",
  height: "auto",
};

const MenuGlobe = ({
  setTooltipContent,
  wfCateg,
  setWfCategUnits,
  wfCategUnits,
  wfCategName,
}) => {
  const [center, setCenter] = useState([0, 0]); // -> state sets center coordinates
  const [ttCountry, setttCountry] = useState(null); // -> state sets current country for ToolTips

  const [clickedCountry, setClickedCountry] = useState(""); // -> state sets clicked country

  let history = useHistory();

  const handleClick = (e) => {
    setttCountry(e);
  };

  const handleClickTwo = (geo) => {
    setClickedCountry(geo.properties.ISO_A3); // -> function sets ClickedCountry
  };

  //-------------------------------- Two functions get centroid fron svg and centered it on screen
  const projection = () => {
    return geoTimes()
      .translate([800 / 2, 450 / 2])
      .scale(160);
  };

  const handleGeographyClick = (geography, country) => {
    if (clickedCountry === country) {
      history.push(`/${clickedCountry}`);
    } else {
      const path = geoPath().projection(projection());
      const centroid = projection().invert(path.centroid(geography));
      setCenter(centroid);
    }
  };
  //----------------------------------------------------------------------------------------------------

  if (wfCateg === "") {
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
              stroke="#CFD8DC"
              strokeWidth="0.2"
            />
            <Graticule globe={true} strokeWidth="0.1" stroke="#CFD8DC" />
            <Geographies disableOptimization geography={mapData}>
              {(geos, proj) =>
                geos.map((geo, i) => {
                  const isClicked = clickedCountry === geo.properties.ISO_A3;

                  return (
                    <Geography
                      key={geo.properties.ISO_A3 + i}
                      geography={geo}
                      projection={proj}
                      style={{
                        default: {
                          fill: !isClicked ? "#82cdff" : "#f2d35f",
                          stroke: "#22A3FA",
                          strokeWidth: 0.3,
                          outline: "none",
                        },
                        hover: {
                          fill: "#F2DB83",
                          stroke: "#22A3FA",
                          strokeWidth: 0.3,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#ffc26f",
                          stroke: "#22A3FA",
                          strokeWidth: 0.3,
                          outline: "none",
                        },
                      }}
                      data-tip
                      data-for="countryTip"
                      onMouseEnter={() => {
                        const { NAME } = geo.properties;

                        setTooltipContent(`${NAME}`);
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
        <Choropleth
          center={center}
          setTooltipContent={setTooltipContent}
          handleClick={handleClick}
          handleGeographyClick={handleGeographyClick}
          handleClickTwo={handleClickTwo}
          wfCateg={wfCateg}
          setWfCategUnits={setWfCategUnits}
          wfCategUnits={wfCategUnits}
          wfCategName={wfCategName}
        />
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
`;

export default MenuGlobe;
