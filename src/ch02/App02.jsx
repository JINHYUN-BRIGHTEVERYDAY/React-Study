import { useState } from "react";
import "./style.css";

function App02() {
    // console.log("메인 박스")

    // const [tempName, settedName] = useState("기본 이름");
    // const [changedName, originalName] = useState("초기화 이름");


    // name & age (입력 상태): 사용자가 <input>에 현재 타이핑하는 값을 저장합니다. 
    // 초기값은 각각 "이름"과 "나이"로 설정되어 입력창에 표시
    // // input의 value 값이 변하면 동작 (입력 필드 상태)
    const [name, setName] = useState("이름"); 


    //name2 & age2 (출력 상태): 확인 버튼을 눌렀을 때 <div className="display-box">에 최종적으로 보여줄 값을 저장합니다. 
    // 초기값은 "" (빈 문자열)
    // // 확인 버튼이 눌러지면 값이 변하게 됨 (출력 필드 상태)
    const [ name2, setName2 ] = useState("");   

    const [age, setAge] = useState("나이"); // 입력 필드 상태
    const [ age2, setAge2 ] = useState(""); // 출력 필드 상태 
    // 확인 버튼이 눌러지면 나이의 값이 변하도록
 
    // 정적인 데이터 정의하기
    // 제목 등 컴포넌트 내에서 변경되지 않는 정적인 데이터를 저장
    const data = {
        title : "리액트 기초 시작",
        nameValue : "기본 이름", 
        age : "0",
    }


    // 이벤트가 일어나면 동작하는 함수
    // target 존재
    
    // 이름 입력 필드의 값이 변경될 때마다 실행된다
    const handleNameInputOnChange = (event) => {
        console.log(event.target.value); // 1. 현재 입력된 값(value)을 콘솔에 출력하기
        setName(event.target.value); // 2. name 상태를 즉시 업데이트 (리렌더링 유발)
        
    }


    // 나이 입력 필드의 값이 변경될 때마다 실행
    const handleAgeInputOnChange = (event) => {
        console.log(event.target.value); // 1. 현재 입력된 값(value)을 콘솔에 출력하기
        setAge(event.target.value); // 2. age 상태를 즉시 업데이트하기 (리렌더링 유발된다)
    }

    /* 사용자가 키보드를 누를 때마다 event.target.value (입력된 글자)를 사용하여 
    name 또는 age 상태를 업데이트한다
    이로 인해 컴포넌트는 즉시 리렌더링되며, <input value={name}> 덕분에 입력창에 글자가 나타나게 된다 */


    // 확인 버튼을 눌렀을 때 이름과 나이가 바뀌도록
    // 확인 버튼 눌렀을 때 실행
    const handleOkOnClick = () => {
        console.log("클릭!!"); // 클릭 버튼을 눌렀을 때 콘솔에 나오도록
        // setName(event.target.value); 
        setName2(name); // 2. 현재 입력된 이름 (name)을 출력 상태 (name2)로 설정하기
        setAge2(age); // 3. 현재 입력된 나이 (age)을 출력 상태 (age2)로 설정하기


        // 입력한 후에 입력창에는 값을 비워두도록 (UX 개선)
        setName("");
        setAge("");

        /**
         * 흐름: 
         * 이 함수가 호출되면 총 4개의 상태가 변경된다
         * (name2, age2, name, age). 
         * 
         * React는 이 모든 변경 사항을 한 번의 리렌더링에 모아서 처리한다.

         * 결과: 화면 하단(name2, age2)에 입력했던 값이 출력되고, 
         * 입력창(name, age)은 빈 문자열로 초기화된다
         */
    }


    // 리셋 버튼을 눌렀을 때 모두 초기화되어 값을 다 비워버리도록
    const handleResetOnClick = () => {
        setName2(""); // 1. 출력 이름 상태를 비우기
        setAge2(""); // 2. 출력 나이 상태를 비우기
        setName(""); // 3. 입력 이름 상태를 비우기
        setAge(""); // 4. 입력 나이 상태를 비우기

        // 리셋되면 값을 전부 다 비워버리기
        /**
         * handleOkOnClick과 마찬가지로 4개의 상태를 모두 ""로 변경하여
         * 모든 입력 필드와 출력 필드를 비우도록 설정
         * 이로 인해서 컴포넌트가 리렌더링된다
         */
    }




    // const handleNameInputOnChange_confirm = (event) => {
    //     console.log()
    // }



    // 확인 버튼 누르면 이름이 아래에 출력되게끔 바꿔야 함

    // JSX 렌더링 (View Presentation)
    return <div className="main-box">
            <div className="title-box">
                {/* 정적 렌더링 출력 */}
                <h1>제목: {data.title}</h1>
            </div>

            <div className="input-box">
                {/* 이름 값 변경하기 */}
                {/* name 상태 연결 */}
                <input type="text" value={name} onChange={handleNameInputOnChange}/> 
                {/* 나이 값 변경하기 */}
                <input type="text" value={age} onChange={handleAgeInputOnChange}/>
            </div>
            <div className = "button-box">
                {/* 확인 버튼 클릭 */}
                <button onClick={handleOkOnClick}>확인</button>
                {/* 초기화 버튼 클릭 */}
                <button onClick={handleResetOnClick}>초기화</button>
            </div>

            <div className="display-box">
                <ul>
                    {/* 키보드 입력되는 동시다발적으로 변하지 않게끔 */}
                    {/* 데이터 출력: 받은 값을 <li> 태그 내에 출력 */}
                    {/* 이 컴포넌트는 오직 Props에 의존하여 렌더링되므로 순수 함수의 특성 */}
                    <li>이름: {name2}</li>
                    <li>나이: {age2}</li>
                </ul>
            </div>

        </div>
        
}

export default App02;