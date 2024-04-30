import { type DataResponse } from "../App";


export const searchFile = async (search: string): Promise<[Error?, DataResponse['data']?]> => {

    try{
        const res = await fetch(`http://localhost:3000/api/files?q=${search}`)

        
        if(!res.ok) return [new Error(`Failed to search Data: ${res.statusText}`)]

        const json = await res.json() as DataResponse
        return [undefined,json.data]

    }catch(err){
        if (err instanceof Error) return [err]
    }
    return [new Error('unknown error')]
}