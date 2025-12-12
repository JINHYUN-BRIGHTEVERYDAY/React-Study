import { BrowserRouter, Link, Route, RouterProvider, Routes } from "react-router-dom";


function Router01() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/name" element={<Name />} />
            <Route path="/age" element={<Age />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
}

/**
 * <BrowserRouter>
 * HTML5 History API (pushState, replaceState 등)를 사용하여 
 * UI를 URL과 동기화하는 라우터입니다. 
 * 웹 애플리케이션의 최상단에 위치하여 라우팅 기능을 활성화합니다.
 * 
 * <Routes>
    역할: 내부의 <Route>들을 그룹화하고, 현재 URL과 일치하는 첫 번째 <Route>를 찾아서 렌더링합니다. 
    반드시 <BrowserRouter> 내부에 위치해야 합니다.

    <Route>
    특정 path(URL 경로)가 일치할 때 렌더링할 컴포넌트를 정의

    주요 props:
    path : URL 경로
    element : 해당 경로에서 렌더링될 React 엘리먼트

    path="/*": 와일드카드 경로로, 위에 정의된 어떤 경로와도 일치하지 않을 때 
    가장 마지막에 매칭되어 <NotFound /> 컴포넌트를 렌더링합니다. 
    (404 페이지)
 *
*/


function Home() {
    return <div>
        <h1>홈</h1>
        <Link to={"/name"}>이름 페이지</Link>
        <Link to={"/age"}>나이 페이지</Link>
    </div>
}

/**
 * <Link>
 * 선언적으로 페이지 이동시키기
 * 브라우저를 새로고침하지 않고 SPA(Single Page Application)의 특성을 유지하면서,
 * URL을 변경하고 해당 컴포넌트를 렌덜이
 * 
 * 주요 Props: 이동할 URL 경로
 */


function Name() {
    return <h1>이름이 나오는 페이지 <Link to={"/"}>홈으로</Link></h1>
}


function Age() {
    return <h1>나이가 나오는 페이지 <Link to={"/"}>홈으로</Link></h1>
}


function NotFound() {
    return <h1>페이지를 찾을 수 없습니다 <Link to={"/"}>홈으로</Link></h1>
}


/**
 * 코드를 확장하거나 더 복잡한 요구사항을 처리하기 위해 알아두면 
 * 좋은 테크닉들입니다.
 * 
 * URL 매개변수 사용: /users/1, /posts/new-post-title
 * 구현: <Route path="/users/:id" element={<UserDetail />} />
 * 데이터 접근: UserDetail 컴포넌트 내부에서 useParams() 훅을 사용하여 :id 값을 가져옵니다.
 * 
 * 
 *  중첩 라우팅 (Nested Routing)
 *   부모 컴포넌트 내부에 자식 라우트를 정의하여 
 *   레이아웃을 공유하고 계층적인 UI를 구성할 때 사용합니다.

 *   <Route path="/dashboard" element={<DashboardLayout />}>
 *   <Route path="profile" element={<Profile />} /> {/* URL: /dashboard/profile */
 //   <Route path="settings" element={<Settings />} /> {/* URL: /dashboard/settings */}
 //   </Route>


RouterProvider

export default Router01;


/**
 * 탐색 (Navigation) 훅 (useNavigate)
    버튼 클릭, 폼 제출, 비동기 작업 완료 등 특정 이벤트가 발생한 후 
    프로그래밍 방식으로 페이지를 이동시켜야 할 때 사용합니다. 
    
    <Link>는 단순히 클릭 시 이동하지만, useNavigate는 코드 내에서 제어가 가능합니다.


    import { useNavigate } from 'react-router-dom';

        function LoginComponent() {
            const navigate = useNavigate();

            const handleSubmit = () => {
                // 로그인 처리 후
                navigate('/'); // 홈으로 이동
                // 또는 navigate(-1); // 뒤로 가기
            };
            // ...
        }


    URL 쿼리 매개변수 사용 (useSearchParams)
    URL에 포함된 키-값 쌍의 데이터를 읽거나 쓸 때 사용합니다 
    (예: 검색 결과 필터링, 페이지네이션).

    예시: /products?category=electronics&sort=price

    데이터 접근: const [searchParams, setSearchParams] = useSearchParams(); 
    훅을 사용합니다.
 

    RouterProvider (Optional: Advanced/Recommended)
    코드 마지막에 언급된 RouterProvider는 
    React Router v6.4 이상에서 도입된 권장되는 방식입니다.

    장점: 라우팅 설정을 JavaScript 객체로 정의하여 코드를 더 깔끔하게 관리할 수 있고, 
    Data API (Loader, Action)를 사용하여 데이터 fetching을 최적화할 수 있습니다.

    구현: createBrowserRouter 함수로 라우트 객체를 생성한 뒤, 
    <RouterProvider router={...} /> 컴포넌트에 전달합니다.

 * 
 * 
 */