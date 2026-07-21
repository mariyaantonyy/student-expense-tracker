let total = 0;
let expenses = [];

const expenseList = document.getElementById("expense-list");
const totalExpense = document.getElementById("totalExpense");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const description = document.getElementById("description");
const addBtn = document.getElementById("addBtn");

function displayExpense(expense) {
    expenseList.innerHTML += `
    <div class="expense-item">

        <h3>₹${expense.amount}</h3>

        <p><strong>Category:</strong> ${expense.category}</p>

        <p><strong>Date:</strong> ${expense.date}</p>

        <p><strong>Description:</strong> ${expense.description}</p>

        <button class="deleteBtn">Delete</button>

    </div>
    `;
}

addBtn.addEventListener("click", function () {

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

    if (expenseList.innerHTML.trim() === "No expenses yet.") {
        expenseList.innerHTML = "";
    }

    const expense = {
        amount: Number(amount.value),
        category: category.value,
        date: date.value,
        description: description.value
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    total += expense.amount;

    totalExpense.textContent = "Total Expenses : ₹" + total;

 displayExpense(expense);
    amount.value = "";
    category.selectedIndex = 0;
    date.value = "";
    description.value = "";
});

expenseList.addEventListener("click", function (e) {

    if (e.target.classList.contains("deleteBtn")) {

        const expenseItem = e.target.parentElement;

        const amountText = expenseItem.querySelector("h3").textContent;

        const amountValue = Number(amountText.replace("₹", ""));

        total -= amountValue;

        totalExpense.textContent = "Total Expenses : ₹" + total;

        expenseItem.remove();
    }
});
const savedExpenses = JSON.parse(localStorage.getItem("expenses"));

if (savedExpenses) {

    expenses = savedExpenses;

    expenseList.innerHTML = "";

    total = 0;

    expenses.forEach(function (expense) {

        displayExpense(expense);

        total += expense.amount;

    });

    totalExpense.textContent = "Total Expenses : ₹" + total;
}