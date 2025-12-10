import axios from "axios";
import { useState } from "react";

function Auth01() {
    const [ inputValue, setInputValue ] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
    });

    const [ inputMessage, setInputMessage ] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
    })


    // 정규표현식 사용하기
    const regexs = {
        username: {
            regex: /^[a-z0-9_-]{5,20}$/,
            message: "아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
        },
        password: {
            regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z0-9^A-Za-z0-9\W]{8,16}$/,
            message: "비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
        },
        name: {
            regex: /^[가-힣]{2,6}$/,
            message: "이름: 2~6자의 한글을 사용해주세요.",
        },
        email: {
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
            message: "이메일 형식을 사용해주세요.",
        },
    }


    const handleInputOnchange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        });

        // 정규표현식에 대한 테스트 조건 검사 : 현재 입력된 값이 정규표현식에 부합하는가
        // 유효성 검사하여 메시지를 출력할 것인지
        if (regexs[e.target.name].regex.test(e.target.value)) {
            setInputMessage({
                ...inputMessage,
                [e.target.name]: "",
            });
        } else {
            setInputMessage({
                ...inputMessage,
                [e.target.name]: regexs[e.target.name].message,
            });
        }
    }

    const handleSignupOnClick = () => {
        if (Object.values(inputMessage).map(message => !!message).includes(true)) {
            alert("입력하신 가입정보를 다시 확인해주세요");
            return;
        }

        // if에 걸리지 않는다면 정상적으로 회원가입을 승인
        signupRequest();
    }


    // 백엔드에 회원가입 요청 보내기
    const signupRequest = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup", inputValue);
            console.log(response);
            alert("회원가입 완료");
        } catch (error) {
            console.log(error);
        }
    }


    return <>
        <div>
            <div>
                <input type="text" placeholder="사용자이름" name="username" value={inputValue.username} onChange={handleInputOnchange} />
                <span>{inputMessage.username}</span>
            </div>
            <div>
                <input type="text" placeholder="비밀번호" name="password" value={inputValue.password} onChange={handleInputOnchange} />
                <span>{inputMessage.password}</span>
            </div>
            <div>
                <input type="text" placeholder="이름" name="name" value={inputValue.name} onChange={handleInputOnchange} />
                <span>{inputMessage.name}</span>
            </div>
            <div>
                <input type="text" placeholder="이메일" name="email" value={inputValue.email} onChange={handleInputOnchange} />
                <span>{inputMessage.email}</span>
            </div>
            <button onClick={handleSignupOnClick}>가입하기</button>
        </div>
    </>

}

export default Auth01;