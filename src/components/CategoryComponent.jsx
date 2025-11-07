import { useEffect, useState } from "react";
// our services
import CategoryService from "../services/CategoryService";
// redux
import { useDispatch, useSelector } from "react-redux";
import { saveAllCategoryAction } from "../store/categorySlice";

function CategoryComponent() {
  const [toggleCategory, setToggleCategory] = useState(false);

  const { allCategory, isLoading } = useSelector(
    (state) => state.categoryStore
  );

  const dispatch = useDispatch();

  useEffect(() => {
    CategoryService.getAllCategory()
      .then((res) => {
        dispatch(saveAllCategoryAction(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  function handleToggleCategory() {
    setToggleCategory(!toggleCategory);
  }

  return (
    <div className=" bg-light-Gray h-[100%] py-[20px] flex items-center">
      <div className="container mx-auto flex items-center gap-[20px] h-full flex-col lg:flex-row">
        <button className="bg-main-blue px-[20px] py-[10px] text-text-White rounded-lg"
        onClick={handleToggleCategory}
        >
          Show Category
        </button>

        {isLoading ? (
          
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[5px]">
              {toggleCategory && allCategory.map((cat, index) => {
                return <li key={index} className="w-[200px] bg-main-blue text-text-White text-center rounded-lg px-[16px] py-[8px] hover:bg-main-Yellow transition-all duration-200 cursor-pointer">{cat}</li>;
              })}
            </ul>
          
        ) : (
          <div>Loading Category...</div>
        )}
      </div>
    </div>
  );
}

export default CategoryComponent;
