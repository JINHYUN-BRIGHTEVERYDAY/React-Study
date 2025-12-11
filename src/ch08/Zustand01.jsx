import { useState } from "react";
import { useName } from "./store/zustandStore";


// 전역상태 관리 (클라이언트)
function Zustand01() {
    // 1. 로컬 상태 (useState)
    const [ name1, setName1 ] = useState("진현");
    
    // 2. 전역 상태 (Zustand)
    const { name, setName } = useName(); // name 상태와 setName 함수를 구조 분해 할당
    console.log(name);

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