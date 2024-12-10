let books = [];

const bookForm = document.getElementById("bookForm");
const bookFormTitleInput = document.getElementById("bookFormTitle");
const bookFormAuthorInput = document.getElementById("bookFormAuthor");
const bookFormYearInput = document.getElementById("bookFormYear");
const bookFormIsCompleteCheckbox =
  document.getElementById("bookFormIsComplete");
const incompleteBookList = document.getElementById("incompleteBookList");
const completeBookList = document.getElementById("completeBookList");
const searchBookTitleInput = document.getElementById("searchBookTitle");

function saveBooksToLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooksFromLocalStorage() {
  const savedBooks = localStorage.getItem("books");
  if (savedBooks) {
    books = JSON.parse(savedBooks);
  } else {
    books = [];
  }
}

function renderBooks() {
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.setAttribute("data-bookid", book.id);
    bookElement.setAttribute("data-testid", "bookItem");

    const title = document.createElement("h3");
    title.setAttribute("data-testid", "bookItemTitle");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.setAttribute("data-testid", "bookItemAuthor");
    author.textContent = `Penulis: ${book.author}`;

    const year = document.createElement("p");
    year.setAttribute("data-testid", "bookItemYear");
    year.textContent = `Tahun: ${book.year}`;

    const actionsDiv = document.createElement("div");

    const completeButton = document.createElement("button");
    completeButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    completeButton.textContent = book.isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";
    completeButton.addEventListener("click", () => toggleBookComplete(book.id));

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.textContent = "Hapus Buku";
    deleteButton.addEventListener("click", () => deleteBook(book.id));

    const editButton = document.createElement("button");
    editButton.setAttribute("data-testid", "bookItemEditButton");
    editButton.textContent = "Edit Buku";
    editButton.addEventListener("click", () => editBook(book.id));

    actionsDiv.appendChild(completeButton);
    actionsDiv.appendChild(deleteButton);
    actionsDiv.appendChild(editButton);

    bookElement.appendChild(title);
    bookElement.appendChild(author);
    bookElement.appendChild(year);
    bookElement.appendChild(actionsDiv);

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });

  saveBooksToLocalStorage();
}

function addBook(event) {
  event.preventDefault();

  const newBook = {
    id: Date.now().toString(),
    title: bookFormTitleInput.value,
    author: bookFormAuthorInput.value,
    year: bookFormYearInput.value,
    isComplete: bookFormIsCompleteCheckbox.checked,
  };

  books.push(newBook);
  renderBooks();

  bookForm.reset();
}

function toggleBookComplete(id) {
  const book = books.find((book) => book.id === id);
  if (book) {
    book.isComplete = !book.isComplete;
    renderBooks();
  }
}

function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  renderBooks();
}

function editBook(id) {
  const book = books.find((book) => book.id === id);
  if (book) {
    bookFormTitleInput.value = book.title;
    bookFormAuthorInput.value = book.author;
    bookFormYearInput.value = book.year;
    bookFormIsCompleteCheckbox.checked = book.isComplete;

    deleteBook(id);
  }
}

function searchBook(event) {
  event.preventDefault();

  const searchTitle = searchBookTitleInput.value.toLowerCase();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTitle)
  );

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  filteredBooks.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.setAttribute("data-bookid", book.id);
    bookElement.setAttribute("data-testid", "bookItem");

    const title = document.createElement("h3");
    title.setAttribute("data-testid", "bookItemTitle");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.setAttribute("data-testid", "bookItemAuthor");
    author.textContent = `Penulis: ${book.author}`;

    const year = document.createElement("p");
    year.setAttribute("data-testid", "bookItemYear");
    year.textContent = `Tahun: ${book.year}`;

    const actionsDiv = document.createElement("div");

    const completeButton = document.createElement("button");
    completeButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    completeButton.textContent = book.isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";
    completeButton.addEventListener("click", () => toggleBookComplete(book.id));

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.textContent = "Hapus Buku";
    deleteButton.addEventListener("click", () => deleteBook(book.id));

    const editButton = document.createElement("button");
    editButton.setAttribute("data-testid", "bookItemEditButton");
    editButton.textContent = "Edit Buku";
    editButton.addEventListener("click", () => editBook(book.id));

    actionsDiv.appendChild(completeButton);
    actionsDiv.appendChild(deleteButton);
    actionsDiv.appendChild(editButton);

    bookElement.appendChild(title);
    bookElement.appendChild(author);
    bookElement.appendChild(year);
    bookElement.appendChild(actionsDiv);

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
}

bookForm.addEventListener("submit", addBook);

const searchForm = document.getElementById("searchBook");
searchForm.addEventListener("submit", searchBook);

loadBooksFromLocalStorage();
renderBooks();
