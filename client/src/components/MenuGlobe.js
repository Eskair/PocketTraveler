import React, { useState } from "react";
import styled from "styled-components";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const mapData = require("../assets/110m.json");
const mapCountryTranslate = require("../assets/ISO_country_names.json");

const mapStyles = {
  width: "600px",
  height: "auto",
};

const MenuGlobe = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [ttCountry, setttCountry] = useState(null);

  console.log(ttCountry);

  const handleClick = (e, coor) => {
    setttCountry(e);
  };

  const handleToolT = (e) => {};

  return (
    <Wrapper>
      <ComposableMap
        width={500}
        height={500}
        projection="orthographic"
        projectionConfig={{ scale: 220 }}
        style={mapStyles}
      >
        <ZoomableGlobe>
          <circle
            cx={250}
            cy={250}
            r={220}
            fill="transparent"
            stroke="#CFD8DC"
          />
          <Graticule globe={true} />
          <Geographies
            disableOptimization
            // geography="https://unpkg.com/world-atlas@1.1.4/world/110m.json"
            geography={mapData}
          >
            {(geos, proj) =>
              geos.map((geo, i) => {
                return (
                  <Geography
                    key={geo.id + i}
                    geography={geo}
                    projection={proj}
                    style={{
                      default: {
                        fill: "#DD4132",
                        stroke: "#9E1030",

                        strokeWidth: 0.75,
                        outline: "none",
                        // transition: "all 250ms",
                      },
                      hover: {
                        fill: "#FF6F61",
                        stroke: "#9E1030",
                        strokeWidth: 0.75,
                        outline: "none",
                        // transition: "all 250ms"
                      },
                      pressed: {
                        fill: "#DD4132",
                        stroke: "#9E1030",
                        strokeWidth: 0.75,
                        outline: "none",
                        // transition: "all 250ms"
                      },
                    }}
                    onClick={() => {
                      handleClick(geo.id, geo.geometry.coordinates);
                    }}
                    onMouseEnter={() => {
                      handleToolT(geo.id);
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
  margin-top: 100px;
`;
export default MenuGlobe;
