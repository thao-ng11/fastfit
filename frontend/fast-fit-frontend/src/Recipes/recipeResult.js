function RecipeResult({recipe}) {
    console.log(recipe.uri.split('#')[1])
    return (
        <tr key={recipe.uri.split('#')[1]}>
            <td>{recipe.label}</td>
            <td>{Math.round(recipe.calories)}</td>
            <td><img src={recipe.image} /></td>
            <td>
                <button className="btn btn-primary">Add to Meals</button>
            </td>
        </tr>
    )
}

export default RecipeResult;