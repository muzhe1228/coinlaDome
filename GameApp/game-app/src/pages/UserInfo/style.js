import styled from "styled-components";

export const HeaderImage = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  margin: 0.266667rem auto 0;
  span {
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    border: 0.133333rem #2b292f solid;
    background:#e3c877;
    display:inline-block;
    color:white;
    line-height:1.3rem;
    font-size:0.599251rem;
    text-align:center;
    font-weight:bold;
  }

  input{
    display:inline-block;
    width:100%;
    height:100%;
  }
`;

export const UserNameDiv = styled.div`
  font-family: PingFang-SC-Medium;
  font-size: 0.186667rem;
  width: 40%;
  height: 0.426667rem;
  margin: 0.666667rem auto 0px;
  background: #2b292f;
  border-radius: 0.213333rem;
  position: relative;
  span {
    margin-left: 0.16rem;
    color: #aaaaaa;
    line-height:0.426667rem;
  }
  #user_name {
    margin-left: 0.266667rem;
    color: white;
    line-height:0.426667rem;
  }
  .updateName {
    position:absolute;
    width:100px;
    left: 100%;
    color:white;
    text-decoration:underline;
    font-size:14;
  }
`;

export const UserAccountDiv = styled.div`
  font-family: PingFang-SC-Medium;
  font-size: 0.186667rem;
  width: 40%;
  height: 0.426667rem;
  margin: 0.133333rem auto;
  background: #2b292f;
  border-radius: 0.213333rem;
  span {
    margin-left: 0.16rem;
    line-height: 0.426667rem;
    color: #aaaaaa;
  }
  #user_account {
    margin-left: 0.266667rem;
    color: white;
    line-height: 0.426667rem;
  }
`;
