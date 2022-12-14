import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "../Authentication";

function MealWidget() {
  const today = new Date();

  const todayYear = today.getFullYear();
  const todayDay = today.getDate();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");

  const todayDate = `${todayYear}-${todayMonth}-${todayDay}`;
  const todayTime = today.getHours();

  const [mealType, setMealType] = useState("");

  const [token] = useToken();

  const [meal, setMeal] = useState({
    recipe: "",
    image: "",
  });
  const [showSearch, setShowSearch] = useState("d-none");
  const [showMeal, setShowMeal] = useState("grid-rows-3");

  const appID = process.env.REACT_APP_EDAMAM_APP_ID;
  const apiKey = process.env.REACT_APP_EDAMAM_RECIPE_API_KEY;

  const fetchRecipe = async (recipeId) => {
    const apiUrl = `https://api.edamam.com/api/recipes/v2/${recipeId}/?app_id=${appID}&type=public&app_key=${apiKey}&field=label&field=image`;

    const apiResponse = await fetch(apiUrl);
    if (apiResponse.ok) {
      const { recipe } = await apiResponse.json();
      // console.log(recipe)
      setMeal({
        ...meal,
        recipe: recipe.label,
        image: recipe.image,
      });
    }
  };

  const fetchMeals = async () => {
    let type = "";
    if (todayTime >= 14) {
      type = "Dinner";
    } else if (todayTime >= 10) {
      type = "Lunch";
    } else {
      type = "Breakfast";
    }

    setMealType(type);

    const url = `${process.env.REACT_APP_RECIPES_HOST}/api/meals/user`;

    const mealsResponse = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (mealsResponse.ok) {
      const meals = await mealsResponse.json();

      const todayMeals = meals.filter(
        (meal) => meal["date"] === `${todayDate}` && meal["type"] === type
      );
      // console.log(mealType)
      // console.log(todayMeals)
      // console.log(mealType, todayMeals)
      if (todayMeals.length > 0) {
        const recipeID = todayMeals[0]["recipe_api_id"];
        // console.log(recipeID)

        fetchRecipe(recipeID);
      } else {
        setShowSearch("grid-rows-3");
        setShowMeal("grid-rows-3 d-none");
      }
    }
  };

  useEffect(() => {
    if (token !== null) {
      fetchMeals();
    }
  }, );

  return (
    <div className="flex items-center justify-center">
      <div className={showMeal}>
        <h2 className="pt-3 font-semibold text-center">{mealType}: </h2>
        <h2 className="py-2 text-center">{meal.recipe}</h2>
        <img
          alt="meal"
          className="w-[240px] rounded-lg shadow-md"
          src={meal.image}
        />
      </div>
      <div className={showSearch}>
        <h2 className="pt-6">
          You don't have any meals planned for {mealType.toLowerCase()}.
        </h2>
        <h2 className="text-center pt-2">
          Find a
          <NavLink to="/meals/search" className="font-semibold text-[#8e4162]">
            {" "}
            recipe
          </NavLink>{" "}
          to cook!
        </h2>
      </div>
    </div>
  );
}

export default MealWidget;
