import React, { useEffect, useState } from "react";
import { searchFile } from "../services/search";
import { DataResponse } from "../App";




export function Search({ initialData }: { initialData: DataResponse }) {

    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<Array<Record<string, string>>>(initialData.data);
    const [search, setSearch] = useState("");


    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    // Modificamos la URL con el search para después filtrar por lo que diga la URL.
    useEffect(() => {
        const pathName = search === '' ? window.location.pathname : `?q=${search}`;
        window.history.replaceState({}, '', pathName);
    }, [search])


    // Llamada a la API teniendo en cuenta el filtro.
    useEffect(() => {
        if (!search) return setData(initialData.data);

        searchFile(search)
            .then(response => {
                const [err, filteredData] = response;
                if (err) setError(err);

                if (filteredData) setData(filteredData);
            });
            
    }, [search, initialData]);

    return (
        <div>
            <h3>Filter :</h3>
            <input type="search" name="" onChange={handleChange} placeholder="Search" value={search} />
            <hr />
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {Object.entries(item).map(([key, value]) => (
                            <p key={key}><strong>{key}</strong>: {value}</p>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

