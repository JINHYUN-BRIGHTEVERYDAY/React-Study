import { createRoot } from 'react-dom/client'
import App01 from './ch01/App01';

// 컴포넌트
// const name = "김준일" "김준이";

// const currentApp = "ch01_1";
const currentApp = "ch01_2";

const appObj = {
    ch01 : <App01 />,
    // "ch02" : <App02 />,
    ch01_1: <h1>ch01_1 렌더링</h1>,
    ch01_2: BoxComponent(),
    ch01_3: <BoxComponent />,
    ch01_4: <BoxComponent></BoxComponent>,
}

// 두 개 이상 태그 -> 예외없이 반드시 감싸야
// 열렸으면 닫기

const root = document.getElementById('root');
createRoot(root).render(appObj[currentApp]);

function BoxComponent() {
    return <div><TitleComponent /></div>
}

// function BoxComponent() {
    // return <div>box</div>
// }
// 
// 

function TitleComponent() {
    return <h1>타이틀</h1>
}