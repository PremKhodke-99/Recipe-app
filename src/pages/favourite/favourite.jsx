import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item/RecipeItem"

export default function Favourites() {
    const { favouriteList } = useContext(GlobalContext);

    return <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {
            
            favouriteList && favouriteList.length > 0 ?
            favouriteList.map((item, index) => <RecipeItem item={item}/>
                ) : (
                    <div>
                        <p className="lg:text-4xl text-xl text-center text-black font-extrabold">Nothing is added in favourites</p>
                    </div>
                )
        }
    </div>
}