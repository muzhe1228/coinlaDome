import styled from "styled-components";

export const HomeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.359551rem 0 0.958801rem 0;
`;

export const HomeL = styled.div`
  width: 2.47191rem;
  height: 3.453184rem;
  border-radius: 0.089888rem;
  margin-right: 0.149813rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const HomeC = styled(HomeL)`
  width: 2.397004rem;
`;
export const HomeR = styled.div`
  width: 2.397004rem;
  height: 3.453184rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const HomeRT = styled.div`
  width: 100%;
  height: 1.707865rem;
  border-radius: 0.089888rem;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const HomeRB = styled(HomeRT)`
  height: 1.573034rem;
`;

export const ListWrapper = styled.div`
  position: relative;
  padding-left: 0.2rem;
  > img {
    width: 100%;
    border-radius: 0.1rem;
  }
  > h2 {
    width: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
    font-size: 0.36rem;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    text-align: center;
    color: #fff;
  }
`;
