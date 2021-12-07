import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const CategoriesWF = (props) => {
  const { setWfcateg } = props;

  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(false);

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
    setWfcateg(value);
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
              <OptionSt key={uuidv4()} value={`${objKeys}`}>
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
  left: 20px;
`;

const SelectSt = styled.select`
  background-color: #f2b3f1;
  border: 0px solid #aaa;
  border-radius: 10px;
  color: #486070;
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
  font-family: var(--font-body);
`;

const StyledP = styled.p`
  color: #486070;
  font-size: 12px;
  font-family: var(--font-body);
  margin-left: 10px;
`;

export default CategoriesWF;
