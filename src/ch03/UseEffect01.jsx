import { useState } from "react";

function UseEffect01() {
    const [ num1,setNum1] = useState(0);
    const [ num2,setNum2] = useState(0);
    const [ result,setResult] = useState(0);


    // 상태값을 바꾸기 위해서는 Set 함수로 
    const handleNumOnClick = () => {
       setNum1(num1 + 1);
    //    console.log(num1);
    //    console.log(num2);
       setResult(num1 + num2);
    }

    const handleNumOnClick2 = () => {
        setNum2(num2 + 1);
        setResult(num1 + num2);
    }
    
    
    // 버튼을 클릭 할 때마다 숫자가 올라가도록
    return <>
        <button onClick = {handleNumOnClick}>num1 = {num1}</button>
        <button onClick = {handleNumOnClick2}>num2 = {num2}</button>
        <h1>{num1} + {num2} = {result}</h1>
    </>
}

export default UseEffect01;