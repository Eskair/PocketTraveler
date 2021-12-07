import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const CategoriesWF = (props) => {
  const { setWfcateg, setWfcategName } = props;

  const [categories, setCategories] = useState(null); // -> sets categories, fetched from mongoBD;
  const [error, setError] = useState(false); // -> sets error state;

  useEffect(() => {
    fetch("/api/worldbook-categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          setError({ status: data.status, message: data.message });
        } else {
          setCategories(data.categories);
        }
      });
  }, []);

  const handleChange = (value) => {
    const valueArr = value.split(",");

    setWfcategName(valueArr[1]);
    setWfcateg(valueArr[0]);
  };

  if (categories !== null) {
    return (
      <Wrapper>
        <SelectSt onChange={(ev) => handleChange(ev.target.value)}>
          <OptionSt value="">Select Field</OptionSt>
          {categories.map((Item) => {
            let objKeys = Object.keys(Item);
            let objValues = Object.values(Item);

            return (
              <OptionSt key={uuidv4()} value={[`${objKeys}`, `${objValues}`]}>
                {objValues}
              </OptionSt>
            );
          })}
        </SelectSt>
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
  position: absolute;
  display: flex;
  left: 40px;
`;

const SelectSt = styled.select`
  background-color: #e43b26;
  border: 0px solid #aaa;
  border-radius: 10px;
  color: white;
  font-size: 12px;
  margin: 0;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
`;

const OptionSt = styled.option`
  background-color: white;
  color: black;
  font-family: var(--font-body);
`;

const StyledP = styled.p`
  color: #486070;
  font-size: 12px;
  font-family: var(--font-body);
  margin-left: 10px;
`;

export default CategoriesWF;
