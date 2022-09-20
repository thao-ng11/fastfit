import Modal from "react-bootstrap/Modal";

function RecipeModal({ recipe, setActiveModal, activeModal }) {
  // console.log(recipe)
  function handleClose() {
    setActiveModal(false);
  }

  return (
    <Modal show={activeModal} onHide={handleClose}>
      <Modal.Header className="bg-[#C7E8F3]" closeButton>
        <Modal.Title className="w-full text-center">{recipe.label}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="w-full">
        <div className="flex justify-center items-center">
          <img alt="meal" className="justify-center" src={recipe.image} />
          <div className="ml-3">
            <table>
              <tbody>
                <tr>
                  <td className="font-semibold">
                    Calories: {Math.round(recipe.calories)}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Yield: {recipe.yield}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid-col-row-1 mt-3">
          <table>
            <thead>
              <tr>
                <th>Ingredients</th>
              </tr>
            </thead>
            <tbody>
              {recipe.ingredientLines.map((ingredient) => {
                return (
                  <tr>
                    <td>{ingredient}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={handleClose}
          variant="secondary"
          className=" bg-gradient-to-bl from-[#BF9ACA] to-[#c7e8f3] btn border border-[#F1F1F1] shadow-sm font-bold  hover:bg-gradient-to-r from-[#BF9ACA] to-[#c7e8f3] text-[#F1F1F1]"
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;
