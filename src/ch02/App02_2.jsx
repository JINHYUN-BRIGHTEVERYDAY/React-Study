import { use, useState } from "react";


// App02_2 컴포넌트 (부모 컴포넌트)
/*
전체 어플리케이션의 컨테이너 역할
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
    const로 함수 정의: handleNameInputOnChange 함수를 const로 정의하는 것은 JavaScript의 일반적인 방식이다. 
    함수를 변수에 할당하는 것이며, React 컴포넌트 내에서 이벤트 핸들러를 정의할 때 주로 사용된다
    */
    const handleAgeInputOnChange = (e) => {
        console.log(e.target.value);
        setAge(e.target.value); // 그러면 상태함수에 의해서 상태 변경이 이루어진다
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

    이 함수는 현재 입력 필드에서 받은 값 (name, age)을 
    최종 출력 상태 (displayName, displayAge)로 복사하도록 부모의 세터 함수를 호출한다
    */
    const handleOnClick = () => {
        setDisplayName(name);
        setDisplayAge(age);
    }

    /* ButtonBox는 데이터를 직접 소유하지 않지만, 
    부모의 데이터를 변경할 수 있는 권한(세터 함수)을 Props로 전달받아 실행함으로써 부모 컴포넌트의 리렌더링을 유발 */
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
// 화면 출력하기
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


/*

이 로직은 React의 핵심인 
단방향 데이터 흐름(Unidirectional Data Flow) 원칙을 정확히 따르는 것.

전체 로직 흐름 (4단계)

1. 초기 렌더링 (Initialization)

상태 초기화:

App02_2 컴포넌트가 처음 렌더링 (화면에 처음 보여주는 단계)될 때, 
네 개의 useState 훅이 호출되어 모든 상태 (name, age, displayName, displayAge)가 초기값("")으로 설정된다.



Props 전달: 

App02_2는 이 초기 상태 값들과 
상태를 업데이트하는 함수들(setName, setAge, setDisplayName, setDisplayAge)을 
자식 컴포넌트들에게 Props로 전달한다.



화면 출력: 

InputBox의 입력 필드는 초기값인 ""(빈 문자열)을 표시하고, 
DisplayBox 또한 displayName과 displayAge의 초기값인 ""를 표시한다.





2. 데이터 입력 (Input Handling)


사용자가 <InputBox>의 입력 필드에 이름을 입력하는 경우를 가정합니다.


이벤트 발생: 
사용자가 입력 필드에 글자를 타이핑하면, 해당 <input> 태그에 연결된 onChange 이벤트가 발생합니다.


핸들러 실행: 
<InputBox> 내부의 handleNameInputOnChange 함수가 실행됩니다.


상태 업데이트 요청: 
이 함수는 Props로 받은 setName(e.target.value)를 호출하여 
App02_2 컴포넌트에 상태 업데이트를 요청합니다.


리렌더링: 
App02_2의 name 상태가 새로운 값으로 변경되고, 
이로 인해 App02_2 컴포넌트와 그 자식 컴포넌트들(InputBox, ButtonBox, DisplayBox)이 리렌더링됩니다.


값 반영: 
리렌더링된 InputBox는 새로운 name Props를 받아 <input value={name}>에 즉시 반영되어, 사용자가 타이핑한 글자가 화면에 나타납니다. (이 시점에서 ButtonBox와 DisplayBox는 아직 변경된 값이 반영되지 않음)






3. 확인 버튼 클릭 (Action Execution)

사용자가 <ButtonBox>의 확인 버튼을 클릭하는 경우입니다.
이벤트 발생: 버튼 클릭 시 onClick 이벤트가 발생합니다.
핸들러 실행: <ButtonBox> 내부의 handleOnClick 함수가 실행됩니다.
상태 업데이트 요청: 이 함수는 현재 입력 값을 Props로 받은 출력 상태 업데이트 함수에 전달합니다.

setDisplayName(name);
setDisplayAge(age);

여기서 name과 age는 현재 입력 필드에 있는 최신 값입니다.




리렌더링:

App02_2의 displayName과 displayAge 상태가 변경되고, 
이로 인해 전체 컴포넌트 트리가 다시 리렌더링됩니다.






4. 화면 출력 (Display Update)


최신 Props 전달: 
리렌더링 시, App02_2는 새롭게 업데이트된 displayName과 displayAge Props를 
DisplayBox에 전달합니다.

화면 반영: 
DisplayBox는 이 새로운 Props를 받아 
화면의 <li> 태그에 최종 확정된 이름과 나이를 출력합니다.

요약하자면, 데이터(name, age)는 InputBox에서 입력되지만, 
실제 화면 출력(displayName, displayAge)은 ButtonBox가 명령하고, 
모든 상태는 부모 컴포넌트(App02_2)가 소유하고 관리하는 구조입니다. 

 */