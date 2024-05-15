console.group('libraryClass.js');

/* 
BUG
=>  a book can be borrowed twice by the same patron
=>  two different patrons can borrow the same book

FEATURES TO IMPLEMENT
=>  check if a patron already has the book before lending, if not check if the book is not already lent
=>  patron can check all borrowed books or a particular book;
=>  set a borrow limit on patrons;
=>  patron can make request for a book; added to library pending list, library can decide(based on if patron has exceeded borrow limit or not);
=>  patron can return book to library(book automatically knows where it is from)

*/

class Library {
    constructor() {
        this._books = [];
        this._patrons = [];
    }

    get allBooks() {
        return this._books;
    }
    get allPatrons() {
        return this._patrons;
    }

    set allPatrons(patrons) {
        if (typeof patrons !== 'array') {
            console.console.error('Error setting allPatrons: data is not recognized');
            return;
        }

        this._patrons = patrons;
    }

    addBook(book) {
        if (this._IsbnExists(book.isbn)) {
            console.error(`Error adding book: book with ISBN ${book.isbn} exists`);
            book.isSaved = false;
            return;
        }


        book.isLent = false;
        book.isSaved = true;
        this._books.push(book);
        log(`${book.title} added`);
    }

    addPatron(patron) {
        if (this._patrons.includes(patron)) {
            console.error(`Error adding patron: ${patron.fullName} exists`);
            return;
        }

        patron._libraryId = this._generatePatronId();
        this._patrons.push(patron);
        patron.isSaved = true;

        log(`${patron.fullName} added as Library Patron. their id is ${patron._libraryId} :)`);
    }


    removeBook(title) {
        this._books = this._books.filter(book => {
            if (book._title === title)
                log(`${book._title} removed`);
            return book._title !== title;
        });
    }

    removePatron(firstName) {
        this._patrons = this._patrons.filter(patron => {
            // log(patron.firstName)
            if (patron.firstName === firstName)
                log(`${patron.fullName} removed from the Library :(`)
            return patron.firstName !== firstName;
        })
    }


    borrowBook(patron, title) {
        if (!patron || !title)
            return;

        if (!this._patronExists(patron)) {
            console.error('Error: cannot borrow book to unknown patron');
            return;
        }

        let borrowedBook = new Book();
        borrowedBook = this._bookToLend(title, patron);

        patron._borrowedBooks = patron._borrowedBooks || [];
        patron._borrowedBooks.push(borrowedBook);


        // log(borrowedBook);
        if (borrowedBook)
            log(`${patron.fullName} borrowed ${borrowedBook.title}`);
    }

    _bookToLend(title, patron) {
        const bookIndex = this._books.findIndex(book => {
            return book.title === title;
        });
        if (bookIndex === -1) {
            console.error(`${title} does not exist in our library`);
            return;
        }

        let bookToLend = this._books[bookIndex];

        bookToLend._lentTo = patron.fullName;


        bookToLend.isLent = true;
        return bookToLend;
    }

    _patronExists(patron) {
        return this._patrons.includes(patron);
    }

    _generatePatronId() {
        let randNum = Math.floor(Math.random() * 999999);


        for (; this.patronIdExists(randNum);) {
            randNum = Math.floor(Math.random() * 999999);
        }

        return randNum;
    }

    patronIdExists(id) {
        for (const patron of this.allPatrons) {
            if (patron._libraryId === id)
                return true;
        }
        return false;
    }

    _IsbnExists(isbn) {
        for (const book of this.allBooks) {
            if (book._isbn == isbn)
                return true;
        }
        return false;
    }
}



class Patron {
    constructor(firstName, lastName, age) {
        this._age = age;
        this._lastName = lastName;
        this._firstName = firstName;
        this._borrowedBooks = null; // change to comment
    }

    get fullName() {
        return this._firstName + ' ' + this._lastName;
    }
    get age() {
        return this._age;
    }
    get firstName() {
        return this._firstName
    }
    get allBorrowedBooks() {
        if (!this._borrowedBooks) {
            console.error(` ${this.fullName} has no books borrowed yet!`);
        }
        return this._borrowedBooks;
    }
    get libraryId() {
        if (!this._libraryId) {
            console.error(` ${this.fullName} has no books borrowed yet!`);
        }
        return this._libraryId;
    }
    get
}

class Book {
    constructor(isbn, title, author, year) {
        this._title = title;
        this._author = author;
        this._year = year;
        this._isbn = this.validateIsbn(isbn) ? isbn : null;
        this._isLent;
        this._patron;
    }

    validateIsbn(isbn) {
        const isbnRegex = /^(?:\d[- ]?){9}[\d|X]$/;
        return isbnRegex.test(isbn);
    }
    
    get isbn() {
        return this._isbn;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get year() {
        return this._year;
    }

    get info() {
        log(this);
    }
    get isSaved() {
        return this._isSaved;
    }
    get isLent() {
        return this._isLent;
    }
    get isLentTo() {
        return this._LentTo;
    }

    set isLent(value) {
        if (typeof value !== 'boolean') {
            console.error('Error determining lent state of book: Value not valid');
            return null;
        }
        this._isLent = value;
    }
    set isSaved(status) {
        if (typeof status !== 'boolean') {
            console.error(`Error setting book save status: ${status} is not a valid value`);
            return null;
        }

        this._isSaved = status;
    }
}





const patron1 = new Patron('Barizaa', 'Bamidele', 21);
const patron2 = new Patron('David', 'Orkwar', 23);
const book1 = new Book('3-598-21507-X', '1984', 'George Orwell', 1924);
const book2 = new Book('99921-58-10-7', 'Half of A Yellow Sun', 'Chimamanda Adichie', 2002);
const book3 = new Book('91322-67-51-8', 'Leon', 'Kit De Waal', 2001);


















let library = new Library();
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

library.addPatron(patron1);
library.addPatron(patron2);

library.borrowBook(patron2, book1.title);
library.borrowBook(patron2, book2.title);

// library.removeBook(book1.title);



horizont('LIBRARY DETAILS');
log(library);

// library = JSON.parse(localStorage.getItem('library2')) || library;
console.log(library);

// localStorage.setItem('library2', JSON.stringify(library));



const jsonString = JSON.stringify(book1);
const jString = JSON.stringify(book2);
localStorage.setItem('book1', jsonString);
localStorage.setItem('book2', jString);
// sessionStorage.setItem('book1', jsonString);
// localStorage.removeItem('book1');
// sessionStorage.removeItem('book1');


printBook();
printPatrons();

function printBook() {

    console.table(library._books)
}
function printPatrons() {
    console.table(library._patrons, ['_firstName', '_lastName', '_age', '_libraryId']);
}

// log(Object.values(book1));

console.groupEnd();