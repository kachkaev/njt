import styled from "styled-components";

const ClickableCode = styled.code`
  border-bottom: 1px dotted rgba(27, 31, 35, 0.05);
  .js & {
    cursor: pointer;
    border-bottom: 1px dotted #24292e66;
    :active {
      background: #e3e3e3;
    }
  }
`;

export default ClickableCode;
