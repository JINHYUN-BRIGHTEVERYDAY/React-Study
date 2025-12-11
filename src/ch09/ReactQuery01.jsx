import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";

/**  1. QueryClient 인스턴스를 컴포넌트 외부에서 생성합니다.
  이 클라이언트가 전체 어플리케이션의 캐싱 및 서버 상태를 관리합니다. */
const queryClient = new QueryClient(); 

// api 설정
const api = axios.create({
    baseURL: "http://localhost:8080",
});


// 요청 때에 interceptor 사용
api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("AccessToken");
    // 토큰이 있는지 확인 
    if (!!accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});


// 전역 상태관리 (서버) - 서버 응답데이터 캐싱
function ReactQuery01() {
    
    // 불필요한 코드
    // const queryClientProvider = new QueryClientProvider(); 

    //  2. QueryClientProvider 컴포넌트에 client={queryClient}를 전달
    return (
        <QueryClientProvider client={queryClient}> 
            {/* Box1 과 Box2 불러오기 */}
            <Box1></Box1>
            <Box2></Box2>
        </QueryClientProvider>
    );

};


function Box1() {
    const principalQuery = useQuery({
        queryKey: ["principalQuery"], 
        queryFn: async() => {
             /** 3. Axios 응답에서 data만 추출하는 것이 일반적
               React Query는 data 필드에 응답 객체 전체를 저장하므로,
               필요에 따라 .data를 추가로 추출 */
            const response = await api.get("/api/auth/principal");
            return response.data; 
        }
    });

    // 로딩 상태와 데이터 콘솔에 출력
    console.log("Box1 - 로딩 중:", principalQuery.isLoading);
    // data는 response.data를 담는다
    console.log("Box1 - 데이터:", principalQuery.data); 
    
    // 데이터가 로딩 중일 때 로딩 메시지를 표시하는 로직
    if (principalQuery.isLoading) {
        return <div>사용자 정보를 로딩 중...</div>;
    }
    
    // 데이터가 성공적으로 로드된 경우 (예: 사용자 이름 표시)
    return <div>
        <h2>Box 1: principalQuery</h2>
        {principalQuery.data && <p>사용자 이름: {principalQuery.data.username || "정보 없음"}</p>}
    </div>
}


function Box2() {
    
    const principalQuery = useQuery({
        queryKey: ["principalQuery"],
        qyeryFn: async () => {
            return await api.get("/api/auth/principal");
        },
    });

    // 로딩 상태와 데이터 콘솔에 출력
    console.log("Box2 - 로딩 중:", principalQuery.isLoading);
    // data는 response.data를 담고 있습니다.
    console.log("Box2 - 데이터:", principalQuery.data); 


    return <div>
        <h2>Box 2: 준비 중</h2>
    </div>
}

export default ReactQuery01;