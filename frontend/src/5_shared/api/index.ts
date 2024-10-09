import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from ".."

const BASE_URL = 'https://queueup-6iwj.onrender.com/api'

export interface RequestOptions<PayloadType = any> {
    path: string
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    payload?: PayloadType
}

export interface ResponseOptions<DataType = any> {
    status: number
    data?: DataType | null
}

 export const fetchData = async <Payload = any, Response = any> ({path, method, payload}: RequestOptions<Payload>): Promise<ResponseOptions<Response>> => {

    const access_token = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)

    let request = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(access_token ? {'Authorization': `Bearer ${access_token}`} : {})
        },
        body: payload ? JSON.stringify(payload) : null
    })    

    const status = request.status  

    let data = null

    try {
        data = await request.json()
        
        
    } catch (error: any) {
        console.log(error);
    }

    return {status, data}
}

