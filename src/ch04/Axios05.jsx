import axios from "axios";
import { useState } from "react";

function Axios05() {
    // 상태 만들기
    const [ resp1Data, setResp1Data ] = useState("");
    // 문자열이 아니라 객체가 들어와야 <- 스프링부트의 맵 형태
    const [ resp2Data, setResp2Data ] = useState({});

    // 배열 형태로 출력하기
    const [ resp3Data, setResp3Data ] = useState([]);

    // ul 형태로 출력하기
    const [ resp4Data, setResp4Data ] = useState({
        name: "",
        email: "",
        strs: [],
        respJsonDto2: {
            address1:"",
            address2:"",
        }
    });

    const api = axios.create({
        baseURL: "http://localhost:8080",
    })


    const resp1OnClick = () => {
        api.get("/resp/data1")
        .then((axiosResponse) => {
            console.log(axiosResponse);

            // 만든 상태에 응답받은 데이터 넣기
            setResp1Data(axiosResponse.data);
        })
    }


    // 문자열이 아니라 객체가 들어와야 <- 스프링부트의 맵 형태
    const resp2OnClick = () => {
        api.get("/resp/data2")
        .then((axiosResponse) => {
            console.log(axiosResponse);
            setResp2Data(axiosResponse.data);
        })
    }


     // 문자열이 아니라 객체가 들어와야 <- 스프링부트의 맵 형태
    const resp3OnClick = () => {
        api.get("/resp/data3")
        .then((axiosResponse) => {
            console.log(axiosResponse);
            setResp3Data(axiosResponse.data);
        })
    }


    const resp4OnClick = () => {
        api.get("resp/data4")
        .then((axiosResponse) => {
            console.log(axiosResponse);
            setResp4Data(axiosResponse.data);
        })
    }

    return <>
        
        <div>
            <button onClick={resp1OnClick}>resp1</button>
            {/* 인라인 요소 사용 */}
            {/* 화면에 출력하기 */}
            <span> {resp1Data} </span>
        </div>

        <div>
            {/* data2의 출력값을 모두 보여주도록 Map 형태로 */}
            <button onClick={resp2OnClick}>resp2</button>
            <span> key1: {resp2Data.key1}, key2: {resp2Data.key2} </span>
            {/* 다른 방법 */}
            {/* <span>
                {Object.entries(resp2Data).map(([key, value]) => {
                    return `${key}: ${value}`;
                })}
            </span> */}
        </div>

        <div>
            <button onClick={resp3OnClick}>resp3</button>

            {
                resp3Data.map(data => <span> {data * 10} </span>)
            }

        </div>
        
        <div>
            <button onClick={resp4OnClick}>resp4</button>

            <ul>
                <li>
                     이름: {resp4Data.name}
                </li>
               
                <li>
                    이메일: {resp4Data.email}
                </li>

                <li>
                    strs: {resp4Data.strs}
                </li> 

                <li>
                    address1: {resp4Data.respJsonDto2.address1 || "주소없음"}
                </li> 

                <li>
                    address2: {resp4Data.respJsonDto2.address2 || "주소없음"}
                </li> 
            </ul>

        </div>


        {/* axios 사용하지 않음 */}
        <div>
            <button>resp5</button>
            <a href="http://localhost:8080/resp/data5?filename=download_test.txt"> download_test.txt </a>
        </div>


        <div>
            <button>resp6</button>
            <a href="http://localhost:8080/resp/data5?filename=download_test.txt"> 테스트.txt </a>
        </div>

    </>
}

export default Axios05;