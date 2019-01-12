//Book Class: represents a Book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//UI Class: Handle UI Task
class UI{

    //Display book
    static diplayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBooktoList(book));
    }

    //Add book to list
    static addBooktoList(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-small delete">X</a></td>
        `;
        list.appendChild(row);
    }

    //show alerts
    static showAlerts(message, className){
        const div = document.createElement("div");
        div.className = `col-8 mt-4 alert alert-${className}`;
        const text = document.createTextNode(message);
        div.appendChild(text);
        const row = document.querySelector(".row");
        const form = document.querySelector("#book-form");
        row.insertBefore(div, form);

        //vanish in 2 sec
        setTimeout(() =>
        document.querySelector('.alert').remove(),2000);
    }

    //delete books
    static deleteBooks(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove();
        }
    }

    //clear fields
    static clearFields(){
        document.querySelector("#title").value="";
        document.querySelector("#author").value="";
        document.querySelector("#isbn").value="";
    }

}

//Store Class: Handle storage
class Store{

    //get books
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null){
            books=[];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    //add book to store
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    //remove books
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
}
//Event: Display a Book
document.addEventListener("DOMContentLoaded", UI.diplayBooks());

//Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {

    //prevent actual submit
    e.preventDefault();

    //get form value
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlerts("Please fill in all fields.", "danger");
    }else {
        //Instatiate book
        const book = new Book(title,author,isbn);
        
        //Add book to list
        UI.addBooktoList(book);

        //Add book to localstorage
        Store.addBook(book);

        //show success message
        UI.showAlerts("Book added to list", "success");

        //clear fields
        UI.clearFields();
    }
})
//Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {

    //Delete books from UI
    UI.deleteBooks(e.target);

    //Delete books from localStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show book remove message
    UI.showAlerts("Book removed from list", "info");
});


