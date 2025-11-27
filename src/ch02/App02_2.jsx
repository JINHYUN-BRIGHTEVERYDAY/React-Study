import { use, useState } from "react";


// App02_2 컴포넌트 (부모 컴포넌트)
/**
 * 전체 어플리케이션의 컨테이너 역할
 * 
 */
function App02_2() {
    // 현재 이름 값과 업데이트 함수
    const [name, setName] = useState("");
    // 현재 나이 값과 업데이트 함수
    const [age, setAge] = useState("");
    // ButtonBox 확인 버튼 눌렀을 때 DisplayBox에 최종적으로 출력될 값
    const [ displayName, setDisplayName ] = useState("");
    // ButtonBox 확인 버튼 눌렀을 때 DisplayBox에 출력될 나이 값
    const [ displayAge, setDisplayAge ] = useState("");

    return <div>
        {/* props 전달 (단방향 데이터 흐름) */}
        {/* <InputBox>**에게는 입력 값 (name, age)과 업데이트 함수 (setName, setAge)를 전달하여 값을 입력받도록 */}
        <InputBox name={name} setName={setName} age={age} setAge={setAge} />
        {/* <ButtonBox>에게는 현재 입력 값 (name, age)과 출력 값 업데이트 함수 (setDisplayName, setDisplayAge)를 전달하여 클릭 이벤트를 처리하도록 */}
        <ButtonBox setDisplayName={setDisplayName} setDisplayAge={setDisplayAge} name={name} age={age}/>
        {/* <DisplayBox>에게는 최종 출력 값 (displayName, displayAge)을 전달하여 화면에 표시하도록 */}
        <DisplayBox displayName={displayName} displayAge={displayAge} />
    </div>
}

export default App02_2;



//구조분해 원칙 잘 지켜주기
// InputBox의 역할은 부모로부터 받은 Props (상태값과 세터 함수)를 사용하여 사용자 입력을 처리하기

/*
제어 컴포넌트: <input> 태그의 value에 name과 age를 연결하고, onChange 이벤트를 통해 setName과 setAge를 호출하여 부모의 상태를 업데이트한다.
React에서는 이렇게 상태가 <input>의 값을 제어하는 것을 제어 컴포넌트 (Controlled Component)
*/

// Props 수신 : name, setName, age, setAGe 구조분해 할당으로 받기
function InputBox({name, setName, age, setAge}) {

    // 변수인데 왜 계속 const 처리하나 -> 함수의 정의
    const handleNameInputOnChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value);
    }


    /*
    const로 함수 정의: handleNameInputOnChange 함수를 const로 정의하는 것은 JavaScript의 일반적인 방식입니다. 함수를 변수에 할당하는 것이며, React 컴포넌트 내에서 이벤트 핸들러를 정의할 때 주로 사용됩니다
    */
    const handleAgeInputOnChange = (e) => {
        console.log(e.target.value);
        setAge(e.target.value);
    }

    return <div className="input-box">
        {/* 입력받은 값을 어떻게든 처리해야 함 -> onChange 필수 */}
        {/* e.target -> 이벤트가 일어난 대상, input의 요소 */}
        <input type="text"  value={name} onChange={handleNameInputOnChange} />
        <input type="text"  value={age} onChange={handleAgeInputOnChange} />
    </div>
}



// ButtonBox는 사용자의 의도(확인)를 포착하고 이를 통해 부모의 상태를 변경하는 역할
// Props 수신: 현재 입력 값 (name, age)과 최종 출력 상태를 변경할 함수 (setDisplayName, setDisplayAge)를 받기
// Props도 구조분해로 받음
function ButtonBox({setDisplayName, setDisplayAge, name, age}) {


    /*
    이벤트 로직:
    handleOnClick 함수가 버튼 클릭 시 실행된다

    이 함수는 현재 입력 필드에서 받은 값 (name, age)을 최종 출력 상태 (displayName, displayAge)로 복사하도록 부모의 세터 함수를 호출한다
    */
    const handleOnClick = () => {
        setDisplayName(name);
        setDisplayAge(age);
    }

    /* ButtonBox는 데이터를 직접 소유하지 않지만, 부모의 **데이터를 변경할 수 있는 권한(세터 함수)**을 Props로 전달받아 실행함으로써 부모 컴포넌트의 리렌더링을 유발 */
    return <div className="button-box">
        <button onClick={handleOnClick}>확인</button>
    </div>
}

/**
 * 렌더링
 * Props
 * 이벤트 
 */

// DisplayBox 컴포넌트 (데이터 출력)
// DisplayBox는 가장 단순한 역할, 즉 부모로부터 받은 데이터를 화면에 표시하는 역할만 수행합니다.
// Props 수신: displayName과 displayAge를 받음
function DisplayBox({displayName, displayAge}) {
    return <div className="display-box">
        <ul>
            {/* 데이터 출력: 받은 값을 <li> 태그 내에 출력 */}
            {/* 이 컴포넌트는 오직 Props에 의존하여 렌더링되므로 순수 함수의 특성 */}
            <li>{displayName}</li>
            <li>{displayAge}</li>
        </ul>
    </div>
}