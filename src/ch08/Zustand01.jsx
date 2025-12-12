import { useState } from "react";
import { useName } from "./store/zustandStore";


// 전역상태 관리 (클라이언트)
function Zustand01() {
    // 1. 로컬 상태 (useState) -> React의 기본적인 상태 관리 방식
    // 주로 useState 훅 사용
    /**
     * 관리 주체 : 상태를 정의하고 사용하는 특정 컴포넌트 및 그 자식 컴포넌트
     * 구현 방식 : const [state, setState] = useState(initialValue);
     * 접근성 : 컴포넌트 내부에서만 직접 접근이 가능,
     * 외부나 다른 컴포넌트와 공유하려면 props 통해 전달해야 한다
     * 
     * 주요 역할: 사용자 입력, 토글 버튼의 ON/OFF, 모달 창 열림/닫힘 등
     * 컴포넌트 생명주기가 밀접하게 연관된 일시적인 UI 상태 관리
     * 
     * 장점: 단순하고 직관적이며, 불필요한 리렌더링 범위가 좁아서 성능 최적화가 용이
     * 단점: 상태 공유를 위해서 Prop Drilling이 발생 가능
     * 
     */
    const [ name1, setName1 ] = useState("진현");
    
    // 2. 전역 상태 (Zustand)
    const { name, setName } = useName(); // name 상태와 setName 함수를 구조 분해 할당
    console.log(name);

    /**
     * 전역 상태 (Global State)
     * 
     * Zustand 스토어처럼 중앙 집중식 메커니즘을 통해서 관리되는 상태
     * 관리 주체 : React 컴포넌트 외부에 독립적으로 생성된 Zustand 스토어
     * 구현 방식 : const useStore = create((set) => {...});
     * 
     * 접근성 : 어플리케이션 내의 모든 컴포넌트에서 스토어를 구독하여 직접 접근하고 수정이 가능
     * props 전달이 필요하지 않다
     * 
     * 주요 역할 : 여러 컴포넌트가 공유해야 하는 핵심 데이터 관리
     * (로그인 상태, 장바구니 목록, 테마 설정, 서버에서 가져온 데이터)
     * 
     * 장점 : Prop Drilling 문제 해결하고 대규모 어플리케이션에서 상태의 일관성과 유지보수성 높여준다
     * 단점 : 상태가 복잡해지면 디버깅이 어려워진다, 명확한 스토어 구조화 중요
     * 
     * 
     */
    

    // name1 상태 업데이트 핸들러
    const handleOnChange1 = (e) => {
        setName1(e.target.value);
    }

    // name (Zustand) 상태 업데이트 핸들러
    const handleOnchange = (e) => {
        setName(e.target.value);
    }

    return <>
        <h1>{name1}</h1>
        
        {/* 🌟 1. name1 (로컬 상태) 입력 필드: onChange={handleOnChange1} 추가 */}
        <input type="text" value={name1} onChange={handleOnChange1} /> 
        
        {/* 🌟 2. name (Zustand 상태) 입력 필드: onChange={handleOnchange} 추가 */}
        <input type="text" value={name} onChange={handleOnchange} /> 
        
        {/* name1을 prop으로 Box1에 전달 */}
        <Box1 name1={name1}></Box1> 
    </>
}

// ... (Box1, Box2, Box3 컴포넌트는 그대로 유지)

function Box1({ name1 }) { 
    return <div>
        <Box2 name1={name1}></Box2> 
    </div>
}

function Box2({name1}) { 
    return <div>
        <Box3 name1={name1}></Box3>
    </div>
}

function Box3({name1}) {
    const {name} = useName(); // Zustand 전역 상태
    
    return <div>
        {/* 로컬 상태 (Prop Drilling) */}
        {name1}
        <div>
            {/* 전역 상태 (Zustand) */}
            {name}
        </div>    
    </div>
}

export default Zustand01;

/**
 *  import { create } from 'zustand'
        const useBear = create((set) => ({
        bears: 0,
        increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
        removeAllBears: () => set({ bears: 0 }),
        updateBears: (newBears) => set({ bears: newBears }),
    }))
 * 
 */


/**
 * Zustand : React 컴포넌트 트리의 어느 곳에서나 업데이트를 할 수 있는 전역 상태 관리
 * 
 * A. 상태 중앙 집중화 (Single Source of Truth)
 * 일반적으로 React에서는 useState와 props를 사용하여 상태 관리
 * 그러나 컴포넌트 트리가 깊어질수록 상태 전달하는 과정이 복잡해진다
 * 
 * Zustand는 이 상태를 한 곳에 모아서 관리하는 스토어 생성
 * 모든 컴포넌트는 중앙화된 스토어에서 필요한 상태를 가져오고 업데이트 할 수 있다
 * 
 * B. 쉬운 상태 접근성
 * Redux와 같은 라이브러리와 달리, Zustand는 복잡한 보일러플레이트(액션,리듀서 등) 없이
 * 단일 훅(useState) 상태 접근이 간으
 * 
 * 
 * 
 * 2. 🚀 Zustand의 주요 특징 및 장점
Zustand는 다음과 같은 특징 덕분에 개발자들 사이에서 높은 평가를 받고 있습니다.

A. 단순함 (Simplicity)
보일러플레이트 최소화: Redux처럼 액션 타입, 액션 생성자, 리듀서 등을 작성할 필요 없이, 간단한 함수 호출로 스토어를 정의하고 상태를 업데이트할 수 있습니다.

JavaScript

// Zustand 스토어 정의 예시
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
B. 성능 (Performance)
선택적 렌더링 (Selective Rendering): 컴포넌트가 스토어의 특정 부분만 선택하여 구독할 수 있습니다. 예를 들어, 5개의 상태 중 1개만 사용한다면, 나머지 4개의 상태가 변경되어도 해당 컴포넌트는 리렌더링되지 않아 성능에 이점을 줍니다.

C. 미들웨어 및 확장성
미들웨어 지원: devtools (개발자 도구 연동), persist (상태 영구 저장), immer (불변성 관리 단순화) 등 다양한 미들웨어를 쉽게 적용하여 복잡한 요구사항도 충족할 수 있습니다.

바닐라 JS 호환: Zustand 스토어는 React 없이도 바닐라 JavaScript 환경에서 사용할 수 있도록 설계되어 있어, 프로젝트가 커지거나 React 외의 다른 프레임워크와 상태를 공유할 때도 유연하게 대처할 수 있습니다.
 */