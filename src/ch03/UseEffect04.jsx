import { useEffect, useState } from "react";

function UseEffect04() {

    // 1. 상태 정의 및 초기화
    const [num, setNum] = useState(0); 
    const [result, setResult] = useState('숫자를 증가시켜 결과를 확인하시오');

    console.log("함수가 호출되었습니다.");

    // 2. 핵심 로직: num이 바뀔 때마다 제곱 값을 계산하고 경고 메시지를 처리
    useEffect(() => {
        console.log("useEffect 실행: num 상태 변경 감지하여 출력 시작");
        
        if (num === 0) {
            alert("숫자를 증가시켜 결과를 확인하시오");

            setResult('숫자를 증가시켜 결과를 확인하시오');

        } else {
            
            const squareValue = num * num;

            setResult(squareValue); 
        }
        
    }, [num]); 

    
    //증가 함수
    const handleIncrease = () => {
        setNum(prevNum => prevNum + 1);
    }


    //감소 함수
    const handleDecrease = () => {
        if (num > 0) {
            setNum(prevNum => prevNum - 1);
        } else {
            alert("최솟값은 0입니다. 0 이하로는 내려갈 수 없습니다.");
        }
    }


    return (
        <>
            <h2>현재 숫자: {num}</h2>
            <button onClick={handleIncrease}>1 증가</button>
            <button onClick={handleDecrease}>1 감소</button>
            
    
            <h2>제곱 결과: {result}</h2>
        </>
    );

}

export default UseEffect04;