export class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = false;
    }

    getInfo(){
        if (this.read){
        return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
        } else {
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        }
    }
};


export class Library {
    constructor(){
        this.books = [];
    }

    addBook(newBook){
        // Add book to the library 
        if (newBook instanceof Book && !this.isInLibrary(newBook)){
            this.books.push(newBook);
            return true;
        } else {
            return false;
        }
    }

    isInLibrary(book){
        return this.books.includes(book);
    }

    removeBook(title){
        this.books.filter(book => book.title !== title);
    }

    getBook(title){
        return this.books.find(book => book.title === title);
    }

}


