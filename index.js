const newButton = document.querySelector("#new-book");
const dialog = document.querySelector("dialog");
const cancelButton = document.querySelector("#cancel");
const form = document.querySelector("form");

newButton.addEventListener("click", () => {
    dialog.setAttribute("open", "");
});

cancelButton.addEventListener("click", event => {
    event.preventDefault();
    dialog.removeAttribute("open");
});

form.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(form);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read");

    myLibrary.push(new Book(title, author, pages, read));
    form.reset();
    //listBooks();
});

let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    };
}

function listBooks(){
    for (book in myLibrary){
        // Create a card for each book and append them to 'books' element
    }
}
