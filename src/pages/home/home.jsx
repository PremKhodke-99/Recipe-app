import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/recipe-item/RecipeItem";

export default function Home() {

     const { recipeList, loading } = useContext(GlobalContext);

     if (loading) {
          return <h5>Loading...Please wait!</h5>
     }

     return <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
          {
               recipeList && recipeList.length > 0 ?
                    recipeList.map((item, index) => <RecipeItem item={item} />
                    ) : (
                         <div>
                              <p className="lg:text-4xl text-xl text-center text-black font-extrabold">Nothing to show. please search something</p>
                         </div>
                    )
          }
     </div>
}