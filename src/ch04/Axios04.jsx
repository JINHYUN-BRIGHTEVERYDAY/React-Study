import axios from "axios";


function Axios04() {
    const api = axios.create({
        baseURL: "http://localhost:8080",
    });


    const reqGetonClick1 = () => {
        api.get("/req/data1?a=aaaaa&b=10");
    }


    const reqGetonClick2 = () => {
        api.get("/req/data2", {
                params: {
                    a: "abc",
                    b: 10000,
                },
        });       
    }

    const reqGetonClick3 = () => {
        api.get("/req/data3", {
            params: {
                name: "이름", 
                age: 29,
            },
        });
    }

    const reqGetonClick7 = () => {
        api.get("/req/abc/data7/20", {
            params: {
                name: "이름", 
                age: 29,
            },
        });
    }

    // ------------------------------------------------------

    // Post 요청
    const reqPostOnClick1 = () => {
        const data  = {
            name: "test",
            age: 32,
            address: "test address",
        }

        // Object -> JSON 변환 작업
        const jsonData = JSON.stringify(data);

        // JSON -> Object 변환 작업
        const obj = JSON.parse(jsonData);

        // axios는 자동으로 JSON 변환처리 된다
        api.post("/req/data1", data);
    }


    const reqPostOnClick2 = () => {
        api.post("/req/data2", {
            name: "김준일",
            age: 32,
        });
    };


    const reqPostOnClick3 = () => {
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "file");
        
        inputElement.onChange = (e) => {
            const {files} = e.target;
            const [file] = files;

            const formData = new FormData();
            formData.append("file", file);

            api.post("/req/data3", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                }
            });
        }

        inputElement.click();

    };


    const reqPostOnClick4 = () => {
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "file");
        
        inputElement.onChange = (e) => {
            const {files} = e.target;
            const [file] = files;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", "김준일");
            formData.append("age", 32);

            api.post("/req/data4", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                }
            });

        }

        inputElement.click();

    };


    // multiple 속성 활성화
    const reqPostOnClick5 = () => {
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "file");
        inputElement.setAttribute("multiple", true);

        inputElement.onChange = (e) => {
            const {files} = e.target;
            const fileList = Array.from(files);

            const formData = new FormData();
            // formData.append("files", fileList);
            fileList.forEach(file => formData.append("files", file));

            api.post("/req/data5", formData);
        }

        inputElement.click();

    }



    const reqPutOnClick = () => {
        api.put("/req/data1/30", {
            name: "김준이",
            age: 33,
        });
    }



    // 부분적으로 수정하기
    const reqPatchOnClick = () => {
        api.patch("/req/data1/30", {
            name: "김준이",
        });
    }


    // 삭제
    const reqDeleteOnClick = () => {
        api.delete("/req/data1/20", {
            data: {
                name: "김준일",
            }
        });
    }

    
    return <>

        <button onClick={reqGetonClick1}>reqGet1</button>
        <button onClick={reqGetonClick2}>reqGet2</button>
        <button onClick={reqGetonClick3}>reqGet3</button>
        {/* <button>4</button>
        <button>5</button>
        <button>6</button> */}
        <button onClick={reqGetonClick7}>reqGet7</button>
        <button onClick={reqPostOnClick1}>reqPost1</button>
        <button onClick={reqPostOnClick2}>reqPost2</button>
        <button onClick={reqPostOnClick3}>reqPost3</button>
        <button onClick={reqPostOnClick4}>reqPost4</button>
        <button onClick={reqPostOnClick5}>reqPost5</button>
        <button onClick={reqPutOnClick}>reqPut</button>
        <button onClick={reqPatchOnClick}>reqPatch</button>
        <button onClick={reqDeleteOnClick}>reqDelete</button>
    </>
}

export default Axios04;