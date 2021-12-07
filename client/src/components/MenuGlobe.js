import React, { useState } from "react";

import styled, { keyframes } from "styled-components";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

import { geoPath } from "d3-geo";
import { geoTimes } from "d3-geo-projection";

const mapData = require("../assets/world-110m.json");

const mapStyles = {
  width: "600px",
  height: "auto",
};

const MenuGlobe = ({ setTooltipContent }) => {
  const [center, setCenter] = useState([0, 0]);
  const [ttCountry, setttCountry] = useState(null);
  const [clickFlag, setClickFlag] = useState(1);
  const [clickedCountry, setClickedCountry] = useState("");

  const handleClick = (e, coor) => {
    setttCountry(e);
    if (e === ttCountry) {
      setClickFlag(clickFlag + 1);
    }

    console.log(e);
  };

  const handleClickTwo = (geo) => {
    setClickedCountry(geo.properties.ISO_A3);
    // setClickFlag(!clickFlag);
  };

  const projection = () => {
    return geoTimes()
      .translate([800 / 2, 450 / 2])
      .scale(160);
  };

  const handleGeographyClick = (geography) => {
    const path = geoPath().projection(projection());
    const centroid = projection().invert(path.centroid(geography));
    setCenter(centroid);

    // setClickFlag(!clickFlag);
    // redirect to Coyntry profile page
  };
  console.log(clickFlag);
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
            opacity="0.5"
            stroke="#CFD8DC"
            strokeWidth="0.2"
          />
          <Graticule globe={true} strokeWidth="0.1" />
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
                        strokeWidth: 0.5,
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
                      handleGeographyClick(geo);
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
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default MenuGlobe;
