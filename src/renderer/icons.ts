import styled, { css } from "styled-components";
import { MdClose, MdDragHandle, MdEdit } from "react-icons/md";

const iconStyles = css`
  height: 100%;
  width: 33.3333%;
  cursor: pointer;
`;

export const Close = styled(MdClose)`
  ${iconStyles}
`;

export const Hamburger = styled(MdDragHandle)`
  ${iconStyles}
`;

export const Edit = styled(MdEdit)`
  ${iconStyles}
`;
