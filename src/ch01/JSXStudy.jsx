import { Fragment } from "react";
import Hello from "../Hello";

function JSXStudy() {
    const root = document.getElementById('root');

    const 닫아야함 = <input type="text" />
    const 닫아야함2 = <div></div>
    const 감싸야함 = <div><input type="text" /><input type="text" /></div>
    const 감싸야함2 = 
    // 여러 개의 jsx 요소 묶기 -> 임시로 묶기


    <Fragment> 
        <div>
            <div>
                <input type="text" />
                <input type="text" />
            </div>
            <div>
                <input type="text" />
                <input type="text" />
            </div>  
        </div>
    </Fragment>


    const 감싸야함3 = 
    // 여러 개의 jsx 요소 묶기 -> 임시로 묶기
    // 비어있는 태그 사용
    <> 
        <div>
            <div>
                <input type="text" />
                <input type="text" />
            </div>
            <div>
                <input type="text" />
                <input type="text" />
            </div>  
        </div>
    </>
        
        

    const a = 
        <div>
            <div>
                <Hello />
                <Hello />      
            </div>
            <div>
                <Hello />
                <Hello />      
            </div>
        </div>

    const num = 10;
    const name = "김준일";
    const nums = [1,2,3,4,5];
    const names = ["준일", "준이", "준삼", "준사", "준오"];
    const tds = [
        <td>번호</td>,
        <td>이름</td>,
    ]

    const box = <div></div>

    const 표현식 = 
    <div>
        <h3>{num}</h3> 
        <h3>{name}</h3>
        <div>
            {box}
        </div>
        <div>{nums}</div>
        <table>
            <thead>
                <tr>
                    {tds}
                </tr>  
            </thead>
            <tbody>
                {
                    nums.map((num, index) => {
                        // tr 전체가 렌더링
                        return <tr>
                            <td>{num}</td>
                            <td>{names[index]}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>

    // JSX 안에 변수 또는 값, 연산자를 쓰고 싶으면 {} 안에 입력해야함
    // <h3>num</h3>  단순히 텍스트만 쓴 것

    return <>{표현식}</>
}

export default JSXStudy;
