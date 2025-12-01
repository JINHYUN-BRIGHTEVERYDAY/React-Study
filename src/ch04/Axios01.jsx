import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

function Axios01() {
    const [ users, setUsers ] = useState([]);
    const [ refetch, setRefetch ] = useState(true);

    /*
    X타입 :
    
    치명적인 문제점 : 통제 불능의 실행

    React에서 컴포넌트 함수 (Axios01)는 렌더링이 일어날 때마다 처음부터 끝까지 다시 실행됩니다.

    실행 시점: X 타입에서 API 호출 코드는 if 조건만 통과하면 렌더링되는 순간 즉시 실행됩니다.

    문제 발생: 
    API 응답이 도착하여 setUsers()를 호출하면 상태가 변경됩니다. 
    상태가 변경되면 React는 다시 렌더링을 시작하고, 렌더링이 시작되면 함수가 다시 실행됩니다.

    setRefetch(false)를 넣어 무한 루프를 피하려고 했지만, 
    이것은 임시방편일 뿐, 다른 상태(예: 다른 useState 변수)가 변경되어 
    렌더링이 다시 일어날 경우에도 불필요한 조건 검사와 로직 실행이 발생합니다. 
    컴포넌트 함수 본문은 순수하게 화면을 그리는 역할만 해야 합니다.
    */

    // Async 와 Await으로 바꾼다면?


    getUsersApi();

    const getUsersApi = async () => {
       console.log("콘솔!!");
            if (refetch) {
                const response = await axios.get("http://192.168.2.101:8080/users")
                console.log(response.data);
                setUsers(response.data);
                // axios 자체가 promise의 역할 수행
                setRefetch(false);
            } 
    }

    useEffect(() => {
        console.log("useEffect!!!");    
    })

    

    /*

    // --------------------- 비교 분석 -----------------------

    Y 타입: 올바른 코드 작성
    
    부수 효과(Side Effect)의 통제
    Y 타입 코드는 useEffect Hook을 사용합니다.

    부수 효과(Side Effect): 
    API 호출, 데이터 구독, 타이머 설정 등은 
    컴포넌트의 주 목적(화면 그리기) 외의 작업을 의미하며, 이를 부수 효과라고 합니다.

    useEffect의 역할: 
    이 부수 효과를 특정 시점에만 실행되도록 
    통제하는 것이 useEffect의 역할입니다.

    실행 시점의 제어: 
    Y 타입에서는 API 호출 로직이 useEffect 콜백 함수 내부에 있으며, 
    이 콜백은 의존성 배열([refetch])에 포함된 값이 변경될 때만 실행됩니다.

    안전성 확보: 처음 렌더링 시 
    refetch가 true이므로 실행 → setRefetch(false) 호출 → 
    refetch가 변경되어 useEffect 다시 실행 → if (refetch) 조건 불충족으로 API 호출 중단. 
    이로써 무한 루프를 구조적으로 방지하고 필요한 시점에만 API를 호출하게 됩니다.
    */

    // useEffect(() => {
    //     if (refetch) {
    //         axios.get("http://192.168.2.101:8080/users")
    //         // axios 자체가 promise의 역할 수행
    //         .then(response => {
    //             setUsers(response.data);
    //             setRefetch(false);
    //         });
    //     }    
    // }, [refetch]);
    

    return <>
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
                    users.map(u => <tr>
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

export default Axios01;