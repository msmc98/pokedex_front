function getSuspender(promise){
    let status = 'pending';
    let result;
    let suspender = promise.then(
        r => {
            status = 'success';
            result = r;
        },
        e => {
            status = 'error';
            result = e;
        }
    );
    const read = () => {
        if(status === 'pending'){
            throw suspender;
        }
        if(status === 'error'){
            throw result;
        }
        return result;
    }
    return {read};
}

export function fetchData(url){
    const promise = fetch(url)
        .then(res => res.json())
        .then(data => data);

    return getSuspender(promise);
}

export function postData(url, data){
    const promise = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data
        })
    })
        .then(res => res.json())
        .then(data => data);
    return getSuspender(promise);
}
