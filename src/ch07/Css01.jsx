/** @jsxImportancesource @emotion/react */

import { css } from "@emotion/react";

const box1 = css`
    width: 100px;
    height: 100px;
    background-color: black;
`;

function Css01() {
    return <div css={box1}></div>
}

export default Css01;