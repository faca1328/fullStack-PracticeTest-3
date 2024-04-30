

export const searchFile = async (search: string): Promise<[Error?, Array<Record<string,string>>?]> => {

    try{
        const res = await fetch(`http://localhost:3000/api/files?q=${search}`,{ 
            method: 'GET',
        })

        
        if(!res.ok) return [new Error(`Failed to search Data: ${res.statusText}`)]

        const json = await res.json();
        return [undefined,json]

    }catch(err){
        if (err instanceof Error) return [err]
    }
    return [new Error('unknown error')]
}