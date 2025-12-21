

export default function Pagination(pathFilter: string) {
    const path = pathFilter;
    let data;
    try{
        const response = fetch(path);
        data = response.then(res => res.json());
        if(!data){
            throw new Error('Failed to fetch products');
        }
        return data;
    }catch(e){
        console.log('Error fetching products:', e);
        return null;
    }

}