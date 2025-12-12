// -------------- 상하좌우 이동 -----------------------
/** @jsxImportSource @emotion/react */


/**
 * React 상태 관리 (useState) 와 Emotion 라이브러리 사용한
 * 동적 스타일링 및 애니메이션 원리
 */

import { css } from "@emotion/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";



// 정적 스타일 정의하기
const box1 = css`
    width: 100px;
    height: 100px;
    background-color: black;
`;




// 동적 스타일 정의 
// - return문 안에 템플릿 리터럴로 css 감싼 함수
// <div css={box2()}></div>
/**
 * 사용 시 box2()와 같이 함수를 호출하고 있습니다.

    만약 box2가 일반 변수였다면 <div css={box2}></div>로 사용했을 것입니다.

    하지만 함수 형태로 정의되었기 때문에, 
    호출된 결과(css로 감싸진 스타일 문자열)가 React 엘리먼트에 전달됩니다.
 
    3. 결론: 문법은 동적, 기능은 정적
    문법적 관점: 함수로 정의되었으므로 동적 스타일을 구현하기 위한 문법적 틀을 갖추고 있습니다.

    기능적 관점: 함수가 인자를 받지 않고 항상 동일한 CSS(background-color: blue)를 반환하기 때문에, 
    실제 동작은 box1과 같은 정적 스타일과 동일합니다.
 
    * */ 
const box2 = () => {
    return css`
        width: 100px;
        height: 100px;
        background-color: blue;
    `;
}

// 동적 스타일 정의하기
// 상태 기반 동적 스타일 정의 :컴포넌트의 상태(State)나 Props에 따라 스타일이 바뀌어야 할 때, 
// 함수 형태로 스타일을 정의하고 인자(arguments)를 받아 사용
const box3 = (color) => css`
    width: 100px;
    height: 100px;
    background-color: ${color};
`;


// 동적 애니메이션 정의
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


// 동적 애니메이션 정의
// CSS 동적 적용
const movingBox = (position) => css`
    position: absolute;
    top: calc(${position.top}% - ${position.top}px);
    left: calc(${position.left}% - ${position.left}px);
    width: 100px;
    height: 100px;
    background-color: blue;
    transition: all 1s ease-in-out;
`;

/**
 * calc(${position.top}% - ${position.top}px)와 같은 복잡한 계산은 현재 position.top이 0 또는 100이므로 
 * 실제로는 0 또는 100% - 100px로 해석될 것입니다. 
 * 이는 박스의 크기(100px)를 고려하여 컨테이너 끝으로 정확히 이동시키기 위한 의도로 보입니다.
 */

// 상하좌우 이동
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


    // 위치변경 로직
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


/**
 * 코드 개선 및 다음 단계
현재 코드는 절대 위치 이동을 구현했습니다. 다음 단계로 상대 위치 이동을 구현하면 더 유연한 UI 인터랙션을 만들 수 있습니다.

A. 상대 위치 이동으로 전환 (개선 제안)
현재는 버튼을 누를 때마다 0 또는 100으로 이동하지만, 버튼을 누를 때마다 일정 간격(예: 50px)만큼 이동하게 수정할 수 있습니다.

JavaScript

// 개선된 handleMoveButtonOnClick 로직 예시
const STEP = 50; // 이동 간격

const handleMoveButtonOnClick = (e) => {
    switch (e.target.id) {
        case "hight":
            setPosition(prev => ({ ...prev, top: prev.top - STEP }));
            break;
        case "low":
            setPosition(prev => ({ ...prev, top: prev.top + STEP }));
            break;
        case "left":
            setPosition(prev => ({ ...prev, left: prev.left - STEP }));
            break;
        case "right":
            setPosition(prev => ({ ...prev, left: prev.left + STEP }));
            break;
    }
};
진현님은 React 상태와 동적 CSS를 결합하여 사용자 인터랙션을 구현하는 데 성공하셨습니다.

혹시 개선된 상대 위치 이동 로직을 적용한 코드를 살펴보고 싶으신가요, 아니면 박스가 컨테이너를 벗어나지 않도록 경계를 설정하는 방법을 알아볼까요?
 * 
 */











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