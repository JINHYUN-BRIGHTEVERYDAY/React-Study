// -------------- 상하좌우 이동 -----------------------
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";


const box1 = css`
    width: 100px;
    height: 100px;
    background-color: black;
`;


const box2 = () => {

    return css`
        width: 100px;
        height: 100px;
        background-color: blue;
    `;
}


const box3 = (color) => css`
    width: 100px;
    height: 100px;
    background-color: ${color};
`;


const box4 = (left) => css`
    width: 100px;
    height: 100px;
    background-color: green;
    position: relative;
    left: ${left}px;
    transition: left 1s ease-in-out;
`;


const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px auto;
    box-sizing: border-box;
    border: 1px solid #222;
    padding: 20px;
    width: 500px;
    height: 650px;
`;


const buttonController = css`
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 150px;
`;


const controllerTop = css`
    display: flex;
    justify-content: center;
    flex-grow: 1;
`;


const controllerMiddle = css`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
`;


const controllerBottom = css`
    display: flex;
    justify-content: center;
    flex-grow: 1;
`;


const button = css`
    width: 50px;
    height: 50px;
`;


const boxContainer = css`
    position: relative;
    margin-top: 20px;
    box-sizing: border-box;
    border: 1px solid #222;
    width: 100%;
    flex-grow: 1;
`;


const movingBox = (position) => css`
    position: absolute;
    top: calc(${position.top}% - ${position.top}px);
    left: calc(${position.left}% - ${position.left}px);
    width: 100px;
    height: 100px;
    background-color: blue;
    transition: all 1s ease-in-out;
`;


function Css02() {
    const [ color, setColor ] = useState("#000000");
    const [ left, setLeft ] = useState(0);
    const [ position, setPosition] = useState({
        top: 0,
        left: 0,
    })

    const handleMoveOnClick = () => {
        setLeft(left === 0 ? 700 : 0);
    }


    const handleMoveButtonOnClick = (e) => {
        const positionValue = {
            hight: 0,
            low: 100,
            left: 0,
            right: 100,
        }
        if (["hight", "low"].includes(e.target.id)) {
            setPosition({
                ...position,
                top: positionValue[e.target.id],
            });
        } else {
            setPosition({
                ...position,
                left: positionValue[e.target.id],
            });
        }
    }


    return <>
        <button onClick={() => setColor("red")}>빨</button>
        <button onClick={() => setColor("orange")}>주</button>
        <button onClick={() => setColor("yellow")}>노</button>
        <div css={box1}></div>
        <div css={box2()}></div>
        <div css={box3(color)}></div>
        <button onClick={handleMoveOnClick}>이동</button>
        <div css={box4(left)}></div>

        <div css={container}>
            <div css={buttonController}>
                <div css={controllerTop}>
                    <button id="hight" css={button} onClick={handleMoveButtonOnClick}>상</button>
                </div>
                <div css={controllerMiddle}>
                    <button id="left" css={button} onClick={handleMoveButtonOnClick}>좌</button>
                    <button id="right" css={button} onClick={handleMoveButtonOnClick}>우</button>
                </div>
                <div css={controllerBottom}>
                    <button id="low" css={button} onClick={handleMoveButtonOnClick}>하</button>
                </div>
            </div>
            <div css={boxContainer}>
                <div css={movingBox(position)}></div>
            </div>
        </div>
    </>
}


export default Css02;



// --------- 실패작---------------------

// /** @jsxImportSource @emotion/react */

// import { css } from "@emotion/react";
// import { useState } from "react";


// const box1 = css`
//     width: 100px;
//     height: 100px;
//     background-color: black;
// `;


// const box2 = () => {
//     return css`
//         width: 100px;
//         height: 100px;
//         background-color: salmon;
//     `;
// };


// const box3 = (color) => css`
//         width: 100px;
//         height: 100px;
//         background-color: ${color};
//     `;


// const box4 = (left) => css`
//     width: 100px;
//     height: 100px;
//     background-color: green;
//     position: relative;
//     left: ${left}px;
//     transition: left 1s ease-in-out;
// `;

// const container = () => css`
//     width: 1000px;
//     height: 1000px;
//     border: 1px solid #ccc;
//     margin-top: 20px; /* 위에 있는 다른 박스들과 분리 */
//     position: relative; /* movingBox의 절대 위치 기준점 */
// `;

// // 💡 누락된 변수 정의 추가: ReferenceError 해결
// const buttonController = () => css`
//     display: flex;
//     justify-content: space-between;
//     width: 250px;
//     margin-bottom: 20px;
// `;

