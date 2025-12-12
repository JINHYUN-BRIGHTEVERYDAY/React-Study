import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";


// 네비게이션
function Router03() {
    return <BrowserRouter>
        <Layout />
    </BrowserRouter>
}


// Layout 함수, navigate 사용
function Layout() {
    // 훅 함수 가져오기
    const navigate = useNavigate();

    /** 
     * useNavigate: 
     * <Layout /> 컴포넌트가 <BrowserRouter> 내부에 렌더링되므로 
     * useNavigate를 사용할 수 있습니다.
     *  함수 반환하기 */


    /**
     * useNavigate의 다양한 사용법 (History 및 State 관리)
     * 
     * Maps 함수는 단순히 경로 이동만 하는 것이 아니라, 
     * 브라우저의 **히스토리 스택(History Stack)**을 제어하고 
     * 페이지 간에 **임시 데이터(State)**를 전달하는 강력한 기능을 제공
     * 
     * 
     * 사용법,예시,설명
     * 뒤로/앞으로 가기 -> Maps(-1)
     * 브라우저 '뒤로 가기' 버튼과 동일 (히스토리 스택에서 현재 페이지를 제거하고
     * 이전 페이지 이동). Map(2)는 '앞으로 두 번 가기'
     * 
     * 상태 전달(State) -> Maps('/board', { state: { from: 'home' } })
     * URL에는 표시되지 않는 데이터를 이동할 컴포넌트에 함께 전달하기
     * 
     * 대체 이동 (Replace) => Maps('/login', { replace: true })
     * 현재 페이지를 히스토리 스택에 남기지 않고 이동하기
     * (로그인 페이지에서 로그인 성공 후 메인 페이지로 갈 때,
     * 사용자가 뒤로 가기를 눌러도 다시 로그인 페이지로 돌아가지 않게 할 때)
     */


    const handleOnClick = (e) => {
        navigate(`/${e.target.id}`);
    }

    /**
     * e.target.id 사용하여 버튼의 id 속성 (board, customer-center)을 가져와
     * URL 경로로 사용
     * 
     * Maps('/board'), Maps('/customer-center')와 같이 
     * 동적으로 경로를 생성하여 이동
     */

    return <div>
        <header>
            <h1 id="home" onClick={() => handleOnClick()}>홈로고</h1>
            <button id="board" onClick={() => handleOnClick()}>게시판</button>
            <button id="customer-Center" onClick={() => handleOnClick()}>고객센터</button>
            <button id="user-information" onClick={() => handleOnClick()}> 사용자정보</button>
        </header>
        { /* <h1 onClick={handleHomeClick}>홈로고</h1> // e 객체를 전달할 필요 없이 깔끔합니다. */}

        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/board" element={<Board />}/>
            <Route path="/customer-center" element={<CustometCenter />}/>
            <Route path="/user-information" element={<UserInformation />}/>
        </Routes>
    </div>
}


function Home() {
    return <h1>홈 화면</h1>
}

function Board() {
    return <h1>게시판 화면</h1>
}

function CustometCenter() {
    return <h1>고객센터 화면</h1>
}

function UserInformation() {
    return <h1>사용자정보 화면</h1>
}


export default Router03;


/**
 * C. 📤 상태 전달 및 수신 (useLocation)
페이지 이동 시 데이터를 URL에 노출하지 않고 (쿼리 파라미터 대신) 내부적으로 전달하고 싶을 때 state 객체와 useLocation 훅을 사용합니다.

1. 데이터 보내기 (발신 측: Layout 컴포넌트)
Maps 함수의 두 번째 인자인 옵션 객체 안에 state 속성을 사용하여 데이터를 담아 보냅니다.

JavaScript

// Layout 컴포넌트에서
navigate('/user-information', { state: { userName: '진현', isLoggedIn: true } });
2. 데이터 받기 (수신 측: UserInformation 컴포넌트)
useLocation 훅을 사용하여 현재 라우트의 위치(Location) 객체를 가져옵니다. 이 객체의 state 속성 안에 전달받은 데이터가 들어 있습니다.

JavaScript

import { useLocation } from 'react-router-dom';

function UserInformation() {
    // 훅을 사용하여 location 객체를 가져옵니다.
    const location = useLocation(); 
    
    // location.state에서 데이터를 추출합니다.
    // ?. (옵셔널 체이닝)을 사용하여 state가 없을 경우를 대비하는 것이 안전합니다.
    const userName = location.state?.userName; 

    return <h1>사용자정보 화면. 이름: {userName || '없음'}</h1>;
}
 * 
 * 
 */