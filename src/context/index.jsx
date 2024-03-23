import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [searchParam, setSearchParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetialsData, setRecipeDetailsData] = useState(null);
    const [favouriteList, setFavouriteList] = useState([]);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);

            const data = await res.json();

            if (data?.data?.recipes) {
                setRecipeList(data?.data?.recipes)
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
            setSearchParam('')
        }
    }

    function handleAddFavourite(getCurrentItem){
        console.log(getCurrentItem)
        let copyFavourite = [...favouriteList];
        const index = copyFavourite.findIndex(item => item.id === getCurrentItem.id);

        if(index === -1){
            copyFavourite.push(getCurrentItem)
        }else{
            copyFavourite.splice(index, 1);
        }

        setFavouriteList(copyFavourite);
    }

    return <GlobalContext.Provider value={{
        searchParam,
        setSearchParam,
        loading,
        recipeList,
        handleSubmit,
        recipeDetialsData,
        setRecipeDetailsData,
        handleAddFavourite,
        favouriteList
    }}>
        {children}
    </GlobalContext.Provider>
}