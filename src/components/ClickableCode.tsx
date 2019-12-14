import styled from "styled-components";

const ClickableCode = styled.code`
  .js & {
    cursor: pointer;
    border-bottom: 1px dotted #24292e66;
    :active {
      background: #e3e3e3;
    }
  }
`;

export default ClickableCode;
