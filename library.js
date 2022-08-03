/* eslint-disable max-classes-per-file */
class Books {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// UI class
class UserInterface {
  // Loop books for display books
  static displayBooks() {
    const books = BookStorage.getLocalStorageBooks();
    if (books != null) {
      books.forEach((book) => (UserInterface.renderBooks(book)));
    }
  }

  static renderBooks(book) {
    const booksContainer = document.querySelector('.book-details');
    booksContainer.innerHTML += `
      <tr>
      <td colspan="2">
          "${book.title}" by ${book.author}
      </td>
      <td>
          <button class="delete-btn" id="${book.id}">Remove</button>
      </td>
  </tr>
      `;
  }

  static generateID() {
    return Math.floor(Math.random() * 100);
  }
}

// LocalSTorage class
class BookStorage {
  // Get book from local storage
  static getLocalStorageBooks() {
    let bookks;
    if (localStorage.getItem('books') === null) {
      bookks = [];
    } else {
      bookks = JSON.parse(localStorage.getItem('books'));
    }
    return bookks;
  }

  // Add book to local storage
  static addBookToLocalStorage(book) {
    const books = BookStorage.getLocalStorageBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  // Remove book from local storage
  static RemoveBookFromLocalStorage(removeid) {
    const booksList = BookStorage.getLocalStorageBooks();
    const booksArray = booksList;
    const newlist = booksArray.filter((item) => item.id != removeid);
    localStorage.setItem('books', JSON.stringify(newlist));
  }
}
// Events: Render on page load
UserInterface.displayBooks();

// Events: Add books
const form = document.getElementById('add-book');
form.addEventListener('submit', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = UserInterface.generateID();
  // Instatiate class
  const addedBooks = new Books(title, author, id);

  // Add book to local storage
  BookStorage.addBookToLocalStorage(addedBooks);
  // Render the books added
  UserInterface.renderBooks(addedBooks);
});
// Events Remove books
const removeBook = document.querySelectorAll('.delete-btn');
removeBook.forEach((element) => {
  element.addEventListener('click', (e) => {
    console.log(element);
    const button = e.target;
    const removeid = e.target.id;
    BookStorage.RemoveBookFromLocalStorage(removeid);
    button.parentElement.parentElement.remove();
  });
});
