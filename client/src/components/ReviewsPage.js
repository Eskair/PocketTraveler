import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams, useHistory, NavLink } from "react-router-dom";
import Moment from "moment";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { UsersContext } from "./UsersContext";
import PostsFeed from "./PostsFeed";

const ReviewsPage = () => {
  const { user, currUser, email } = useContext(UsersContext);
  const [error, setError] = useState(false);
  const [newPost, setNewPost] = useState("");
  const { clickedCountry } = useParams();

  let history = useHistory();

  useEffect(() => {
    console.log("hello");
  }, [user]);

  const handlenewPost = (e) => {
    setNewPost(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(newPost);

    setNewPost("");
  };

  const onSubmit = (newPost) => {
    console.log(email, clickedCountry, user, newPost);

    fetch("/api/worldbook-reviews/", {
      method: "POST",
      body: JSON.stringify({
        userId: email,
        timestamp: Moment().format("h:mm A • MMM D YYYY"),
        countryTag: clickedCountry,
        userName: user,
        post: newPost,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { status, message } = json;
        if (status === 200) {
          setError(false);
        } else if (status !== 200) {
          setError(message);
        }
      });
  };

  return (
    <WrapperDiv>
      <BlogDiv>
        <HeadDiv>
          <HomeDivLink to={`/${clickedCountry}`}>
            <BackArrow />
          </HomeDivLink>
          <HomeHead>Hello, {user}!</HomeHead>
        </HeadDiv>
        <InputFormWrapper>
          <InputForm onSubmit={handleSubmit}>
            <Input
              value={newPost}
              onChange={handlenewPost}
              placeholder="Write a review..."
            />
            <ButtonDiv>
              <ButtonSt>Submit</ButtonSt>
            </ButtonDiv>
          </InputForm>
        </InputFormWrapper>
        <PostsFeed clickedCountry={clickedCountry} newPost={newPost} />
      </BlogDiv>
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  background-color: var(--dark-blue);
  overflow: hidden;
`;

const BlogDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: center;
  background-color: var(--light-gray);
  width: 75%;
  height: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
  padding: 15px 20px 20px 20px;
  overflow: auto;
`;

const LoadingP = styled.p`
  font-family: var(--font-body);
  font-size: 15px;
  color: #004e82;
  margin-top: 200px;
`;

const HeadDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 90%;
  margin-bottom: 10px;
`;

const HomeHead = styled.h1`
  font-family: var(--font-body);
  color: white;
  font-size: 12px;
  font-weight: 500;
  margin: 0;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: var(--bright-orange);
  border-radius: 10px;
`;
const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const ButtonSt = styled.button`
  background-color: var(--bright-orange);
  border: 0px solid #aaa;
  border-radius: 10px;
  font-size: 12px;
  color: white;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0px 0px 10px 0px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #d01e08;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const Input = styled.textarea`
  width: 100%;
  height: 100px;
  /* padding: :10px; */
  border: none;
  overflow: auto;
  outline: 0px solid black;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  font-size: 14px;
  background-color: white;

  margin: 0px 0px 10px 0px;
  font-family: var(--font-body);
  font-size: 12px;
`;
const InputFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  width: 90%;
  border-radius: 15px;
  margin-bottom: 25px;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  margin: 20px 10px 10px 10px;
`;

const BackArrow = styled(AiOutlineArrowLeft)`
  transform: scale(1.5, 1.5);
  color: var(--dark-blue);
  &:hover {
    color: var(--bright-orange);
  }
`;

const HomeDivLink = styled(NavLink)`
  position: absolute;
  display: flex;
  text-decoration: none;
  margin-right: 25px;
  left: -40px;
  color: var(--dark-blue);
`;

export default ReviewsPage;
