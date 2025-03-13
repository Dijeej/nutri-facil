let ingredientIndex = 1;

function addIngredient() {
  const container = document.getElementById("ingredients-container");
  const ingredientDiv = document.createElement("div");
  ingredientDiv.classList.add("ingredient");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = `ingredients[${ingredientIndex}][name]`;  // Garante o índice correto
  nameInput.placeholder = "Nome do ingrediente";
  nameInput.required = true;

  const quantityInput = document.createElement("input");
  quantityInput.type = "text";
  quantityInput.name = `ingredients[${ingredientIndex}][quantity]`;  // Garante o índice correto
  quantityInput.placeholder = "Quantidade";
  quantityInput.required = true;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "✖";
  removeButton.onclick = function() {
    ingredientDiv.remove();
  };

  ingredientDiv.appendChild(nameInput);
  ingredientDiv.appendChild(quantityInput);
  ingredientDiv.appendChild(removeButton);
  
  container.appendChild(ingredientDiv);

  ingredientIndex++;  // Incrementa o índice para o próximo ingrediente
}

  function adicionarRedirecionamentoHomepage() {
    let logos = document.getElementsByClassName("homepage");
    for (let logo of logos) {
        logo.onclick = function() {
            window.location.href = "/";
        };
    }
}

adicionarRedirecionamentoHomepage()