import { useState } from "react";

function App02_4() {
    const [todos, setTodos] = useState([]);

    return <>
        <TodoInput todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} />
    </>
}



// TodoInput 컴포넌트 -> 반드시 리턴 필요
function TodoInput({ todos, setTodos }) { // 구조분해
    const [ value, setValue ] = useState({
        // 상태 안에다가 객체 넣기
        writer: "",
        content: "",
        age: "",
    });

    // input 내용 저장하기 위해 이벤트함수 사용
    // 본래는 input별로 만들었음
    const handleOnChange = (e) => {
        const {name, value:inputValue} = e.target;
        setValue({
            ...value,
            [name]: inputValue,
        });
    }

    //등록 버튼을 눌러서 이벤트 동작하도록
    const handleOnClick = () => {
        const todo = {
            // writer: value.writer,
            // content: value.content,
            // 작성날짜 이외에 시간까지 표기되게끔
            ...value,
            writeDate: new Date().toLocaleTimeString(),
        }
        // 스프레드 사용해야 하는데
        setTodos([...todos, todo]);
        // todo배열에 추가하여 만들기
        // 마지막에 새롭게 만든 todo 객체 추가하여 만들기
        setValue({
            writer: "",
            content: "",
            age: "",
        });
    }  

    return <div>
        {/* 텍스트 입력되도록  */}
        {/* 텍스트값 value 값 onChange 이루어지는 것까지 */}
        <input type="text"  name ="writer" value={value.writer} onChange={handleOnChange} placeholder="작성자"/>
        <input type="text"  name ="age" value={value.writer} onChange={handleOnChange} placeholder="나이"/>
        {/* 세 개의 input 사용 */}
        <input type="text"  name ="content" value={value.content} onChange={handleOnChange} placeholder="내용"/>
        {/* 버튼을 누르면 실행되도록 */}

        <button onClick={handleOnClick}>등록</button>
    </div>

}


// TodoInput 컴포넌트 -> 반드시 리턴 필요
// function TodoInput2({ todos, setTodos }) { // 구조분해
//     const [ value, setValue ] = useState("");

//     // input 내용 저장하기 위해 이벤트함수 사용
//     const handleOnChange = (e) => {
//         setValue(e.target.value);
//     }

//     //등록 버튼을 눌러서 이벤트 동작하도록
//     const handleOnClick = () => {
//         const todo = {
//             content: value,
//             // 작성날짜 이외에 시간까지 표기되게끔
//             writeDate: new Date().toLocaleTimeString(),
//         }

//         // 스프레드 사용해야 하는데
//         setTodos([...todos, todo]);
//         // todo배열에 추가하여 만들기
//         // 마지막에 새롭게 만든 todo 객체 추가하여 만들기

//         setValue("");
//     } 

//     return <div>
//         {/* 텍스트 입력되도록  */}
//         {/* 텍스트값 value 값 onChange 이루어지는 것까지 */}
//         <input type="text" value={value} onChange={handleOnClick}/>

//         {/* 버튼을 누르면 실행되도록 */}
//         <button onClick={handleOnClick}>등록</button>
//     </div>
// }


// todos 받아와서 리스트로 처리해야
function TodoList({todos}) {
    return <ul>
        {
            todos.map(todo => 
                <li>작성자: {todo.writer} 작성자나이: {todo.age} 내용: {todo.content} 작성일: {todo.toLocaleTimeString}
                    {/* 내용이 표기되어야 하는데 */}
                </li>) 
        }
    </ul>
}


// Input을 위한 창 여러 개
/**
 * name 입력 -> 클릭 버튼 누르면 이벤트 반영되게끔
 * value 입력
 * 
 * 초기화 버튼 누르면 모두 리셋되게끔
 */


export default App02_4;