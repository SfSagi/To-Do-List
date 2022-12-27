// Adding local storage items to table
const getLocalStorageData = () => {
    if (localStorage.getItem("TODOs") == null) {
      return []
    } else {
      return JSON.parse(localStorage.getItem("TODOs"))
    }
  };
  let TodoList = getLocalStorageData();
  
  // showing Todo Item
  function showtodo() {
    let todos = ""
    for (index = 0; index < TodoList.length; index++) {
      let TitleContent = TodoList[index].Title
      let DescriptionContent = TodoList[index].Description
      todos +=
        `<tr>
                      <th scope="row">${index + 1}</th>
                      <td>${TitleContent}</td>
                      <td>${DescriptionContent}</td>
                      <td><button type="button" class="btn btn-info" onclick= EditTodo(${index})>Edit</button></td>
                      <td><button type="button" class="btn btn-danger" onclick= removeTodo(${index})>Delete</button></td>
                      </tr>`
    }
    if (TodoList.length == 0) {
      tablebody.innerHTML = "Nothing to Show"
    } else {
      tablebody.innerHTML = todos
    }
  }
  showtodo()
  
  //Adding note 
  AddNotebtn.addEventListener("click", (e) => {
    e.preventDefault()
    let todo = {
      Title: Title.value,
      Description: Description.value
    }
    TodoList.push(todo)
    localStorage.setItem("TODOs", JSON.stringify(TodoList))
    showtodo()
    Title.value = ""
    Description.value = ""
  })
  
  //deleting note
  const removeTodo = (id) => {
    TodoList.splice(id, 1)
    localStorage.setItem("TODOs", JSON.stringify(TodoList))
    showtodo();
  };
  

  let savebtn = document.getElementById("SaveNotebtn")
  let addbtn = document.getElementById("AddNotebtn")
  let saveindex = document.getElementById("saveindex")
  
  const EditTodo = (id) => {
    saveindex.value = id
    let webtask = TodoList
    Title.value = webtask[id].Title
    Description.value = webtask[id].Description
    addbtn.style.display = "none"
    savebtn.style.display = "inline-block"
  };
  
  //edit and save 
  savebtn.addEventListener("click", (e) => {
    e.preventDefault()
    let webtask = TodoList
    let saveindex_value = saveindex.value
    webtask[saveindex_value].Title = Title.value
    webtask[saveindex_value].Description = Description.value
    localStorage.setItem("TODOs", JSON.stringify(webtask))
    showtodo();
    addbtn.style.display = "inline-block"
    savebtn.style.display = "none"
    Title.value = ""
    Description.value = ""
  })
  
  //delete all 
  DeleteAllNotebtn.addEventListener("click", (e) => {
    e.preventDefault()
    TodoList = []
    localStorage.setItem("TODOs", JSON.stringify([]))
    showtodo()
    addbtn.style.display = "inline-block"
    savebtn.style.display = "none"
  })