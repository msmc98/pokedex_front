export const authMethod = async (url, data) =>{
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    const json = await res.json()
    return json;
}

export const storageSave = (data) => {
    for(let element in data){
        localStorage.setItem(element, data[element])
    }
}