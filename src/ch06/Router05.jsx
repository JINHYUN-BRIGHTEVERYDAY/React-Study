import { BrowserRouter, Link, Route, Routes, useLocation, useParams, useSearchParams } from "react-router-dom";


// params - useParams()
function Router05() {
    return <BrowserRouter>
        <div>
            <Link to={"/p1/jinhyun/30"}>p1</Link>
            <div></div>
            <Link to={"/p2/jinhyun/31"}>p2</Link>
        </div>

        <Routes>
            <Route path="/p1/:name/:age" element={<Page1 />} />
            <Route path="/p2/:name/:age" element={<Page2 />} />

            {/* 라우트 정의 */}

        </Routes>
    </BrowserRouter>
}

function Page1() {
    // const params = useParams();
    // console.log(params);

    const {name, age} = useParams();

    /**
     * useParams()는 라우트 정의에 명시된 매개변수 키(:name, :age)와 
     * 그에 해당하는 URL 값(예: jinhyun, 30)을 가진 객체를 반환합니다.

      구조 분해 할당(Destructuring assignment)을 사용하여 
      params.name과 params.age 대신 name과 age 변수에 직접 값을 할당했습니다. (매우 깔끔한 방식입니다!)
     * 
     * 
     * */ 

    const location = useLocation();

    // useLocation (위치 정보 객체) 분석
    /**
     * useLocation 훅은 현재 URL 경로, 쿼리 파라미터, 히스토리 상태 등 
     * 현재 위치에 대한 모든 정보를 담고 있는 Location 객체를 반환
     * 
     */
    console.log(location);

    

    return <div>
        <h3>이름: {name}</h3>
        <h3>나이: {age}</h3>
    </div>
}



function Page2() {
    // const params = useParams();
    // console.log(params);
    const {name, age} = useParams();

    // const location = useLocation();
    const { pathname } = useLocation();
    

    return <div>
        <h3>이름: {name}</h3>
        <h3>나이: {age}</h3>
    </div>
}


export default Router05;

