import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { StoreContext } from "../components/StoreProvider.js";
const ShareModal = () => {
  const [state] = useContext(StoreContext);
  const [copyState, setCopyState] = useState("");
  const inputRef = useRef();
  const meetId = state.operation.meetId;
  const link = window.location.origin + "/meet/" + meetId;

  const handleCopy = () => {
    inputRef.current.focus();
    inputRef.current.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        return setCopyState("複製成功");
      }
      throw "複製失敗";
    } catch (err) {
      setCopyState(err);
    }
  };

  return (
    <StyledShareModal>
      <Title>可將以下連結分享給別人</Title>
      <Input ref={inputRef} value={link}></Input>
      <ButtonWrapper>
        <CopyButton readonly onClick={handleCopy}>
          複製
        </CopyButton>
        <CopyState>{copyState}</CopyState>
      </ButtonWrapper>
    </StyledShareModal>
  );
};

const StyledShareModal = styled.div`
  position: fixed;
  top: 30px;
  left: 30px;
  width: 360px;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  z-index: 1;
`;

const Title = styled.div`
  font-size: 18px;
  color: #222;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Input = styled.input`
  box-sizing: border-box;
  background-color: #eee;
  border-radius: 4px;
  padding: 16px 8px;
  width: 100%;
  border: none;
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 12px;
`;

const CopyButton = styled.button`
  background-color: #1a73e8;
  color: #fff;
  border: 0px;
  outline: 0px;
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
`;

const CopyState = styled.div`
  color: #555;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-left: 12px;
`;

export default ShareModal;
