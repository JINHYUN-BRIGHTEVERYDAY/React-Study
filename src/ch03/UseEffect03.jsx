import { useEffect, useState } from "react";


function UseEffect03() {
    console.log("Component 함수 호출됨")
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [result, setResult] = useState(0);

    useEffect(() => {
       console.log("마운트"); 
    });


    // 순차적으로 상태변화를 줄 때
    useEffect(() => {
        console.log("num 변화");
        setResult(num1 + num2);
        // dependency
    }, [num1, num2]);

    // setResult(num1 + num2); 무한루프



    // setTimeout(() => {
    //     setNum1(num1 + 1);
    // }, num1 * 1000);

    // setNum1(num1  + 1);

    const handleNumOnClick1 = () => {
        setNum1(num1 + 1);
        setResult(num1 + num2);
    }

    const handleNumOnClick2 = () => {
        setNum2(num2 + 1);
    }

    console.log("JSX 리턴 직전");

    return <>
        <button onClick={handleNumOnClick1}>num1 = {num1}</button>
        <button onClick={handleNumOnClick2}>num2 = {num2}</button>
        <h2>{num1} + {num2} = {result}</h2>
    </>
}

export default UseEffect03;