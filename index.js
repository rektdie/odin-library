const newButton = document.querySelector("#new-book");
const dialog = document.querySelector("dialog");
const cancelButton = document.querySelector("#cancel");
const form = document.querySelector("form");
const table = document.querySelector("table");

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
    dialog.removeAttribute("open");
    listBooks();
});

let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function listBooks(){
    while (table.rows.length > 1){
        table.deleteRow(1);
    }

    for (book of myLibrary){
        const row = document.createElement("tr");
        
        for (const property in book){
            if (property === "read") {
                const readButton = document.createElement("button");
                readButton.classList.add("toggle-read");

                if (book[property] == "on") {
                    readButton.textContent = "Yes";
                    readButton.classList.add("read");
                } else {
                    readButton.textContent = "No";
                }

                readButton.addEventListener("click", toggleRead);

                const data = document.createElement("td");
                data.appendChild(readButton);
                row.appendChild(data);
                break;
            }

            const data = document.createElement("td");
            data.textContent = book[property];
            row.appendChild(data);
        }

        const data = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove");
        removeButton.textContent = "X";

        removeButton.addEventListener("click", removeBook);

        data.appendChild(removeButton);
        row.appendChild(data);
        
        table.appendChild(row);
        
    }
}

function toggleRead(){
    const index = this.parentElement.parentElement.rowIndex - 1;

    const readBook = myLibrary[index].read;
    if (readBook == "on"){
        myLibrary[index].read = null;
    } else {
        myLibrary[index].read = "on";
    }

    listBooks();
}

function removeBook(){
    const index = this.parentElement.parentElement.rowIndex - 1;
    
    myLibrary.splice(index, 1);

    listBooks();
}