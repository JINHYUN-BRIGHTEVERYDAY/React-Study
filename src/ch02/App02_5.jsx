import { useState } from "react";

function App02_5() {
    const [toDosComplex, setToDosComplex] = useState([]);
    return <>
        <TodoContentInput />
        <TodoContentList />
    </>
    // 흩어져있는 컴포넌트를 하나로 합쳐서 쓰기
    // Input하는 정보들이 다 합쳐지도록
}


function TodoContentInput({toDosComplex, setToDosComplex}) {
    const [complexValue, setComplexValue] = useState("");

    
    const handleOnChange = (e) => {
        setValue(e.target.complexValue);
    }

    const handleOnClick = () => {
        const toDosComplex = {
            complexContent : complexValue,
            writeDate: new Date().toLocaleDateString(),
        }

        setComplexValue([...toDosComplex, toDosSingle]);
        setValue("");
    }

    return <div>
        <input type="text" value={value} onChange={handleOnClick}/>
        <button onClick={handleOnClick}>Todo등록하기</button>
    </div>


}

function TodoContentList({todos}) {
    return <ul>
        {
            todos.map((todo, index) => 
                <li key={index}>
                    내용 : {todo.complexContent} 작성일 : {todo.writeDate}
                </li>
            )
        }
    </ul>
}

export default App02_5;