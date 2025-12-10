
import axios from "axios";
import { useEffect, useState } from "react";

function Auth02() {
    const [ inputValue, setInputValue ] = useState({
        username: "",
        password: "",
    });

    const [ inputMessage, setInputMessage ] = useState({
        username: "",
        password: "",
    });

    // 로그인 버튼 비활성화 상태
    const [ signinButtonDisabled, setSigninButtonDisabled ] = useState(true);

    // 로그인 시의 정규표현식
    const regexs = {
        username: {
            regex: /^[a-z0-9_-]{5,20}$/,
            message: "아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
        },
        password: {
            regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z0-9^A-Za-z0-9\W]{8,16}$/,
            message: "비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
        },
    }

    // 상태 변화 감지 및 버튼 활성화/비활성화 처리
    useEffect(() => {
        // 모든 입력 필드가 비어있는지 확인
        const isBlank = Object.values(inputValue).includes("");
        
        // 유효성 검사 메시지가 하나라도 있는지 확인 (메시지가 있으면 유효하지 않음)
        const isNotValid = Object.values(inputMessage).some(message => message !== "");
        
        // 비어있거나 유효성 검사에 실패하면 버튼 비활성화 (true)
        setSigninButtonDisabled(isBlank || isNotValid);
    }, [inputValue, inputMessage]); // 💡 inputMessage를 의존성 배열에 추가하여 유효성 검사 결과 즉시 반영

    const handleInputOnChange = (e) => {
        const { name, value } = e.target;
        
        // 1. 입력 값 상태 업데이트
        setInputValue({
            ...inputValue,
            [name]: value,
        });

        // 2. 정규표현식에 대한 검사 및 메시지 상태 업데이트 (비동기 처리)
        if (regexs[name].regex.test(value)) {
            setInputMessage({
                ...inputMessage,
                [name]: "",
            });
        } else {
            setInputMessage({
                ...inputMessage,
                [name] : regexs[name].message,
            });
        }

        // ❌ 이전 코드의 중복된 setSigninButtonDisabled 호출은 제거했습니다. (useEffect가 처리)
    }

    // 버튼 클릭 시 로그인 요청 실행
    const handleSignOnClick = () => {
        signinRequest();
    }

    // 로그인 요청 보내기
    const signinRequest = async () => {
        try {
            // 💡 요청 URL을 로그인 엔드포인트(/signin)로 사용
            const response = await axios.post("http://localhost:8080/api/auth/signin", inputValue);
            const { accessToken } = response.data;
            localStorage.setItem("AccessToken", accessToken);
            
            console.log("로그인 성공:", response.data);
            alert("로그인에 성공했습니다."); 

        } catch (error) {
            // 💡 팝업 메시지 출력 및 콘솔에 상세 에러 출력
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("로그인 요청 중 알 수 없는 오류가 발생했습니다.");
            }
            
            // 콘솔에 실패 상세 정보 출력 (요청하신 부분)
            console.error("로그인 실패 상세 정보:", error);
        }
    }


    // PrincipalRequest 메서드 async await로 처리
    const getPrincipalRequest = async() => {
        try {
            const response = await axios.get("http://localhost:8080/api/auth/principal", {
                headers : {
                    "Authorization": `Bearer ${localStorage.getItem("AccessToken")}`,
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    return <>
        <div>
            {/* 보안을 위해 비밀번호는 type="password"를 사용하는 것을 권장합니다. */}
            <input 
                type="text" 
                placeholder="사용자이름" 
                name="username" 
                value={inputValue.username} 
                onChange={handleInputOnChange} 
            />
            <span>{inputMessage.username}</span>
        </div> 
        <div>
            <input 
                type="password" // 💡 type을 password로 변경
                placeholder="비밀번호" 
                name="password" 
                value={inputValue.password} 
                onChange={handleInputOnChange} 
            />
            <span>{inputMessage.password}</span>
        </div>
        
        {/* 💡 onClick 이벤트와 disabled 상태 값 적용 */}
        <button onClick={handleSignOnClick} disabled={signinButtonDisabled}>
            로그인
        </button> 
    </>
}

export default Auth02;



// import axios from "axios";
// import { useEffect, useState } from "react";

// function Auth02() {
//     const [ inputValue, setInputValue ] = useState({
//         username: "",
//         password: "",
//     });

//     const [ inputMessage, setInputMessage ] = useState({
//         username: "",
//         password: "",
//     });


//     // 로그인 비활성화처리
//     const [ signinButtonDisabled, setSigninButtonDisabled ] = useState(true);


//     // 로그인 시의 정규표현식
//     const regexs = {
//         username: {
//             regex: /^[a-z0-9_-]{5,20}$/,
//             message: "아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
//         },
//         password: {
//             regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z0-9^A-Za-z0-9\W]{8,16}$/,
//             message: "비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
//         },
//     }


//     // 상태함수로 공백과 정규식에 대한 조건 처리 판단
//     useEffect(() => {
//         const isBlank = Object.values(inputValue).includes("");
//         const isNotValid = Object.values(inputMessage).map(message => !!message).includes(true);
//         setSigninButtonDisabled(isBlank || isNotValid);
//     }, [inputValue]);


//     const handleInputOnChange = (e) => {
//         setInputValue({
//             ...inputValue,
//             [e.target.name]: e.target.value,
//         });

//         // 정규표현식에 대한 검사
//         if (regexs[e.target.name].regex.test(e.target.value)) {
//             setInputMessage({
//                 ...inputMessage,
//                 [e.target.name]: "",
//             });
//         } else {
//             setInputMessage({
//                 ...inputMessage,
//                 [e.target.name] : regexs[e.target.name].message,
//             });
//         }

//         setSigninButtonDisabled(Object.values(inputMessage).map(message => !!message).includes(true));
//     }


//     // 버튼 클릭 시에 어떤 변화 ?
//     const handleSignOnClick = () => {
//         signinRequest();
//     }



//     // 로그인 요청 보내기
//     const signinRequest = async () => {
//         try {
//             const response = await axios.post("http://localhost:8080/api/auth/signin", inputValue);
//             const {accessToken} = response.data;
//             localStorage.setItem("AccessToken", accessToken);
//             // console.log(response);
//             // alert("로그인 정상 승인");
//         } catch (error) {
//            alert(error.response.data.message);
//         }
//     }

//     // const handleSignOnClick = () => {
//     //     if (Object.values(inputMessage).map(message => !!message).includes(true)) {
//     //         alert("입력하신 회원 정보를 다시 확인해주세요, 일치하는 정보가 없습니다.");
//     //         return;
//     //     }

//     //     // if에 걸리지 않으므로 로그인 처리를 정상 승인하기
//     //     signinRequest();
//     // }


//     return <>
//         <div>
//             <input type="text" placeholder="사용자이름" name="username" value={inputValue.username} onChange={handleInputOnChange} />
//             <span>{inputMessage.username}</span>
//         </div> 
//         <div>
//             <input type="text" placeholder="비밀번호" name="password" value={inputValue.password} onChange={handleInputOnChange} />
//             <span>{inputMessage.password}</span>
//         </div>
//         <button onClick={handleSignOnClick} disabled={signinButtonDisabled}>로그인</button> 
//         {/* 로그인 비활성화처리 */}
        
//         {/* <button onClick={handleSignOnClick}>로그인</button> */}
//     </>
// }

// export default Auth02;