import JSXStudy from "./JSXStudy";

function App01() {

    const currentComponent = 1; // 키값

    const componentObj = { // 1이라는 값 가져오기
        1: <JSXStudy />,
        // JSXStudy: <JSXStudy />,
    }
    return componentObj[currentComponent];
    // return componentObj[1];

}

export default App01;