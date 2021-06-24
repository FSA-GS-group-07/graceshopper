import styled from 'styled-components';

//CSS STYLES

export const FixedHeightContainer = styled.div`
  height: 100vh;
  box-sizing: border-box;
  border: 20px solid darkslategrey;
  min-width: 500px;
`;

export const Content = styled.div`
  height: 75vh;
  overflow: auto;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 3rem;
  margin: 10rem;
`;

export const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0 5px 0;
`;

export const CartContainer = styled.div`
  width: 75%;
  padding: 1rem 4rem 3rem 4rem;
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CreateContainer = styled.div`
  max-width: 800px;
  padding: 1rem 4rem 1rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 40px;
  grid-template-columns: repeat(4, 1fr);
  margin: 60px auto;
  max-width: 1000px;
`;

export const ContainerUser = styled.div`
  max-width: 800px;
  padding: 1rem 4rem 1rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const UserList = styled.div`
  width: 100%;
  padding: 1rem 4rem 1rem 4rem;
`;

export const List = styled.div`
  padding: 1rem;
  margin-left: 3rem;
  display: flex;
`;

export const LeftColumn = styled.div`
  width: 60%;
  position: relative;
`;

export const RightColumn = styled.div`
  width: 40%;
  margin-left: 3rem;
`;

export const ContainerSingle = styled.div`
  max-width: 1200px;
  padding: 1rem;
  display: flex;
`;

export const LeftColumnSingle = styled.div`
  width: 60%;
  position: relative;
  padding: 1rem;
`;

export const RightColumnSingle = styled.div`
  width: 40%;
  margin-top: 3rem;
  padding: 3rem;
`;

export const Wrapper = styled.div`
  & {
    position: relative;
  }

  &:hover img {
    filter: brightness(70%);
  }
  &:hover button {
    display: block;
  }
`;

export const AdminControls = styled.div`
  max-width: 1200px;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
`;

export const LargeText = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 3rem;
`;

export const SmallText = styled.span`
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75em;
`;

export const BoldText = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const Text = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1rem;
`;

export const Input = styled.input`
  background-color: white;
  color: black;
  margin-bottom: 0;
  border-color: 2px solid black;
`;

export const Button = styled.button`
  background-color: black;
  border: 2px solid black;
  color: white;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1em;
  margin-right: 1rem;
  &:hover {
    background-color: transparent;
    border: 2px solid black;
    color: black;
  }
`;

export const AdminButton = styled.button`
  background-color: darkred;
  border: 2px solid darkred;
  color: white;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1em;
  margin: 0 1rem 0 1rem;
  &:hover {
    background-color: transparent;
    border: 2px solid darkred;
    color: darkred;
  }
`;

export const QuantityButton = styled.button`
  background-color: transparent;
  border: 2px solid black;
  padding: 0 5px 0 5px 0;
  color: black;
  font-size: 1em;
  margin: 5px;
`;

export const CartButton = styled.button`
  & {
    display: none;
    position: absolute;
    top: 38%;
    left: 23%;
    background-color: transparent;
    border: 2px solid white;
    padding: 0.5rem 1rem 0.5rem 1rem;
    color: white;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.75em;
  }
`;
/* height: 20%;
width: 80%; */
//change text to "+" when media is too small
//css content, after element "::after ::before"

export const Img = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
`;

export const Nav = styled.div`
  font-size: small;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: space-around;
  margin: 1rem;
`;

export const Logo = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 3px;
  font-size: 2rem;
  color: black;
  padding: 0.5rem;
`;

export const NavItems = styled.span`
  padding: 0.5rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const NavItemsRed = styled.span`
  padding: 0.5rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: darkred;
`;
