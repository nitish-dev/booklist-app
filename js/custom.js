
//Book Object
function Books(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//handle storeage

//get books from store
function getBooks(){
    var books;
    if(localStorage.getItem("books") === null){
        books=[];
    }else{
        books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
}

//add book to store
function addBook(book){
   var books = getBooks();
   //console.log(books);
   books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  
}

//Display book from store
function displayBook(){
   var storeBooks = getBooks();
   storeBooks.forEach(function(book){
    addBooktoUI(book);
  });
}

//remove books from store
function removeStoreBook(isbn){
    var books = getBooks();
    books.forEach(function(book, index){
        if(book.isbn === isbn){
            books.splice(index,1);
        }
        localStorage.setItem("books", JSON.stringify(books));
    })
}

//Add book to UI
function addBooktoUI(book){
    var list = document.getElementById("book-list");
    var row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-small delete">X</a></td>
    `;
    list.appendChild(row);
}

//Add book to list
function addBooktoList(){

    //get form value
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var isbn = document.getElementById("isbn").value;

    if(title === '' || author ==='' || isbn ===''){
        showAlert("Please fill in all the fields.", "danger");
    }else{
         //Instatiate book
         var book = new Books(title,author,isbn);

         //add book to list
         addBooktoUI(book);

         //add book to local storage
         addBook(book);

         //show alert
         showAlert("Book Added to list", "success");

         //clear fields
         clearFields();
    } 
}

//show alert
function showAlert(message, className){
    var div = document.createElement('div');
    div.className=`col-8 mt-4 alert alert-${className}`;
    var text = document.createTextNode(message);
    div.appendChild(text);
    var row = document.querySelector(".row");
    var form = document.getElementById('book-form');
    row.insertBefore(div, form);

    //hide alert after 2sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 2000);
}

//function to remove book from UI
function removeBook(el){
    if(el.classList.contains("delete")){
       el.parentElement.parentElement.remove();
    }
}

//clear fields
function clearFields(){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

 //Event add book
    document.getElementById("book-form").addEventListener("submit", function(e){
        //prevent actual submit
        e.preventDefault();
        addBooktoList();
    });
    
//Event Remove book
    document.getElementById("book-list").addEventListener("click", function(e){
        //remove book from list
        removeBook(e.target);

        //show alert
        showAlert("Book removed from list", "info")
        //remove book from localstorage
        removeStoreBook(e.target.parentElement.previousElementSibling.textContent);
    });

    //Display books
    document.addEventListener("DOMContentLoaded", displayBook());