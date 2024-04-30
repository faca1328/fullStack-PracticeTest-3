import { DataResponse } from "../App";


export const uploadFile = async (file: File): Promise<[Error?, DataResponse?]> => {
    const formData = new FormData();
    formData.append('file', file)


    try{
        const res = await fetch(`http://localhost:3000/api/files`,{ 
            method: 'POST',
            body: formData
        })

        
        if(!res.ok) return [new Error(`Failed to upload: ${res.statusText}`)]

        const json = await res.json();
        return [undefined,json]

    }catch(err){
        if (err instanceof Error) return [err]
    }
    return [new Error('unknown error')]
}