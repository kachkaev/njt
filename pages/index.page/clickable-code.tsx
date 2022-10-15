import styled from "styled-components";

export const ClickableCode = styled.code`
  border-bottom: 1px dotted transparent;
  color: inherit;
  .js & {
    cursor: pointer;
    border-bottom-color: rgba(27, 31, 35, 0.3);

    :active {
      background: rgba(27, 31, 35, 0.3);
    }
  }

  @media (prefers-color-scheme: dark) {
    .js & {
      border-bottom-color: rgba(127, 127, 127, 0.5);

      .js &:active {
        background: rgba(127, 127, 127, 0.5);
      }
    }
  }
`;
