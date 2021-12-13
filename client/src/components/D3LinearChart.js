import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const D3LinearChart = (props) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [units, setUnits] = useState("");
  const svgRef = useRef();

  useEffect(() => {
    setTitle(props.title);
    setUnits(props.units);

    // console.log(typeof props.dataset);
    const fixedDataArr = props.dataset.map((x) => {
      if (typeof x !== "number") {
        return (x = 0);
      } else {
        return (x = x);
      }
    });
    setData(fixedDataArr);
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      const dataArrMaxValue = Math.max(...data);
      const dataArrMinValue = Math.min(...data);

      //   setting up svg
      const w = 250;
      const h = 150;
      const svg = d3
        .select(svgRef.current)
        .attr("width", w)
        .attr("height", h)
        .style("overflow", "visible");
      const xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, w]);
      const yScale = d3
        .scaleLinear()
        .domain([dataArrMinValue, dataArrMaxValue])
        .range([h, 0]);
      const generateScaledLine = d3

        .line()
        .x((d, i) => xScale(i))
        .y(yScale)
        .curve(d3.curveCardinal);

      //   setting the axes
      const formatValue = d3.format(".2s");

      const xAxis = d3
        .axisBottom(xScale)
        .ticks(data.length)
        .tickFormat((i) => i + 7);
      const yAxis = d3
        .axisLeft(yScale)
        .ticks(5)
        .tickFormat((d) => {
          return formatValue(d);
        });

      svg
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${h})`)
        .attr("class", "axisStyled"); //  x text
      svg.append("g").call(yAxis); //  y text

      //   setting up data for svg
      const path = svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr("d", (d) => generateScaledLine(d))
        .attr("fill", "none")
        .attr("stroke", "#63c0ff")
        .attr("stroke-width", 2)
        .style("stroke-linecap", "round");

      const pathLength = path.node().getTotalLength();
      const transitionPath = d3.transition().ease(d3.easeSin).duration(3000);

      path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);
    }
  }, [data]);

  if (data.length !== 0) {
    return (
      <Wrapper>
        <TitleDiv>
          <StyledP>{title}</StyledP>
          <StyledPSmall>{units}</StyledPSmall>
        </TitleDiv>
        <svg ref={svgRef}></svg>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0px 0px 15px;
  /* background-color: var(--light-gray); */
  background: -moz-linear-gradient(
    top,
    #e1eaf0 0%,
    #e1eaf0 57%,
    #aeb6ba 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #e1eaf0 0%,
    #e1eaf0 57%,
    #aeb6ba 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #e1eaf0 0%,
    #e1eaf0 57%,
    #aeb6ba 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  border-radius: 10px;
  width: 350px;
  height: 250px;

  .axisStyled {
    line {
      stroke: rgba(18, 43, 63, 1);
    }
    path {
      stroke: rgba(18, 43, 63, 1);
    }

    text {
      fill: rgba(18, 43, 63, 1);
    }
  }
  svg {
    margin-bottom: 30px;
    shape-rendering: geometricPrecision;
    .line {
      &:hover {
        stroke: #d01e08;
      }
    }
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: baseline;
  width: 80%;
  margin-bottom: 15px;
  border-bottom: 1px solid var(--dark-blue);
`;

const StyledP = styled.p`
  color: #486070;

  font-family: var(--font-body);
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  margin: 0px 5px 5px 5px;
`;

const StyledPSmall = styled.p`
  color: #486070;
  font-size: 12px;
  font-family: var(--font-body);

  font-weight: 400;
  margin: 0;
  margin: 0px 5px 5px 5px;
`;

export default D3LinearChart;
