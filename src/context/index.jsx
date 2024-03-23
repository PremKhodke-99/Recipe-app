import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [searchParam, setSearchParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetialsData, setRecipeDetailsData] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);

            const data = await res.json();

            if (data?.data?.recipes) {
                setRecipeList(data?.data?.recipes)
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
            setSearchParam('')
        }
    }

    return <GlobalContext.Provider value={{
        searchParam,
        setSearchParam,
        loading,
        recipeList,
        handleSubmit,
        recipeDetialsData,
        setRecipeDetailsData
    }}>
        {children}
    </GlobalContext.Provider>
}