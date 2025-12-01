import { useEffect } from "react";
import Swal from "sweetalert2";

function Promise01() {
    
    const axios = {
        get: (url) => {
            return new Promise((rs,rj) => {
                console.log(url + "로 요청");
                setTimeout(() => {
                    console.log("응답");
                    rs({
                        status: 200,
                        data: [10, 20, 30, 40],
                    });
                }, 2000);
            });
        }
    }

    axios.get("http://192.168.2.101:8080/nums")
    .then(r => {
        console.log(r);
        console.log(r.status);
        console.log(r.data);
    })


    axios.get("http://192.168.2.101:8080/users")
    .then(r => {
        console.log(r);
        console.log(r.status);
        console.log(r.data);
    })


    // async도 promise
    const getRequest = async (url) => {
        const r = await axios.get(url);
        console.log(r);
        console.log(r.status);
        console.log(r.data);
        return r;
    }


    const requests = async() => {
       getRequest("http://192.168.2.101:8080/users");
       getRequest("http://192.168.2.101:8080/names"); 
       getRequest("http://192.168.2.101:8080/nums"); 
       getRequest("http://192.168.2.101:8080/products");
       
    }
    

    useEffect(() => {
        const a = async () => {
            await getRequest();
        } 
        a();
    }, []);


    const handleOnClick = async () => {
        // Swal.fire({
        //     title: "알림 내용",
        //     showCancelButton: true,
        //     input: "text", 
        // }).then((r) => {
        //     console.log(r);
        //     console.log("콘솔");
        // });
        // alert("알림 내용");
        // console.log("콘솔");

        const rs = await Swal.fire({title: "타이틀", input: "text"});
        // console.log(rs);
        console.log("콘솔");
    }


    return <>
        <button onClick={handleOnClick}>클릭</button>    
    </>

}

export default Promise01;