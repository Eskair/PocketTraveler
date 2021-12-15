import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { UsersContext } from "./UsersContext";

const PostsFeed = ({ clickedCountry, newPost }) => {
  const { user } = useContext(UsersContext);
  const [newFeed, setNewFeed] = useState(null);
  const [error, setError] = useState(false);

  // Get All posts related to clicked country

  useEffect(() => {
    fetch(`/api/worldbook-reviews/${clickedCountry}`, {
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
          setNewFeed(data.postsData);
        }
      });
  }, [newPost]);

  if (newFeed) {
    return (
      <Wrapper>
        {newFeed.map((Index) => {
          return (
            <Post key={uuidv4()}>
              <InputFormWrapper>
                <UserDiv>
                  {Index.userName === user ? (
                    <UserSpan>{Index.userName}</UserSpan>
                  ) : (
                    <UserSpanTwo>{Index.userName}</UserSpanTwo>
                  )}

                  {Index.timestamp}
                </UserDiv>
                {Index.post}
              </InputFormWrapper>
            </Post>
          );
        })}
      </Wrapper>
    );
  } else {
    return <LoadingDiv></LoadingDiv>;
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* height: 100%; */
  width: 100%;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  width: 90%;
  border-radius: 15px;
  margin-bottom: 25px;

  font-family: var(--font-body);
  font-size: 12px;
  background-color: white;
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const UserSpan = styled.span`
  font-family: var(--font-body);
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: var(--bright-orange);
  border-radius: 10px;
  margin-right: 20px;
`;

const UserSpanTwo = styled.span`
  font-family: var(--font-body);
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: var(--light-blue);
  border-radius: 10px;
  margin-right: 20px;
`;

const InputFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: flex-start;
  width: 90%;
  border-radius: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export default PostsFeed;
