const charactersAPI = new APIHandler("http://localhost:8000");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      let charactersContainer = document.getElementById("characters-container");
        charactersContainer.innerHTML = ''
      charactersAPI.getFullList().then((characters) => {
        for (let i = 0; i < characters.length; i++) {
          charactersContainer.innerHTML += `<div class="character-info">
    <div class="name">Character Name ${characters[i].name}</div>
    <div class="occupation">Character Occupation ${characters[i].ocupation}</div>
    <div class="cartoon">Is a Cartoon? ${characters[i].cartoon}</div>
    <div class="weapon">Character Weapon ${characters[i].weapon}</div>
  </div>`;
        }
      });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      let characterIdInput = document.getElementById("fetch-one-character-id");
      let characterContainer = document.getElementById("characters-container");

      charactersAPI.getOneRegister(characterIdInput.value).then((character) => {
        characterContainer.innerHTML = `<div class="character-info">
    <div class="name">Character Name ${character.name}</div>
    <div class="occupation">Character Occupation ${character.ocupation}</div>
    <div class="cartoon">Is a Cartoon? ${character.cartoon}</div>
    <div class="weapon">Character Weapon ${character.weapon}</div>
  </div>`;
      });
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      let characterIdInput = document.getElementById("delete-one-character-id");
      charactersAPI.deleteOneRegister(characterIdInput.value);
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      let id = document.getElementById("edit-id").value;
      let name = document.getElementById("edit-name").value;
      let occupation = document.getElementById("edit-occupation").value;
      let weapon = document.getElementById("edit-weapon").value;
      let cartoon = document.getElementById("edit-cartoon").checked;

      let button = document.getElementById("edit-submit");

      let status = await charactersAPI
        .updateOneRegister(id, {
          name,
          occupation,
          weapon,
          cartoon,
        })

        console.log(status);
        button.style.backgroundColor = status === 200 ? "green" : "red";
    });
});

document
  .getElementById("new-character-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    let name = document.getElementById("create-name").value;
    let occupation = document.getElementById("create-occupation").value;
    let weapon = document.getElementById("create-weapon").value;
    let cartoon = document.getElementById("create-cartoon").checked;
    let button = document.getElementById("create-submit");

    let status= await charactersAPI.createOneRegister({
      name,
      occupation,
      weapon,
      cartoon,
    });

    button.style.backgroundColor = status === 201 ? "green" : "red";
  });
