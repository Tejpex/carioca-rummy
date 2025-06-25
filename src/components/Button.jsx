import styled from "styled-components"

export const Button = ({text, func, color}) => {
  return (
    <MyButton onClick={func} color={color}>
      {text}
    </MyButton>
  )
}

const MyButton = styled.button`
  height: 30px;
  background-color: var(--light);
  color: black;
  padding: 5px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 10px;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-style: normal;
  text-align: center;

  &:hover {
    background-color:${(props) => props.color || "var(--primary-light)"};
  }

  @media (min-width: 500px) {
    height: 35px;
    padding: 5px;
    font-size: 14px;
  }

`