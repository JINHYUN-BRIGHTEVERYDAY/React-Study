// 리액트 컴포넌트 만들 때에 필요
import React from 'react';

// 컴포넌트 만드세요 
// -> src 폴더 안에 대문자로 시작하는 기능을 만들겠다
// 무조건 함수 만들 것이고 -> 만들어진 함수를 export 할 것임


//컴포넌트명은 대문자로, 파일명과 일치시켜야함
function Hello() {
    // return <div>안녕하세요</div>
    return <input type="text" />
}

export default Hello;

// nodejs 환경에서만 import export 가능
// 컴포넌트는 태그 리턴
// 자바스크립트 안에서 쓰이는 태그 -> jsx