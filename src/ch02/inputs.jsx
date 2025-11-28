import { useState } from "react";

function inputs() {

    const [fullName, setFullName] = useState("");
    const [age, setAge ] = useState("");



    // 이벤트함수
    const handleInputNameOnChange = (e) => {
        setFullName(e.target.value);
    }

    const handleInputAgeOnChange = (e) => {
        setAge(e.target.value);
    }


    // 리턴부터 입력
    return <>
        <input type="text" onChange={handleInputNameOnChange} placeholder="이름" />
        <input type="text" onChange={handleInputAgeOnChange} placeholder="나이" />
        <h2>이름: {fullName}</h2>
        <h2>나이: {age}</h2>
    </>
}


export default inputs;