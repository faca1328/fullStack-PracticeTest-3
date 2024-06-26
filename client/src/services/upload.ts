import { DataResponse } from "../App";


export const uploadFile = async (file: File): Promise<[Error?, DataResponse['data']?]> => {
    const formData = new FormData();
    formData.append('file', file)


    try{
        const res = await fetch(`http://localhost:3000/api/files`,{ 
            method: 'POST',
            body: formData
        })

        
        if(!res.ok) return [new Error(`Failed to upload: ${res.statusText}`)]

        const json = await res.json() as DataResponse;
        return [undefined,json.data]

    }catch(err){
        if (err instanceof Error) return [err]
    }
    return [new Error('unknown error')]
}