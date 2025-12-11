import { createRoot } from 'react-dom/client'
import App01 from './ch01/App01';
import App02 from './ch02/App02';
import App02_2 from './ch02/App02_2';
import App02_3 from './ch02/App02_3';
import App02_4 from './ch02/App02_4';
import Counter from './ch02/Counter';
import Inputs from './ch02/inputs';
import SearchName from './ch02/SearchName';
import UseEffect01 from './ch03/UseEffect01';
import UseEffect03 from './ch03/UseEffect03';
import UseEffect04 from './ch03/UseEffect04';
import Axios01 from './ch04/Axios01';
import Promise01 from './ch04/Promise01';
import Axios02 from './ch04/Axios02';
import Axios03 from './ch04/Axios03';
import Axios04 from './ch04/Axios04';
import Axios05 from './ch04/Axios05';
import Auth01 from './ch05/Auth01';
import Auth02 from './ch05/Auth02';
import Router01 from './ch06/Router01';
import Router02 from './ch06/Router02';
import Router03 from './ch06/Router03';
import Router04 from './ch06/Router04';
import Router05 from './ch06/Router05';
import Css from './ch07/Css';
import Zustand01 from './ch08/Zustand01';
import UserInfoBox from './ch08/UserInfoBox';
import Zustand02 from './ch08/Zustand02';
import Zustand03 from './ch08/Zustand03';

// 컴포넌트
// const name = "김준일" "김준이";

// const currentApp = "ch01_1";
const currentApp = "userInfoBox";

const appObj = {
    ch01 : <App01 />,
    ch02 : <App02 />,
    ch02_2 : <App02_2/>,
    ch02_3 : <App02_3/>,
    ch02_4 : <App02_4 />,
    inputs : <Inputs />,
    counter: <Counter />,
    searchName: <SearchName />,
    useEffect01: <UseEffect01 />,
    useEffect03: <UseEffect03 />,
    useEffect04: <UseEffect04 />,
    axios01: <Axios01 />,
    axios02: <Axios02 />,
    axios03: <Axios03 />,
    axios04: <Axios04 />,
    axios05: <Axios05 />,
    promise01: <Promise01 />,
    auth01: <Auth01 />,
    auth02: <Auth02 />,
    router01: <Router01 />,
    router02: <Router02 />,
    router03: <Router03 />,
    router04: <Router04 />,
    router05: <Router05 />,
    css: <Css />,
    zustand01: <Zustand01 />,
    zustand02: <Zustand02 />,
    userInfoBox: <UserInfoBox />,
    zustand03: <Zustand03 />,
    

    // "ch02" : <App02 />,
    // ch01_1: <h1>ch01_1 렌더링</h1>,
    // ch01_2: BoxComponent(),
    // ch01_3: <BoxComponent />,
    // ch01_4: <BoxComponent></BoxComponent>,
}

// 두 개 이상 태그 -> 예외없이 반드시 감싸야
// 열렸으면 닫기


// -------------------------- 렌더링 절차 --------------------------------
// const root = document.getElementById('root');
// createRoot(root).render(appObj[currentApp]);

// const root = (document.getElementById('root')).render(appObj.ch02);

// // 1. DOM 엘리먼트를 가져와서
// const container = document.getElementById('root');

// // 2. root 객체를 생성하고
// const root = createRoot(container);

// // 3. render() 메서드를 호출합니다.
// root.render(appObj[currentApp]);


// 렌더링을 어떤 거 해야 할지
createRoot(document.getElementById('root')).render(appObj.zustand03);



// function BoxComponent() {
//     // return <div>{<TitleComponent()}</div>
//     // return <div><TitleComponent({title="타이틀" title2="타이틀2"})/></div>
//     // 컴포넌트도 함수이기 때문에 이렇게 객체를 통으로 넣는 것이 가능

//     return <div><TitleComponent title= "타이틀" title2="타이틀2"/></div>
//     // 매개변수로 넘기는데 객체 자체를 넘기는 것
// }

// // function BoxComponent() {
//     // return <div>box</div>
// // }
// // 
// // 


// // props는 매개변수로 '객체'가 넘어온다
// function TitleComponent({title, title2}) {
//     console.log(title);
//     console.log(title2);
//     return <h1>{title2}</h1>
// }

