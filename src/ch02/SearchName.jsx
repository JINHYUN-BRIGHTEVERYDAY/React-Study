import { useState } from "react";

function SearchName() {
    /*
    문제:
    input 하나를 만들고 입력된 이름과 값과 일치하는 나이를 h2 태그 안에 출력하세요
    이름이 없으면 '값 없음'을 출력하기
    */

    const [name, age] = useState("");

    const profiles = [
        {
            name: "김준일",
            age: 32,
        },
        {
            name: "김준이",
            age: 33,
        },
        {
            name: "김준삼",
            age: 34,
        }
    ]

    const [searchName, setSearchName] = useState("");


    // 이벤트 처리
    const handleInputNameOnChange = (e) => {
        // setFullName(e.target.value);
        // 반복
        setSearchName(e.target.value);
    }

    let foundAge = "값이 없습니다"
    
    for (let i = 0; i < profiles.length; i++) {
        const profile = profiles[i];
        if (profile.name === e.target.value) {
            setResult(profile.age);
            break;
        }
    }



    // forEach
    profiles.forEach((profile) => {
        if (profile.name === e.target.value) {
            setResult(profile.age);
            // break; 함수 안에서는  break 안된다
        }
    })


    // filter
    function findUserInfo() {
        const foundProfile = profiles.filter((profile) => {
            return profile.name === e.target.value;
            // e.target.value 와 연결해야 함
        });
        if (!!foundProfile.length) {
            setResult(foundProfile[0].name);
        }

        const foundProfile2 = profiles.filter((profile) => {
            return profile.age === e.target.value;
            // e.target.value 와 연결해야 함
        });
        if (!!foundProfile.length) {
            setResult(foundProfile[0].age);   
        }
    }

        // return 
        //     <div>
        //         <h2>사용자 정보 조회 결과: {}</h2>
        //     </div>

    // find




    return <>
            <input type="text" value={inputValue} onChange={handleInputNameOnChange} />
            <h2>나이: {foundAge}</h2>

            {/*  todos.map(todo => 
                <li>작성자: {todo.writer} 작성자나이: {todo.age} 내용: {todo.content} 작성일: {todo.toLocaleTimeString}
                    {/* 내용이 표기되어야 하는데 
                </li>)*/}
        </>


}


    

export default SearchName;