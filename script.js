let total = 0;

const expenseList = document.getElementById("expense-list");
const totalExpense = document.getElementById("totalExpense");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const description = document.getElementById("description");
const addBtn = document.getElementById("addBtn");

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

    total += Number(amount.value);

    totalExpense.textContent = "Total Expenses : ₹" + total;
if (expenseList.innerHTML.trim() === "No expenses yet.") {
    expenseList.innerHTML = "";
}

expenseList.innerHTML += `
<div class="expense-item">

    <h3>₹${amount.value}</h3>

    <p><strong>Category:</strong> ${category.value}</p>

    <p><strong>Date:</strong> ${date.value}</p>

    <p><strong>Description:</strong> ${description.value}</p>

</div>
`;
});