export const getHarryData = async () => {

    try{
        const data = await fetch('https://hp-api.onrender.com/api/characters').then(res => res.json())
        return data; 
    }

    catch (error){
    console.error(error);
    return[];
    }
}; 

