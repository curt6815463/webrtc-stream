import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [meetId, setMeetId] = useState();
  const history = useHistory();
  const callRemote = async () => {
    history.push("/meet/create");
  };
  const replyRemote = () => {
    if (!meetId) return;
    history.push(`/meet/${meetId}`);
  };
  return (
    <HomeStyled>
      <ControllerBlock>
        <Title>來試試會議功能吧！顆顆</Title>
        <SubTitle>這是一個 peer to peer 的會議功能網站</SubTitle>
        <From>
          <CreateMeetButton
            onClick={() => {
              // history.push("/meet");
              callRemote();
            }}
          >
            建立
          </CreateMeetButton>
          <JoinMeetInput
            onChange={(e) => setMeetId(e.target.value)}
            placeholder="輸入會議 ID"
          ></JoinMeetInput>
          <JoinMeetButton onClick={() => replyRemote()}>
            加入會議
          </JoinMeetButton>
        </From>
      </ControllerBlock>
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 0 16px;
  justify-content: center;
  height: 100%;
`;

const ControllerBlock = styled.div`
  flex: 1;
`;

const Title = styled.div`
  color: #000;
  font-size: 32px;
  font-family: sans-serif;
  margin-bottom: 16px;
`;

const SubTitle = styled.div`
  color: #5f6368;
`;

const From = styled.div`
  display: flex;
  margin-top: 12px;
`;

const CreateMeetButton = styled.div`
  background-color: #1a73e8;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
  margin-right: 30px;
  padding: 8px 12px;
  cursor: pointer;
`;

const JoinMeetInput = styled.input``;

const JoinMeetButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: 16px;
  font-size: 14px;
  cursor: pointer;
`;

export default Home;
