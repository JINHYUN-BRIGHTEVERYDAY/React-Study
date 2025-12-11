import { useUserInfo, useUserInfoList } from "./store/zustandStore";

function UserInfoBox() {
    const {userInfo} = useUserInfo();

    // 리스트로 받기 위한 상태 선언
    const userInfoList = useUserInfoList(state => state.userInfoList);

    // console.log("UserInfoBox에서 읽은 리스트 출력입니다", userInfoList)


        return (
            // console.log("UserInfoBox에서 읽은 리스트 출력입니다", userInfoList)
        <div>
            <h2>등록된 사용자 리스트 ({userInfoList.length}명)</h2>
            {/* 3. map 함수를 사용하여 배열의 모든 요소를 반복 출력합니다. */}
            {userInfoList.map((user, index) => (
                // 배열 항목에는 반드시 key prop을 넣어줘야 합니다.
                <ul key={index} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
                    <li>사용자명: {user.username}</li>
                    <li>이메일: {user.email}</li>
                    <li>연락처: {user.phone}</li>
                </ul>
            ))}
            
            {/* 리스트가 비어있을 때 메시지 */}
            {userInfoList.length === 0 && <p>등록된 사용자가 없습니다.</p>}
        </div>
    )
        
        
}

export default UserInfoBox;