
const transactionCount = document.getElementById("transactionCount");
const highestExpense = document.getElementById("highestExpense");
const search = document.getElementById("search");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editId = null;

const expenseList = document.getElementById("expense-list");
const totalExpense = document.getElementById("totalExpense");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const description = document.getElementById("description");
const addBtn = document.getElementById("addBtn");

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateTotal() {

    let total = 0;
    let highest = 0;

    expenses.forEach(function(expense){

        total += expense.amount;

        if(expense.amount > highest){
            highest = expense.amount;
        }

    });

    totalExpense.textContent = "₹" + total;
    transactionCount.textContent = expenses.length;
    highestExpense.textContent = "₹" + highest;

}
function displayExpenses() {

    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML = "No expenses yet.";
        updateTotal();
        return;
    }

    expenses.forEach(function(expense) {

        expenseList.innerHTML += `
        <div class="expense-item" data-id="${expense.id}">

            <h3>₹${expense.amount}</h3>

            <p><strong>Category:</strong> ${expense.category}</p>

            <p><strong>Date:</strong> ${expense.date}</p>

            <p><strong>Description:</strong> ${expense.description}</p>

            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>

        </div>
        `;

    });

    updateTotal();
}

displayExpenses();
addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (
        amount.value === "" ||
        date.value === "" ||
        description.value === ""
    ) {
        alert("Please fill all the fields!");
        return;
    }

    if (Number(amount.value) <= 0) {
        alert("Amount should be greater than 0!");
        return;
    }

    if (editId === null) {

        expenses.push({
            id: Date.now(),
            amount: Number(amount.value),
            category: category.value,
            date: date.value,
            description: description.value
        });

    } else {

        const expense = expenses.find(function(item){
            return item.id === editId;
        });

        expense.amount = Number(amount.value);
        expense.category = category.value;
        expense.date = date.value;
        expense.description = description.value;

        editId = null;
        addBtn.textContent = "Add Expense";
    }

    saveExpenses();
    displayExpenses();

    amount.value = "";
    category.selectedIndex = 0;
    date.value = "";
    description.value = "";
});

expenseList.addEventListener("click", function(e){

    const card = e.target.closest(".expense-item");

    if(!card) return;

    const id = Number(card.dataset.id);

    if(e.target.classList.contains("deleteBtn")){

        expenses = expenses.filter(function(item){
            return item.id !== id;
        });

        saveExpenses();
        displayExpenses();
    }

    if(e.target.classList.contains("editBtn")){
        e.preventDefault();
console.log("Edit clicked");

        const expense = expenses.find(function(item){
            return item.id === id;
        });

        amount.value = expense.amount;
        category.value = expense.category;
        date.value = expense.date;
        description.value = expense.description;

        editId = id;

        addBtn.textContent = "Update Expense";
    }

});
search.addEventListener("keyup", function () {

    const value = search.value.toLowerCase();

    const cards = document.querySelectorAll(".expense-item");

    cards.forEach(function(card){

        const text = card.textContent.toLowerCase();

        if(text.includes(value)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});
const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light Mode";
}

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙 Dark Mode";
    }

});
const filterCategory = document.getElementById("filterCategory");
filterCategory.addEventListener("change", function () {

    const selected = filterCategory.value;

    const cards = document.querySelectorAll(".expense-item");

    cards.forEach(function (card) {

        const categoryText = card.querySelector("p").textContent;
        const category = categoryText.replace("Category:", "").trim();

        if (selected === "All" || category === selected) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});
const sortExpense = document.getElementById("sortExpense");
sortExpense.addEventListener("change", function () {

    if (sortExpense.value === "low") {
        expenses.sort((a, b) => a.amount - b.amount);
    }

    else if (sortExpense.value === "high") {
        expenses.sort((a, b) => b.amount - a.amount);
    }

    else if (sortExpense.value === "new") {
        expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    else if (sortExpense.value === "old") {
        expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    displayExpenses();

});