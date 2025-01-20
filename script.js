const entryForm = document.getElementById("entryform");
const entryTitleInput = document.querySelector(".entry-title");
const dailyEntryInput = document.getElementById("dailyentry");
const entryResultRow = document.querySelector(".entryresultrow");

let editingIndex;

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    renderEntries(entries);
}

function saveEntries(entries) {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
}

function renderEntries(entries) {
    entryResultRow.innerHTML = ""; 

    entries.forEach((entry, index) => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "entry";
        entryDiv.innerHTML = `
            <h2>${entry.title}</h2>
            <p>${entry.content}</p>
            <p class="entry-date">Date: ${entry.date}</p>
            <button class="btn-edit" data-index="${index}">Edit</button>
            <button class="btn-delete" data-index="${index}">Delete</button>`;
        entryResultRow.appendChild(entryDiv);
    });
}

entryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = entryTitleInput.value.trim();
    const content = dailyEntryInput.value.trim();

    if (title && content) {
        const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

        const now = new Date();
        const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

        if (editingIndex !== undefined) {
            entries[editingIndex] = { title, content, date: formattedDate };
            editingIndex = undefined; 
        } 
        else {
            entries.push({ title, content, date: formattedDate });
        }

        saveEntries(entries);
        renderEntries(entries);

        entryTitleInput.value = "";
        dailyEntryInput.value = "";
    }
});

entryResultRow.addEventListener("click", (e) => {
    const target = e.target;
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    const index = target.getAttribute("data-index");

    if (target.classList.contains("btn-edit")) {
        const entry = entries[index];
        entryTitleInput.value = entry.title;
        dailyEntryInput.value = entry.content;
        editingIndex = index; 
    } else if (target.classList.contains("btn-delete")) {
        entries.splice(index, 1);
        saveEntries(entries);
        renderEntries(entries);
    }
});

document.addEventListener("DOMContentLoaded", loadEntries);
