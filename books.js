// Classes 
class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read || false;
    }

    getInfo(){
        if (this.read){
        return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
        } else {
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        }
    }
};


class Library {
    constructor(){
        this.books = [];
    }

    addBook(newBook){
        // Add book to the library 
        if (newBook instanceof Book && !this.isInLibrary(newBook)){
            this.books.push(newBook);
        }
    }

    isInLibrary(book){
        // Checking if book is in library
        return this.books.some(b => b.title === book.title);
    }

    removeBook(title){
        this.books = this.books.filter(book => book.title !== title);
    }

    getIndexBook(title){
        let book = this.books.find(book => book.title === title);
        return this.books.indexOf(book);
    }

}

// End of classes



let wrapper = document.querySelector('.wrapper');
let modal = document.querySelector('.form-container');
let addBtn = document.querySelector('.btn--add'); // Boton add book de la pantalla principal
let submitBtn = document.querySelector('.btn--submit'); // 
let containerPrincipal = document.querySelector('.container-principal');
let exitBtn = document.querySelector('.btn--exit');
// let readBtns = [];
let biblioteca = new Library();



function checkFields(){
    // Check if the fields in the form are empty
    let form = document.querySelectorAll('.form__input');
    let title = form[0].value;
    let author = form[1].value;
    let pages = form[2].value;
    let read = form[3].value;
    if (title === '' || author === '' || pages === ''){
        return false;
    } else {
        return true;
    }
}


// ADD BOOK TO THE CONTAINER

function clearInputs(){
    // Clear the inputs in the form
    let form = document.querySelectorAll('.form__input');
    form.forEach(input => {
        input.value = '';
    });
}

function addBookHtml(libro) {
    // Add a book to the html, already create it before.
    let newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.innerHTML = `
    <h1 class='book__name'>${libro.title}</h1>
    <h1 class='book__author'>${libro.author}</h1>
    <h1 class='book__pages'>${libro.pages}</h1>
    <button class="btn read">Read</button>
    <button class="btn remove">Remove</button>
                                                `
    if (libro.read === true) {
        newBook.querySelector('.read').classList.add('btn--read');
    } else {
        newBook.querySelector('.read').classList.add('btn--not_read');
    }
    containerPrincipal.appendChild(newBook);
    let readBtn = newBook.querySelector('.read');
    readBtn.onclick = function(){
        if (readBtn.classList.contains('btn--read')){
            readBtn.classList.remove('btn--read');
            readBtn.classList.add('btn--not_read');
            libro.read = false;
            localStorageSave();
        } else {
            readBtn.classList.remove('btn--not_read');
            readBtn.classList.add('btn--read');
            libro.read = true;
            localStorageSave();
        }
    };

    let removeBtn = newBook.querySelector('.remove');
    removeBtn.onclick = function(){
        biblioteca.removeBook(libro.title);
        newBook.remove(); // remove child node
        localStorageSave();
    }
    
};

function addIndividualBook(libro){
    // Adding a book to the library
    if (biblioteca.isInLibrary(libro) == false){
        biblioteca.addBook(libro);
        let libroHTML = addBookHtml(libro);
        localStorageSave();
        hideModal();
        clearInputs();
    } else {
        alert('Book already in the library');
    }
}


function showModal(){
    modal.style.display = 'block';
    wrapper.classList.add('blur');
}

function hideModal(){
    modal.style.display = 'none';
    wrapper.classList.remove('blur');
}

function localStorageSave(){
    // Save the library in the local storage;
    localStorage.setItem('library', JSON.stringify(biblioteca.books));
}

function renderLocalStorage(){
    // Render the library from the local storage
    let library = JSON.parse(localStorage.getItem('library'));
    if (library){

        library.forEach(book => {
            let libro = new Book(book.title, book.author, book.pages, book.read);
            biblioteca.addBook(libro);
            addBookHtml(libro);
        });
    }
}

// Event listeners

addBtn.addEventListener('click', showModal);
exitBtn.addEventListener('click', hideModal);


submitBtn.addEventListener('click', e => {
    e.preventDefault();
    if (checkFields()) {
        let form = document.querySelectorAll('.form__input');
        let title = form[0].value;
        let author = form[1].value;
        let pages = form[2].value;
        let read = form[3].value;
        if (read  == 'true'){
            let book = new Book(title, author, pages, true);
            addIndividualBook(book);
        } else {
            let book = new Book(title, author, pages, false);
            addIndividualBook(book);
        }
    }  else {
        alert('Please fill all the fields');
    }
});

renderLocalStorage();