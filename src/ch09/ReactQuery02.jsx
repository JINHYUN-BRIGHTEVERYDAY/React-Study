import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { data } from "react-router-dom";


const api = axios.create({
    baseURL: "http://localhost:8080",
});


api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("AccessToken");
    if (!!accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});


function useDataQuery(index) {
    return useQuery({
        queryKey: ["data", index],
        queryFn: async () => {
            return await api.get("/api/security/data", {params: {index}});
        },
        gcTime: 1000 * 5,
        staleTime: 1000 * 5,
    });
}


function ReactQuery02() {
    const queryClient = new QueryClient();

    return <QueryClientProvider client={queryClient}>
        <IndexShowBox1 />
        {/* <IndexShowBox2 /> */}
    </QueryClientProvider>
}


function IndexShowBox1() {
    const [index, setIndex] = useState("0");
    const [indexParam, setIndexParam] = useState("0");
    const dataQuery = useDataQuery(indexParam);

    const handleOnClick = () => {
        setIndexParam(index);
    }


    const queryClient = useQueryClient();
    console.log(queryClient.getQueryCache());


    return <div>
        <input type="text" value={index} onChange={(e) => setIndex(e.target.value)}/>
        <button onClick={handleOnClick}>확인</button>
        <h1>{dataQuery.isLoading ? "로딩중..." : dataQuery.data?.data}</h1>
        {
            dataQuery.isLoading || <IndexShowBox2 />
            // <IndexShowBox2 />
        }
        
    </div>
};


function IndexShowBox2() {
    
    const dataQuery = useDataQuery("0");


    return <div>
        <h2>{dataQuery.isLoading ? "로딩중..." : dataQuery.data?.data}</h2>
    </div>

};


export default ReactQuery02;