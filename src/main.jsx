import { createRoot } from 'react-dom/client'
import App01 from './ch01/App01';
import App02 from './ch02/App02';
import App02_2 from './ch02/App02_2';
import App02_3 from './ch02/App02_3';
import Counter from './ch02/Counter';

// 컴포넌트
// const name = "김준일" "김준이";

// const currentApp = "ch01_1";
const currentApp = "ch02_3";

const appObj = {
    ch01 : <App01 />,
    ch02 : <App02 />,
    ch02_2 : <App02_2/>,
    ch02_3 : <App02_3/>,
    counter: <Counter />,

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
createRoot(document.getElementById('root')).render(appObj.ch02_3);



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

