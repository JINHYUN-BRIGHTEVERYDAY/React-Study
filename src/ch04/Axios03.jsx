import axios from "axios";
import { useRef, useState } from "react";


function Axios03() {
    // 1. Ref 객체 정의 (입력 필드 참조용)
    const registerInputRef = {
        username: useRef(),
        password: useRef(),
        name: useRef(),
        email: useRef(),
        role1: useRef(),
        role2: useRef(),
    }

    // 2. 등록 폼 상태
    const [ registerInputValue, setRegisterInputValue ] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        role1: "",
        role2: "",
    });


    // 3. 검색 폼 상태
    const [ inputValue, setInputValue ] = useState({
        username: "",
    });


    // 4. 조회된 사용자 목록 상태
    const [ users, setUsers ] = useState([]);


    // --- API 함수 ---


    // 사용자 목록 조회 API (GET)
    const getUsersApi = async () => {
        try {
            const response = await axios.get("http://192.168.2.101:8080/users", {
                params: {
                    aaa: inputValue.username,
                    bbb: "test",
                }
            });
            setUsers(response.data);
            console.log("사용자 조회 성공:", response.data);
        } catch (error) {
            console.error("사용자 조회 실패:", error);
            alert("사용자 조회 실패! 콘솔을 확인해 주세요.");
            setUsers([]);
        }
    }


    // 사용자 등록 API (POST) 및 데이터 변환 처리
    const handleRegisterSubmit = async () => {
        // 핵심: 백엔드 요구사항에 맞게 데이터 변형 (role1, role2 -> roles 배열)
        const { role1, role2, ...data } = registerInputValue;
        
        // 빈 문자열이 아닌 값만 배열에 포함
        const rolesArray = [role1, role2].filter(role => role.trim() !== "");
        data["roles"] = rolesArray;

        console.log("POST 요청 데이터:", data);
        
        try {
            const response = await axios.post("http://192.168.2.101:8080/users", data);
            
            console.log("등록 성공:", response.data);
            alert("사용자 등록 성공!");
            
            // 성공 후 입력 필드 초기화
            setRegisterInputValue({
                username: "",
                password: "",
                name: "",
                email: "",
                role1: "",
                role2: "",
            });
            // 첫 번째 입력 필드에 포커스 이동
            registerInputRef.username.current.focus();

        } catch (error) {
            // 상세 에러 메시지 로깅
            console.error("사용자 등록 실패:", error.response ? error.response.data : error.message);
            alert("사용자 등록 실패! 콘솔을 확인해 주세요.");
        }
    }

    

    // --- 이벤트 핸들러 ---

    

    // 등록 폼 입력값 변경 핸들러
    const handleRegisterInputOnChange = (e) => {
        const { name, value } = e.target;
        setRegisterInputValue({
            ...registerInputValue,
            [name]: value,
        });
    }


    // Enter 키로 다음 입력 필드로 포커스 이동
    const handleRegisterInputNextFocusOnKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            }
        }
    }


    // role2에서 Enter 키 입력 시 등록 함수 호출
    const handleRegisterInputSubmitOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 폼 자동 제출 방지
            handleRegisterSubmit();
        }
    }


    // 검색 폼 입력값 변경 핸들러
    const handleInputOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    }


    // 검색 폼에서 Enter 키 입력 시 검색 실행
    const handleInputOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            getUsersApi();
        }
    }


    // 검색 버튼 클릭 핸들러
    const handleSearchOnClick = () => {
        getUsersApi();
    }



    return (
        <>
            <h2>회원 등록</h2>
            <div>
                {/* 등록 폼 영역 */}
                <div>
                    <input type="text" ref={registerInputRef.username} placeholder="username" name="username" value={registerInputValue.username} onChange={handleRegisterInputOnChange} 
                        onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef.password)} />
                </div>
                
                <div>
                    <input type="password" ref={registerInputRef.password} placeholder="password" name="password" value={registerInputValue.password} onChange={handleRegisterInputOnChange} 
                        onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef.name)} />
                </div>
                
                <div>
                    <input type="text" ref={registerInputRef.name} placeholder="name" name="name" value={registerInputValue.name} onChange={handleRegisterInputOnChange} 
                        onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef.email)} />
                </div>
                
                <div>
                    <input type="text" ref={registerInputRef.email} placeholder="email" name="email" value={registerInputValue.email} onChange={handleRegisterInputOnChange} 
                        onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef.role1)} />
                </div>
                
                <div>
                    <input type="text" ref={registerInputRef.role1} placeholder="role1 (e.g. ROLE_USER)" name="role1" value={registerInputValue.role1} onChange={handleRegisterInputOnChange} 
                        onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef.role2)} />
                </div>
                
                <div>
                    <input type="text" ref={registerInputRef.role2} placeholder="role2 (e.g. ROLE_MANAGER)" name="role2" value={registerInputValue.role2} onChange={handleRegisterInputOnChange} 
                        onKeyDown={handleRegisterInputSubmitOnKeyDown} /> {/* 💡 role2는 등록 함수와 연결 */}
                </div>
                
                {/* 등록 버튼 클릭 시 handleRegisterSubmit 호출 */}
                <button onClick={handleRegisterSubmit}>등록</button>
            </div>
            

            <hr />


            <h2>사용자 검색 및 조회</h2>
            {/* 조회 영역 */}
            <input type="text" 
                name="username" 
                placeholder="검색할 username 입력"
                value={inputValue.username} 
                onChange={handleInputOnChange} 
                onKeyDown={handleInputOnKeyDown} />
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
                    {/* key prop 추가 */}
                    {users.map((u, index) => (
                        <tr key={index}>
                            <td>{u.username}</td>
                            <td>{u.password}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.roles[0] || 'N/A'}</td> {/* roles 배열이 없거나 비어있을 경우 처리 */}
                            <td>{u.roles[1] || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}



export default Axios03;



// -----------------------------------------------------------------------


// 수정 이전 코드

// import axios from "axios";
// import { useRef, useState } from "react";


// // post 요청 보내기
// function Axios03() {
//     const registerInputRef = {
//         username: useRef(),
//         password: useRef(),
//         name: useRef(),
//         email: useRef(),
//         role1: useRef(),
//         role2: useRef(),
//     }


//     const [ registerInputValue, setRegisterInputValue ] = useState({
//         username: "",
//         password: "",
//         name: "",
//         email: "",
//         role1: "",
//         role2: "",
//     });


//     const [ value, inputValue ] = useState({
//         username: "",
//     });
    

//     // users에 대한 건 배열로 처리
//     const [ users, setUsers ] = useState([]);

    
//     // Api 받아오기
//     const getUsersApi = async () => {
//         const response = await axios.get("http://192.168.2.101:8080/users", {
//             params:{
//                 aaa: inputValue.username,
//                 bbb: "test",
//             }
//         });
//         setUsers(response.data);
//     }


//     const handleRegisterInputOnChange = (e) => {
//         const {name, value} = e.target;
//         setRegisterInputValue({
//             ...registerInputValue,
//             [name] : value,
//         });
//     }


//     const handleRegisterInputNextFocusOnKeyDown = (e, nextRef) => {
//         if (e.key === 'Enter') {
//             //    e.target.nextSibling.focus();
//             nextRef.current.focus();

//             // console.log(registerUsernameInputRef) 
//             // console.log(registerPasswordInputRef)
//             // registerPasswordInputRef.current.focus();
//         }
//     }


//     // 클릭하여 해당 정보 찾기
//     const handleSearchOnClick = () => {
//         // API로 처리하여 조회하기
//         getUsersApi();
//     }


//     const handleRegisterInputSubmitOnKeyDown = (e) => {
//         if (e.key == 'Enter') {
//             console.log(registerInputValue);
//             axios.post ("http://192.168.2.101:8080/users", registerInputValue);
//         }
//     }


//     // 입력할 때마다 상태 바꾸기
//     const handleInputOnChange = (e) => {
//         const {name, value} = e.target;
//         // 스프레드 사용
//         setInputValue({
//             ...inputValue,
//             [name] : value, 
//         });
//     }


//     const handleInputOnKeyDown = (e) => {
//         console.log(e);
//         if (e.key === 'Enter') {
//             getUsersApi();
//         }
//     }


//     return <>
//         <div>
//             <div>
//                <input type="text" 
//                         ref={registerInputRef.username} 
//                         placeholder="username" 
//                         name="username"  
//                         value={registerInputValue.username} 
//                         onChange={handleRegisterInputOnChange} 
//                         onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef.password)} 
//                         onFocus={(e) => {console.log(e)}}/> 
//             </div>
                
//             <div>
//                 <input type="text" 
//                         ref={registerInputRef.password} 
//                         placeholder="password" 
//                         name="password"  
//                         value={registerInputValue.password} 
//                         onChange={handleRegisterInputOnChange} 
//                         onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef.name)} />
//             </div>
            
//             <div>
//                 <input type="text" 
//                         ref={registerInputRef.name} 
//                         placeholder="name" 
//                         name="name"  
//                         value={registerInputValue.name} 
//                         onChange={handleRegisterInputOnChange} 
//                         onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef.email)} />
//             </div>
            
//             <div>
//                 <input type="text" 
//                         ref={registerInputRef.email} 
//                         placeholder="email" 
//                         name="email"  
//                         value={registerInputValue.email} 
//                         onChange={handleRegisterInputOnChange} 
//                         onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef.role1)} />
//             </div>
            
//             <div>
//                 <input type="text" 
//                         ref={registerInputRef.role1} 
//                         placeholder="role1" 
//                         name="role1"  
//                         value={registerInputValue.role1} 
//                         onChange={handleRegisterInputOnChange} 
//                         onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef.role2)} />
//             </div>
            
//             <div>
//                 <input type="text" 
//                         ref={registerInputRef.role2} 
//                         placeholder="role2" 
//                         name="role2"  
//                         value={registerInputValue.role2} 
//                         onChange={handleRegisterInputOnChange} 
//                         onKeyDown={(e) => handleRegisterInputNextFocusOnKeyDown(e, registerInputRef)} />
//             </div>
            
//             <button>등록</button>
//         </div>
//         {/* <hr /> value={} onChange={} onKeyDown={}  */}
        
        
//         <input type="text" 
//                     name="username" 
//                     value={inputValue.username} 
//                     onChange={handleInputOnChange} 
//                     onKeyDown = {handleInputOnKeyDown} />
//             <button onClick={handleSearchOnClick}>검색</button>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>username</th>
//                         <th>password</th>
//                         <th>name</th>
//                         <th>email</th>
//                         <th>role1</th>
//                         <th>role2</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         users.map(u => <tr>
//                             <td>{u.username}</td>
//                             <td>{u.password}</td>
//                             <td>{u.name}</td>
//                             <td>{u.email}</td>
//                             <td>{u.roles[0]}</td>
//                             <td>{u.roles[1]}</td>
//                         </tr>)
//                     }
//                 </tbody>
//             </table>

//     </>
// }

// export default Axios03;