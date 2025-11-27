import { useState } from "react";

function App02_3() {
    // 전체 todo 객체들을 저장할 배열을 저장할 상태 만들기
    const [ todos, setTodos ] = useState([]);

    return <>
        <TodoInput todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} />
    </>
}

function TodoInput( { todos, setTodos } ) {
    // input 내용 저장할 상태 만들기
    const [value, setValue] = useState("");
    // const [todo, setTodo] = useState();

    // input 내용 value 상태에 저장하기
    const handleOnChange = (e) => {
        setValue(e.target.value);
    } 

    // 등록버튼을 누르면 이 함수가 동작한다
    const handleOnClick = () => {
        // todo 배열에 추가할 todo 객체 생성하기
        const todo = {
            content: value,
            writeDate: new Date().toLocaleTimeString(),
        }

        // 스프레드를 사용하기
        setTodos([...todos, todo]); // todo 배열에 추가하기
        // 새로운 배열을 만들어서 기존의 todo에 들어있던 요소들 스프레드로 다 복사하고
        // 마지막에 새롭게 만든 todo객체를 추가하기

        setValue(""); // input 내용 초기화하기
    }

    return <div>
        <input type="text" value={value} onChange={handleOnChange} />
        <button onClick={handleOnClick}>등록</button>
    </div>
}


function TodoList({todos}) {
    // todos를 받아서 map을 돌려 li 요소 바꾼다음 화면에 출력하기
    // 객체 -> <li> 변환하기
    return <ul>
        {
            // todos 배열을 map으로 순회
            todos.map((todo, index) => 
                // <li> 요소에 index를 key로 추가합니다.
                <li key={index}> 
                    내용: {todo.content} 작성일: {todo.writeDate}
                </li>
            )
        }
    </ul>
}

export default App02_3;