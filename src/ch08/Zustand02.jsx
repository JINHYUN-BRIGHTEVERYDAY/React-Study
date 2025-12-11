import { useState } from "react";
import UserInfoBox from "./UserInfoBox";
// Zustand 훅을 가져옵니다. setUserInfo를 포함할 것으로 가정합니다.
import { useUserInfo } from "./store/zustandStore"; 

// 컴포넌트 이름은 React 컨벤션에 따라 대문자로 시작하는 것이 좋습니다.
function Zustand02() { 
    
    // 1. 로컬 상태 (입력 필드의 실시간 값)
    const [ user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
    });

    // 2. Zustand 전역 상태에서 업데이트 함수만 가져옵니다.
    // (UserInfoBox가 값을 읽을 것이므로 여기서는 업데이트 함수만 필요합니다.)
    const { setUserInfo } = useUserInfo();
    
    // 3. ✅ 범용 입력 핸들러: user 객체를 불변적으로 업데이트
    const handleInput = (e) => {
        const { name, value } = e.target;
        
        // 이전 상태를 복사하고 ([...prevUser]), 변경된 필드([name])만 업데이트합니다.
        setUser(prevUser => ({
            ...prevUser, 
            [name]: value,
        }));
    };

    // 4. ✅ 확인 버튼 핸들러: 로컬 상태(user)를 전역 상태(Zustand)로 전달
    const handleOnClick = () => {
        // 로컬 상태 user의 최종 값을 Zustand 전역 상태에 저장합니다.
        setUserInfo(user);
        console.log("로컬 상태(user)가 Zustand 전역 상태로 전달됨:", user);
        
        // 옵션: 입력 후 필드를 비우려면:
        // setUser({ username: "", email: "", phone: "" });
    }

    return (
        <div>
            <div>
                {/* 🌟 모든 input에 name, value, onChange={handleInput} 연결 */}
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
                
                {/* 🌟 확인 버튼에 handleOnClick 연결 */}
                <button onClick={handleOnClick}>확인</button>
            </div>
            
            {/* UserInfoBox는 이제 prop 없이 Zustand 상태를 직접 읽습니다. */}
            <UserInfoBox /> 
        </div> 
    );
}

export default Zustand02; // 컴포넌트 이름 컨벤션에 맞게 수정했습니다.