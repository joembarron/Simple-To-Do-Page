const addTodoItemButton = document.getElementsByTagName("button")[0];
const todoItemSubmissionForm = document.getElementsByTagName("form")[0];
const unorderedList = document.getElementsByTagName("ul")[0];
const textInput = document.getElementsByTagName("input")[0];
const clearListButton = document.getElementById("clear-list");

if (localStorage.getItem("listOfItems") == null) {
  localStorage.setItem("listOfItems", JSON.stringify([]));
}

addLocalStorageTodoItemsToUnorderedList();

unorderedList.addEventListener("click", (e) => {
  const listItem = document.getElementById(
    `item-${e.target.id[e.target.id.length - 1]}`
  );

  if (e.target.checked) {
    listItem.style.textDecoration = "line-through";
    updateItemInLocalStorage(e.target.id, true);
  } else if (!e.target.checked) {
    listItem.style.textDecoration = "none";
    updateItemInLocalStorage(e.target.id, false);
  }
});

addTodoItemButton.addEventListener("click", (e) => {
  console.log("clicked");
  e.preventDefault();
  const todoItemText = textInput.value;
  textInput.value = "";
  addNewTodoItemToUnorderedList(todoItemText, true);
});

clearListButton.addEventListener("click", () => {
  deleteList();
});

function addNewTodoItemToUnorderedList(item, addToLocalStorage, checkState) {
  const newListItemDiv = document.createElement("div");

  const newListItem = document.createElement("li");
  newListItem.id = `item-${unorderedList.children.length + 1}`;
  newListItem.style.display = "inline-block";
  newListItem.textContent = item;
  if (checkState) {
    newListItem.style.textDecoration = "line-through";
  }

  const newListItemCheckbox = document.createElement("input");
  newListItemCheckbox.type = "checkbox";
  if (checkState == true) {
    newListItemCheckbox.checked = true;
  }

  newListItemCheckbox.id = `checkbox-${unorderedList.children.length + 1}`;
  newListItemCheckbox.classList.add("checkbox");
  newListItemCheckbox.style.display = "inline";

  newListItemDiv.appendChild(newListItem);
  const spanElement = document.createElement("span");
  spanElement.textContent = " ";
  newListItemDiv.appendChild(spanElement);
  newListItemDiv.appendChild(newListItemCheckbox);

  unorderedList.appendChild(newListItemDiv);

  if (addToLocalStorage == true) {
    addNewTodoItemToLocalStorage(item);
  }
}

function addLocalStorageTodoItemsToUnorderedList() {
  const listOfItems = JSON.parse(localStorage.getItem("listOfItems"));
  if (listOfItems != null) {
    for (let item of listOfItems) {
      //   console.log(item);
      addNewTodoItemToUnorderedList(item[0], false, item[1]);
    }
  }
}

function deleteList() {
  localStorage.clear();
  while (unorderedList.firstChild) {
    unorderedList.removeChild(unorderedList.firstChild);
  }
}

function addNewTodoItemToLocalStorage(item) {
  const itemsArrayAsObject = JSON.parse(localStorage.getItem("listOfItems"));
  itemsArrayAsObject.push([item, false]);
  const itemsArrayAsString = JSON.stringify(itemsArrayAsObject);
  localStorage.setItem("listOfItems", itemsArrayAsString);
}

function updateItemInLocalStorage(id, checkState) {
  const items = JSON.parse(localStorage.getItem("listOfItems"));

  if (checkState) {
    items[Number(id[id.length - 1]) - 1][1] = true;
  } else {
    items[Number(id[id.length - 1]) - 1][1] = false;
  }

  const itemsArrayAsString = JSON.stringify(items);
  localStorage.setItem("listOfItems", itemsArrayAsString);
}
