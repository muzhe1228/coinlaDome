import styled from "styled-components";
export const GameInstructionsStyle = styled.div`
    background:rgba(255,255,255,0.3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    .content{
      margin:10% auto 10%;  
      width: 70%;
      height:80%;
      background-color: pink;
      overflow: auto;
      h1{
        text-align:center;
      }
      p{
        text-indent:2em;
        padding:0 20px 12px;
      }
      .buttonView{
        text-align:center;
        button{
        margin:10px 25px 12px;
        width: 80px;
        height: 30px;
        text-align:center;
        background:yellowgreen;
      }
      }
      
    }
`