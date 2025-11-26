import { createRoot } from 'react-dom/client'
import App01 from './ch01/App01';

// 컴포넌트
// const name = "김준일" "김준이";

const currentApp = "ch01";

const appObj = {
    ch01 : <App01 />,
    // "ch02" : <App02 />,
}

// 두 개 이상 태그 -> 예외없이 반드시 감싸야
// 열렸으면 닫기

const root = document.getElementById('root');
createRoot(root).render(appObj[currentApp]);