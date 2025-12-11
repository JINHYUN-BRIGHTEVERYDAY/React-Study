import { useState } from "react";
import UserInfoBox from "./UserInfoBox";
// Zustand 훅을 가져오기, setUserInfo를 포함할 것으로 가정
import { useUserInfo, useUserInfoList } from "./store/zustandStore"; 


function Zustand03() { 
    // 1. 로컬 상태 (입력 필드의 실시간 값)
    const [ user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
    });

    // 이 부분이 있으면 안됨
    // const { setUserInfo } = useUserInfo();    
    

    // 배열로 나타낼 것이므로 수정
    const {setUserToList} = useUserInfoList();
    

    // 3.  범용 입력 핸들러: user 객체를 불변적으로 업데이트
    const handleInput = (e) => {
        const { name, value } = e.target;
        
        // 이전 상태를 복사하고 ([...prevUser]), 변경된 필드([name])만 업데이트합니다.
        // 스프레드 사용 <- 복사의 개념이 도입되기 때문
        setUser(prevUser => ({
            ...prevUser, 
            [name]: value,
        }));
    };



    // 4.  확인 버튼 핸들러: 로컬 상태(user)를 전역 상태(Zustand)로 전달
    const handleOnClick = () => {
        // 로컬 상태 user의 최종 값을 Zustand 전역 상태에 저장합니다.
        setUserToList(user);
        console.log("로컬 상태(user)가 Zustand 리스트로 추가되었습니다:", user);
        
        // 추가 후에, 로컬 상태를 초기화 하여 입력 필드를 비우게 됩니다
        setUser({ username: "", email: "", phone: "" });
    }


    return (
        <div>
            <div>
                {/* 모든 input에 name, value, onChange={handleInput} 연결 */}
                <input 
                    type="text" 
                    placeholder="사용자이름" 
                    name="username" // 객체 키와 일치
                    value={user.username} 
                    onChange={handleInput}
                />
                <input 
                    type="text" 
                    placeholder="이메일" 
                    name="email" // 객체 키와 일치
                    value={user.email} 
                    onChange={handleInput}
                />
                <input 
                    type="text" 
                    placeholder="연락처" 
                    name="phone" // 객체 키와 일치
                    value={user.phone} 
                    onChange={handleInput}
                />
                
                {/* 확인 버튼에 handleOnClick 연결 */}
                <button onClick={handleOnClick}>추가</button>
            </div>
            
            {/* UserInfoBox는 이제 prop 없이 Zustand 상태를 직접 읽습니다. */}
            <UserInfoBox /> 
        </div> 
    );
}

export default Zustand03;