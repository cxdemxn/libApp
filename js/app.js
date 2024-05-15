/*

=> i need to, eventually, clear input field on save

*/ 

console.group('main.js');

class BookForm {
    constructor() {
        this.bookIsbn = document.querySelector('#bookIsbn');
        this.bookTitle = document.querySelector('#bookTitle');
        this.bookAuthor = document.querySelector('#bookAuthor');
        this.bookYear = document.querySelector('#bookYear');
        this.statusMsg = document.querySelector('#bookStatusMsg');
        this.saveBookButton = document.querySelector('#saveBook');

        this.saveBookButton.addEventListener('click', this.saveBook.bind(this));
    }

    saveBook() {
        const isbn = this.bookIsbn.value;
        const title = this.bookTitle.value;
        const author = this.bookAuthor.value;
        const year = this.bookYear.value;

        const book = new Book(isbn, title, author, year);

        this.saveToLibrary(book);
    }

    saveToLibrary(book) {
        let existingLibrary = new Library();
        existingLibrary = buildLib('library2');

        existingLibrary.addBook(book);

        if (!book.isSaved) {
            console.log('Book not saved');
            this.statusMsg.style.backgroundColor = '#e91313';
            this.statusMsg.textContent = `${book.title} rejected: Book with isbn ${book.isbn} exists in library already`;
            return;
        }

        localStorage.setItem(`library2`, JSON.stringify(existingLibrary));

        console.log(`${book.title} has been saved`);
        this.statusMsg.style.backgroundColor = '#90ee90';
        this.statusMsg.textContent = `${book.title} accepted!`;
        setTimeout(() => {
            
            location.reload();
        }, 1500);
            return;
    }
}

const bookForm = new BookForm();
// console.log(bookForm.Title);

console.table(JSON.parse(localStorage.getItem('library')));



class PatronForm {
    constructor() {
        this.firstName = document.querySelector('#firstName');
        this.lastName = document.querySelector('#lastName');
        this.age = document.querySelector('#age');
        this.patronStatusMsg = document.querySelector('#patronStatusMsg');
        this.savePatronButton = document.querySelector('#savePatron');

        this.savePatronButton.addEventListener('click', this.savePatron.bind(this));
    }

    savePatron() {
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const age = this.age.value;

        if (containsNumbers(firstName) || containsNumbers(lastName)) {
            // need to find a way to display console depending on color chosen
            console.error('name cannot contain number')
            printStatusMsg(this.patronStatusMsg, 'name cannot contain number', 'red', 3000);
            return;
        }

        if (!containsOnlyNumber(age)) {
            console.error('age must contain only number')
            printStatusMsg(this.patronStatusMsg, 'age must contain only number', 'red', 3000);
            return;
        }

        const patron = new Patron(firstName, lastName, age);

        this.saveToLibrary(patron);
    }
    
    saveToLibrary(patron) {
        let existingLibrary = new Library();
        existingLibrary = buildLib('library2');

        existingLibrary.addPatron(patron);

        localStorage.setItem('library2', JSON.stringify(existingLibrary));
        
        printStatusMsg(this.patronStatusMsg, `${patron.fullName} added as Library Patron. their id is ${patron.libraryId} :)`, 'green', 7000);

        setTimeout(() => {
            this.firstName.value = '';
            this.lastName.value = '';
            this.age.value = '';
            location.reload();
        }, 1500);
        return;
    }
}


const patronForm = new PatronForm();







class LibraryTable {
    constructor() {
        this._library = new Library();
        this.bookTableBody = document.querySelector('#bookTableBody');
        this.bookStatusMsg = document.querySelector('#bookTableStatusMsg');

        this.patronTableBody = document.querySelector('')

        this.printBookTable();
    }

    printBookTable(lib) {
        this._library = buildLib('library2');
        this.createBookTable();
        this.setRemoveButton();
        
    }

    createBookTable() {
        let bookIndex = 0;
        this._library._books.forEach(book => {
            const bookRow = document.createElement('tr');
            bookRow.classList.add('bookTableRow');


            bookRow.innerHTML = this._generateBookRowData(bookIndex++, book);

            this.bookTableBody.appendChild(bookRow);
        })
    }


    _generateBookRowData(bookIndex, book) {
        return `
        <td id="bookIndex">${++bookIndex}</td>
        <td class="bookIsbnData">${book._isbn}</td>
        <td class="bookTitleData">${book._title}</td>
        <td class="bookAuthorData">${book._author}</td>
        <td class="bookYearData">${book._year}</td>
        <td class="bookLentData">${book._isLent ? 'Yes' : 'No'}</td>
        <td class="bookLentToData">${book._lentTo ? book._lentTo : 'null'}</td>
        <td class="removeBookBtn"><button >Remove Book</button></td>
        `;
    }

    setRemoveButton() {
        const removeBookBtns = document.querySelectorAll('.removeBookBtn');
        removeBookBtns.forEach(removeBookBtn => {
            removeBookBtn.addEventListener('click', () => {
                const tr = removeBookBtn.parentElement;
                tr.parentElement.removeChild(tr);
                let bookTit = removeBookBtn.parentNode.children[2].textContent;
                console.log(bookTit);

                this._library.removeBook(bookTit);
                console.log(this._library);

                this.saveToLibrary();

                this.clearTable();
                
                this.printBookTable();

                this.printBookTableStatusMsg(bookTit);
            });    
        });
    }

    saveToLibrary() {
        localStorage.setItem('library2', JSON.stringify(this._library));
    }

    clearTable() {
        document.querySelectorAll('.bookTableRow').forEach(row => {
            row.parentElement.removeChild(row);
        });
    }

    printBookTableStatusMsg(title) {
        this.bookStatusMsg.style.backgroundColor = 'yellow';

        this.bookStatusMsg.textContent = `\'${title}\' has been removed from the library`;

        setTimeout(() => {
            this.bookStatusMsg.textContent = ``;
        }, 2000);
    }
    // END OF lIBRARY TABLE CLASS
}

const libraryTable = new LibraryTable()



console.groupEnd();
