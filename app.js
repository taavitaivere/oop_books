// project objects
const ui = new UI()
// making List
class List {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => List.addBookToList(book));
    }
}
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}
// Display Books
document.addEventListener('DOMContentLoaded', List.displayBooks);

// Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === '') {
        List.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instatiate book
        const book = new Book(title, author, isbn);

        // Add Book to List
        List.addBookToList(book);
        // Add book to store
        Store.addBook(book);
        // Clear fields
        List.clearFields();
    }
});
// Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from List
    List.deleteBook(e.target);
    List.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});