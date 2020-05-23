import styled from "styled-components";

const ClickableCode = styled.code`
  border-bottom: 1px dotted transparent;
  color: inherit;
  .js & {
    cursor: pointer;
    border-bottom-color: rgba(27, 31, 35, 0.3);

    :active {
      background: rgba(27, 31, 35, 0.3);
    }
  }

  .js.dark-mode & {
    border-bottom-color: rgba(127, 127, 127, 0.5);

    :active {
      background: rgba(127, 127, 127, 0.5);
    }
  }
`;

export default ClickableCode;
