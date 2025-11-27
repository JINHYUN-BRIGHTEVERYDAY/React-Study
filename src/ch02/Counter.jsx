import React, { useState } from 'react';

function Counter() {
    
    // 구조분해를 하지 않았다면
    /* let numberState = useState(0);
    let number = numberState[0];
    let setNumber = numberState[1]; */
    
    let num = 0; // 0 으로 초기화
    // 구조분해
    let [number, setNumber] = useState(0);

    // 앞에 use가 붙는 함수 Hook 함수
    // 대문자로 시작하는 함수 -> 컴포넌트
    // 그 이외의 함수는 모두 일반적인 함수


    
    console.log(number);


    // 사이트를 다시 열거나 새로고침하지 않으면 상태는 계속 같은 상태를 유지한다
    // -> useState의 특징
    


    // let numState = useState(0);
    // useState (undefined) 반환 타입 -> 배열 형태
    // useState(숫자) -> 매개변수가 더 이상 비어있지 않음, 배열 형태

  // render가 한 번만 호출됨
  // 화면에 한 번만 그려짐 (페인팅) -> 그러면 초기 상태 0

   /**
    * (2) [0, ƒ]0: 0
    * 1: ƒ ()length: 
    * 2[[Prototype]]: Array(0)
    */

    // console.log(numState);



    // 이벤트함수, 이벤트핸들러
    const increase = () => {
        num += 1;
        console.log(num);
    }


    const decrease = () => {
        num -= 1;
        console.log(num);
    }


     const increaseNumber = () => {
        setNumber(number + 1);
    }


    const decreaseNumber = () => {
        setNumber(number - 1);
    }


    console.log("카운터 화면 렌더링");
    // 한 번만 호출되어 리턴이 다시 되지 않는다


    return (
            <div>
                <h1>{num}</h1>
                {/* 초기 상태에 0으로 된 상태로 화면에 반영 */}
                <button onClick={increase}>+1</button>
                <button onClick={decrease}>-1</button>


                <h1>{number}</h1>
                {/* 초기 상태에 0으로 된 상태로 화면에 반영 */}
                <button onClick={increaseNumber}>+1</button>
                <button onClick={decreaseNumber}>-1</button>
            </div>
    );

}

export default Counter;