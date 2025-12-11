import { useUserInfo } from "./store/zustandStore";

function UserInfoBox() {
    const {userInfo} = useUserInfo();

        return <ul>
        <li>사용자명: {userInfo.username}</li>
        <li>이메일: {userInfo.email}</li>
        <li>연락처: {userInfo.phone}</li>
    </ul>
}

export default UserInfoBox;