import React, { useState } from "react";
import styled from "styled-components";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";
import { Motion, spring } from "react-motion";
import { geoPath } from "d3-geo";
import { geoTimes } from "d3-geo-projection";

const mapData = require("../assets/world-110m.json");

const mapStyles = {
  width: "800px",
  height: "auto",
};

const MenuGlobe = ({ setTooltipContent }) => {
  const [center, setCenter] = useState([0, 0]);
  const [ttCountry, setttCountry] = useState(null);

  const handleClick = (e, coor) => {
    setttCountry(e);
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
  };

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
            fill="transparent"
            stroke="#CFD8DC"
          />
          <Graticule globe={true} />
          <Geographies disableOptimization geography={mapData}>
            {(geos, proj) =>
              geos.map((geo, i) => {
                return (
                  <Geography
                    key={geo.properties.ISO_A3 + i}
                    geography={geo}
                    projection={proj}
                    style={{
                      default: {
                        fill: "#DD4132",
                        stroke: "#9E1030",

                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#FF6F61",
                        stroke: "#9E1030",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#DD4132",
                        stroke: "#9E1030",
                        strokeWidth: 0.75,
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
