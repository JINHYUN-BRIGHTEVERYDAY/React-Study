import { BrowserRouter, Link, Route, Routes, useSearchParams } from "react-router-dom";


// params - SearchParams (get요청)
function Router04() {
    return <BrowserRouter>
        <div>
            <Link to={"/p1?name=JINHYUN&age=30"}>p1</Link>
            <div></div>
            <Link to={"/p2?name=JINHYUN2&age=31"}>p2</Link>
        </div>
        <Routes>
            <Route path="/p1" element={<Page1 />} />
            <Route path="/p2" element={<Page2 />}/>
        </Routes>
    </BrowserRouter>
}

function Page1() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    console.log(searchParams.get("name"));
    console.log(searchParams.get("age"));

    return <div>
        <h3>이름: {searchParams.get("name")}</h3>
        <h3>나이: {searchParams.get("age")}</h3>
    </div>
}

function Page2() {

    return <div>

    </div>
}

export default Router04;


/**
 * 
 * useSearchParams 활용 테크닉 (데이터 수정)
    useSearchParams의 강력한 기능은 단순히 데이터를 읽는 것을 넘어 URL의 쿼리 파라미터를 변경하여 페이지 상태를 업데이트할 수 있다는 점입니다.

    A. 쿼리 파라미터 업데이트 (setSearchParams)
    setSearchParams 함수는 새로운 쿼리 파라미터 쌍을 객체 또는 URLSearchParams 인스턴스 형태로 받아 URL을 업데이트합니다.

    예시 1: 특정 값만 변경하고 나머지 값은 유지
    특정 값을 변경할 때, 기존의 다른 쿼리 파라미터를 유지하려면 새로운 URLSearchParams 객체를 생성할 때 기존 값을 포함시켜야 합니다.

    JavaScript

    // Page1 컴포넌트 내에 버튼을 추가한다고 가정
    function Page1() {
        const [ searchParams, setSearchParams ] = useSearchParams();

        const changeNameAndKeepAge = () => {
            // 기존의 모든 파라미터를 새 객체에 복사
            const newParams = new URLSearchParams(searchParams);
            
            // 특정 값 변경/추가
            newParams.set("name", "NEW_JINHYUN");
            
            // URL 업데이트 (URL: /p1?name=NEW_JINHYUN&age=30)
            setSearchParams(newParams); 
        };
        
        // ... JSX ...
    }
    예시 2: 전체 파라미터를 새로운 객체로 덮어쓰기
    모든 파라미터를 새로운 값으로 덮어쓰려면 객체를 전달합니다.

    JavaScript

    const resetParams = () => {
        // 이전 name, age를 무시하고 완전히 새로운 파라미터로 대체됩니다.
        setSearchParams({ category: "react", page: 1 }); 
    };
    B. 파라미터 삭제
    특정 쿼리 파라미터를 URL에서 제거하려면, URLSearchParams 객체의 delete() 메서드를 사용해야 합니다.

    JavaScript

    const deleteAge = () => {
        const newParams = new URLSearchParams(searchParams);
        
        // "age" 키를 제거
        newParams.delete("age"); 
        
        // URL 업데이트 (URL: /p1?name=JINHYUN)
        setSearchParams(newParams); 
    };
    3. 🎯 Page2 컴포넌트에 useSearchParams 적용하기
    진현님이 작성하신 Page2 컴포넌트는 현재 비어있지만, 여기에 useSearchParams를 적용하면 p2 링크에서 전달된 name=JINHYUN2&age=31 값을 읽어와 출력할 수 있습니다.

    JavaScript

    function Page2() {
        // 훅 가져오기
        const [ searchParams ] = useSearchParams();

        // 데이터 읽기
        const name = searchParams.get("name");
        const age = searchParams.get("age");
        
        return <div>
            <h2>Page 2: 쿼리 파라미터 수신</h2>
            <h3>이름: {name}</h3>
            <h3>나이: {age}</h3>
            
            <button onClick={() => { 
                // 새로운 파라미터로 URL 변경 예시 (setSearchParams 사용)
                setSearchParams({ name: name, age: 99, status: "updated" }); 
            }}>
                나이 99로 업데이트
            </button>
        </div>
    }
 * 
 */



