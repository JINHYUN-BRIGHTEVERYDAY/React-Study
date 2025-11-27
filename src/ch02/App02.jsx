import { useState } from "react";
import "./style.css";

function App02() {
    // console.log("메인 박스")

    // const [tempName, settedName] = useState("기본 이름");
    // const [changedName, originalName] = useState("초기화 이름");

    const [name, setName] = useState("이름"); // input의 value 값이 변하면 동작
    const [ name2, setName2 ] = useState("");   // 확인 버튼이 눌러지면 값이 변하게 됨

    const [age, setAge] = useState("나이");
    const [ age2, setAge2 ] = useState("");  // 확인 버튼이 눌러지면 나이의 값이 변하도록
 
    const data = {
        title : "리액트 기초 시작",
        nameValue : "기본 이름", 
        age : "0",
    }


    // 이벤트가 일어나면 동작하는 함수
    // target 존재
    const handleNameInputOnChange = (event) => {
        console.log(event.target.value);
        setName(event.target.value);
        
    }

    const handleAgeInputOnChange = (event) => {
        console.log(event.target.value);
        setAge(event.target.value);
        
    }


    // 확인 버튼을 눌렀을 때 이름과 나이가 바뀌도록
    const handleOkOnClick = () => {
        console.log("클릭!!"); // 클릭 버튼을 눌렀을 때 콘솔에 나오도록
        // setName(event.target.value); 
        setName2(name);
        setAge2(age);

        // 입력한 후에 입력창에는 값을 비워두도록
        setName("");
        setAge("");
    }

    const handleResetOnClick = () => {
        setName2("");
        setAge2("");
        setName("");
        setAge("");

        // 리셋되면 값을 전부 다 비워버리기
    }



    // 리셋 버튼을 눌렀을 때 다시 원래대로 돌아가도록
    const ResetNameChange = () => {
        originalName(changeName);
    }



    // const handleNameInputOnChange_confirm = (event) => {
    //     console.log()
    // }



    // 확인 버튼 누르면 이름이 아래에 출력되게끔 바꿔야 함

    return <div className="main-box">
            <div className="title-box">
                <h1>제목: {data.title}</h1>
            </div>

            <div className="input-box">
                <input type="text" value={name} onChange={handleNameInputOnChange}/>
                <input type="text" value={age} onChange={handleAgeInputOnChange}/>
            </div>
            <div className = "button-box">
                <button onClick={handleOkOnClick}>확인</button>
                <button onClick={handleResetOnClick}>초기화</button>
            </div>

            <div className="display-box">
                <ul>
                    {/* 키보드 입력되는 동시다발적으로 변하지 않게끔 */}
                    <li>이름: {name2}</li>
                    <li>나이: {age2}</li>
                </ul>
            </div>

        </div>
        
}

export default App02;