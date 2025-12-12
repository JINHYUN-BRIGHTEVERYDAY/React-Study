import { BrowserRouter, Link, Route, RouterProvider, Routes } from "react-router-dom";


// 서브라우트
function Router02() {
    return <BrowserRouter>
       <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/name" element={<Name />} />
            <Route path="/age" element={<Age />} />
            <Route path="/sub/*" element={ 
                    <Routes>
                        <Route path="/address1" element={<h1>주소1</h1>}/>
                        <Route path="/address2" element={<h1>주소2</h1>}/>
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                } />
            <Route path="/sub2/*" element={<Phone />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
}


function Phone() {
    return <div>
        <h1>연락처</h1>
        <Link to={"/sub2/p1"}>p1</Link>
        <Link to={"/sub2/p2"}>p2</Link>
        <Link to={"/sub2/p3"}>p3</Link>
        <Routes>
            <Route path="/p1" element={<h3>010-1234-1234</h3>}/>
            <Route path="/p2" element={<h3>010-5678-5678</h3>}/>
            <Route path="/p3" element={<h3>010-1111-2222</h3>}/>
            <Route path="/*" element={<NotFound />}/>
        </Routes>
    </div>
}


/**
 * 중첩 라우팅:
 * 중첩 라우팅은 부모 컴포넌트의 URL 경로를 공유하면서, 
 * 부모 컴포넌트 내부에 자식 컴포넌트 동적으로 렌더링
 * 
 * 핵심 개념: 상대 경로 (Relative Path)
    v6의 특징: <Route path="/p1">처럼 자식 라우트의 경로는 
    부모 라우트의 경로 (/sub2)를 기준으로 해석됩니다. 
    즉, /sub2와 /p1이 합쳐져 최종 URL은 /sub2/p1이 됩니다. 
    (이전 버전과 달리 앞에 부모 경로를 반복하지 않아도 됩니다.)

    B. 와일드카드 (*)의 역할
    진현님의 코드에서 path="/sub/*" 와 path="/sub2/*"처럼 
    부모 <Route>에 와일드카드를 사용한 것은 해당 경로 
    아래의 모든 경로를 처리하겠다는 의미입니다.

    <Route path="/sub2/*" element={<Phone />} />

    이 라우트는 /sub2로 시작하는 모든 URL (/sub2/p1, /sub2/p2, /sub2/any-thing)에 대해 
    <Phone /> 컴포넌트를 렌더링합니다.
*/



// 함수 호출
function Home() {
    return <div>
        <h1>홈</h1>
        <Link to={"/name"}>이름 페이지</Link>
        <Link to={"/age"}>나이 페이지</Link>
        {/* Link 에 to 연결 -> 이쪽으로 이동하라 */}
    </div>
}


function Name() {
    return <h1>이름이 나오는 페이지 <Link to={"/"}>홈으로</Link></h1>
}


function Age() {
    return <h1>나이가 나오는 페이지 <Link to={"/"}>홈으로</Link></h1>
}



function NotFound() {
    return <h1>페이지를 찾을 수 없습니다 <Link to={"/"}>홈으로</Link></h1>
}


RouterProvider

export default Router02;