// const boxContainer = () => css`
//     /* 박스를 담는 공간 스타일 */
//     position: absolute;
//     top: 50px;
//     left: 50px;
//     width: 100px;
//     height: 100px;
// `;

// const movingBox = () => css`
//     width: 100px;
//     height: 100px;
//     background-color: darkblue;
//     /* Box4와 구별하기 위해 색상 변경 및 포지션 제거 */
// `;


// const topButton = () => css`
//     width: 50px;
//     height: 50px;
//     background-color: #fff;
// `;


// const bottonButton = () => css`
//     width: 50px;
//     height: 50px;
//     background-color: #fff;
// `;


// const leftButton = () => css`
//     width: 50px;
//     height: 50px;
//     background-color: #fff;
// `;


// const rightButton = () => css`
//     width: 50px;
//     height: 50px;
//     background-color: #fff;
// `;


// function Css02() {
//     const [ color, setColor ] = useState("#000000");
//     const [ left, setLeft ] = useState(0); // 이동에 대한 상태

//     const handleOnClick = () => {
//         // "이동" 버튼 클릭 시 Box4의 위치를 0px <-> 500px 사이로 토글
//         setLeft(left === 0 ? 500 : 0);
//     }

//     return (
//         <>
//             <button onClick={() => setColor("red")}>빨강</button>
//             <button onClick={() => setColor("orange")}>주황</button>
//             <button onClick={() => setColor("yellow")}>노랑</button>
            
//             <div css={box1}>Box1</div>
//             <div css={box2()}>Box2</div>
//             <div css={box3(color)}>Box3 (색상: {color})</div>
            
//             <button onClick={handleOnClick}>Box4 이동</button>
            
//             {/* 💡 box4 스타일 함수 호출 및 left 상태 전달 */}
//             <div css={box4(left)}>Box4 (좌우 이동: {left}px)</div> 
            
//             <hr style={{marginTop: '40px'}}/>
            
//             <div css={container()}>
//                 {/* 💡 buttonController 함수 호출 */}
//                 <div css={buttonController()}>
//                     <button css={topButton()} >상</button>
//                     <button css={bottonButton()} >하</button>
//                     <button css={leftButton()} >좌</button>
//                     <button css={rightButton()} >우</button>
//                 </div>
//                 {/* 💡 boxContainer 함수 호출 */}
//                 <div css={boxContainer()}>
//                     {/* 💡 movingBox 함수 호출 */}
//                     <div css={movingBox()}>Moving Box (컨트롤 타겟)</div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Css02;




// --------------- 버튼 누르면 움직이게끔 ---------------

// 상하좌우로 이동하게끔


// /**

// /** @jsxImportSource @emotion/react */


// import { css } from "@emotion/react";
// import { useState } from "react";


// const box1 = css`
//     width: 100px;
//     height: 100px;
//     background-color: red;
// `;


// const box2 = () =>  {
//     return css`
//         width: 100px;
//         height: 100px;
//         background-color: blue;
//     `
// }


// const box3 = (color) => css`
//     width: 100px;
//     height: 100px;
//     background-color: ${color};
// `;


// // 이동에 대한 매개변수 받기
// const box4 = (isMoved) => css`
//     width: 100px;
//     height: 100px;
//     background-color: green;
//     transition: transform 0.5s ease-in-out; // 이동에 대한 css
//     transform: ${isMoved ? 'translateX(200px)' : 'translateX(0)'}; 
// `;


// function Css02() {
//     const [ color, setColor ] = useState("#000000");
//     const [ isMoved, setIsMoved ] = useState(false); // 이동에 대한 상태


//     return (
//         <>
//             <button onClick={() => setColor("red")}>빨</button>
//             <button onClick={() => setColor("orange")}>주</button>
//             <button onClick={() => setColor("yellow")}>노</button>
            
//             <div css={box1}>Box1</div> 
//             <div css={box2()}>Box2</div>
//             <div css={box3(color)}>Box3</div>
            
//             {/*  버튼 클릭 시 isMoved 상태를 토글(true로 변경)합니다. */}
//             <button onClick={() => setIsMoved(!isMoved)}>
//                 {isMoved ? "원래대로" : "오른쪽으로 이동"}
//             </button>
            
//             {/* isMoved 상태를 box4 스타일 함수에 전달합니다. */}
//             <div css={box4(isMoved)}>Box4</div>
            
//         </>
//     )
// }

// export default Css02;

//  */