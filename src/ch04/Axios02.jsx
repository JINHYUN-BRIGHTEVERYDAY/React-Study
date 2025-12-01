import axios from "axios";
import { useState } from "react";

function Axios02() {
    const [ inputValue, setInputValue] = useState({
        username:  "",     
    });

    const [users, setUsers] = useState([]);

    const getUsersApi = async () => {
        // inputValue.username의 값이 서버로 params에 담겨 전달됩니다.
        const response = await axios.get("http://192.168.2.101:8080/users", {params: {username: inputValue.username}});
        setUsers(response.data);
    }

    const handleInputOnChange = (e) => {
        const { name, value } = e.target; 
        setInputValue ({
            ...inputValue,
            [name]: value,
        });
    }

    const handleInputOnKeyDown = (e) => {
        console.log(e);
        if (e.keyCode === 13) {
            getUsersApi();
        }
    }

    const handleSearchOnClick = () => {
        getUsersApi();
    }


    return <>
        <input type="text" 
                name="username" 
                value={inputValue.username} 
                onChange={handleInputOnChange} 
                onKeyDown = {handleInputOnKeyDown} />
        <button onClick={handleSearchOnClick}>검색</button>
          <table>
            <thead>
                <tr>
                    <th>username</th>
                    <th>password</th>
                    <th>name</th>
                    <th>email</th>
                    <th>role1</th>
                    <th>role2</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(u => <tr key={u.username}>
                        <td>{u.username}</td>
                        <td>{u.password}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.roles[0]}</td>
                        <td>{u.roles[1]}</td>
                    </tr>)
                }
            </tbody>
        </table>

    </>
}

export default Axios02;


// 잘못된 코드
// import axios from "axios";
// import { useState } from "react";

// function Axios02() {
//     const [ inputValue, setInputValue] = useState({
//         username:  "",    
//     });

//     const [users, setUsers] = useState([]);

//     const getUsersApi = async () => {
//         const response = await axios.get("http://192.168.2.101:8080/users", {params: {username: inputValue.username}});
//         setUsers(response.data);
//     }


//     const handleInputOnChange = (e) => {
//         const [name, value] = e.target;
//         setInputValue ({
//             ...inputValue,
//             [name]: value,
//         });
//     }

//     const handleInputOnKeyDown = (e) => {
//         console.log(e);
//         if (e.keyCode === 13) {
//             getUsersApi();
//         }
//     }

//     const handleSearchOnClick = () => {
//         getUsersApi();
//     }


//     return <>
//         <input type="text" 
//                 name="username" 
//                 value={inputValue.username} 
//                 onChange={handleInputOnChange} 
//                 onKeyDown = {handleInputOnKeyDown} />
//         <button onClick={handleSearchOnClick}>검색</button>
//          <table>
//             <thead>
//                 <tr>
//                     <th>username</th>
//                     <th>password</th>
//                     <th>name</th>
//                     <th>email</th>
//                     <th>role1</th>
//                     <th>role2</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     users.map(u => <tr>
//                         <td>{u.username}</td>
//                         <td>{u.password}</td>
//                         <td>{u.name}</td>
//                         <td>{u.email}</td>
//                         <td>{u.roles[0]}</td>
//                         <td>{u.roles[1]}</td>
//                     </tr>)
//                 }
//             </tbody>
//         </table>

//     </>
// }

// export default Axios02;


/*

현재 코드는 handleInputOnChange 함수에 두 가지 주요 문제점이 있어, 검색창에 1을 입력해도 상태 업데이트가 제대로 이루어지지 않습니다.

상태 업데이트가 안 되면 inputValue.username이 항상 빈 문자열("")로 유지되어 API 호출 시 검색어가 서버로 전달되지 않습니다.

🛑 현재 코드의 두 가지 문제점
1. 이벤트 객체 비구조화 할당 오류 (가장 큰 문제)
handleInputOnChange 함수 내부에서 이벤트 객체(e)의 속성을 비구조화 할당하는 방식이 잘못되었습니다.

JavaScript

// 문제 코드
const [name, value] = e.target;
e.target은 DOM 요소(여기서는 <input>) 객체입니다. 이 객체를 배열처럼 비구조화 할당하려 하면 name과 value에 원하는 값이 들어가지 않고 예상치 못한 값이 할당되거나 오류가 발생할 수 있습니다.

해결: 입력 필드의 이름(name)과 값(value)은 e.target 객체의 **속성(property)**으로 접근해야 합니다.

2. 고유 key prop 경고 (이전 경고 재발)
리스트를 렌더링하는 users.map 부분에 key prop이 누락되어 있습니다. 이전에 경고를 받았던 부분입니다.

JavaScript

// 문제 코드 (tbody 내부)
users.map(u => <tr> // <tr> 태그에 key prop이 없습니다.
    // ...
</tr>)
✅ 수정된 코드 (문제 해결)
검색창에 입력한 값이 상태에 정상적으로 저장되고 API 호출 시 사용되도록 코드를 다음과 같이 수정해야 합니다.

1. handleInputOnChange 수정
e.target.name과 e.target.value를 사용하도록 수정합니다.

JavaScript

// 수정된 handleInputOnChange
const handleInputOnChange = (e) => {
    // e.target에서 name과 value를 구조 분해 할당
    const { name, value } = e.target; 
    
    setInputValue ({
        ...inputValue,
        // [name]은 "username"이 되며, 해당 키의 값을 value로 업데이트합니다.
        [name]: value,
    });
}
2. key prop 추가
테이블의 각 행(<tr>)에 고유한 키를 추가하여 React 경고를 해결합니다.

JavaScript

// 수정된 <tbody> 부분 (u.username이 고유하다고 가정)
<tbody>
    {
        users.map(u => <tr key={u.username}> // 👈 key={u.username} 추가
            <td>{u.username}</td>
            <td>{u.password}</td>
            // ... 나머지 데이터
        </tr>)
    }
</tbody>


*/