setDate();
var expenseForm = document.getElementById("expense-form");
var expenseList = document.getElementById("expense-list");
var incomeForm = document.getElementById("income-form");
var incomeList = document.getElementById("income-list");
var categoryForm = document.getElementById("category-form");
var categoryList = document.getElementById("category-list");
var categoryModal = document.querySelector(".category-modal");
var toggleCategoryBtn = document.getElementById("toggle-category");
var toggleExpenseBtn = document.getElementById("toggle-expense");
var toggleIncomeBtn = document.getElementById("toggle-income");
var expenseSearchInput = document.getElementById("expense-search");
var incomeSearchInput = document.getElementById("income-search");
checkLocalStorage();
var expensesJSON = localStorage.getItem("expenses");
var expenses = expensesJSON ? JSON.parse(expensesJSON) : [];
var incomesJSON = localStorage.getItem("incomes");
var incomes = incomesJSON ? JSON.parse(incomesJSON) : [];
var categoriesJSON = localStorage.getItem("categories");
var categories = categoriesJSON ? JSON.parse(categoriesJSON) : [];
var expenseSearchTimer;
expenseSearchInput.addEventListener("input", function (e) {
    e.preventDefault();
    clearTimeout(expenseSearchTimer);
    expenseSearchTimer = setTimeout(function () {
        var searchTerm = expenseSearchInput.value.toLowerCase();
        console.log(searchTerm);
        var filteredExpenses = expenses.filter(function (expense) {
            return expense.notes.toLowerCase().includes(searchTerm);
        });
        displayExpenses(filteredExpenses);
    }, 500);
});
var incomeSearchTimer;
incomeSearchInput.addEventListener("input", function (e) {
    e.preventDefault();
    clearTimeout(incomeSearchTimer);
    incomeSearchTimer = setTimeout(function () {
        var searchTerm = incomeSearchInput.value.toLowerCase();
        var filteredIncomes = incomes.filter(function (income) {
            return income.notes.toLowerCase().includes(searchTerm);
        });
        displayIncomes(filteredIncomes);
    }, 500);
});
toggleExpenseBtn.addEventListener("click", function () {
    var expenseContainer = document.querySelector(".expense-container");
    var incomeContainer = document.querySelector(".income-container");
    if (expenseContainer instanceof HTMLDivElement) {
        expenseContainer.style.display = "block";
    }
    if (incomeContainer instanceof HTMLDivElement) {
        incomeContainer.style.display = "none";
    }
    toggleExpenseBtn.disabled = true;
    toggleIncomeBtn.disabled = false;
});
toggleIncomeBtn.addEventListener("click", function () {
    var expenseContainer = document.querySelector(".expense-container");
    var incomeContainer = document.querySelector(".income-container");
    if (expenseContainer instanceof HTMLDivElement) {
        expenseContainer.style.display = "none";
    }
    if (incomeContainer instanceof HTMLDivElement) {
        incomeContainer.style.display = "block";
    }
    toggleExpenseBtn.disabled = false;
    toggleIncomeBtn.disabled = true;
});
toggleCategoryBtn.addEventListener("click", function () {
    categoryModal.classList.toggle("hidden");
});
window.addEventListener("click", function (e) {
    if (e.target === categoryModal) {
        categoryModal.classList.toggle("hidden");
    }
});
categoryForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var categoryName = document.getElementById("category-name").value;
    var category = {
        id: Date.now(),
        name: categoryName,
    };
    categories.push(category);
    localStorage.setItem("categories", JSON.stringify(categories));
    displayCategoriesDropdown(categories);
    displayCategoriesList(categories);
    categoryForm.reset();
});
expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var expenseName = document.getElementById("expense-name").value;
    var expenseAmount = parseFloat(document.getElementById("expense-amount").value);
    var expenseCategory = document.getElementById("expense-category").value;
    var expenseDate = document.getElementById("expense-date").value;
    var expenseNotes = document.getElementById("expense-notes").value;
    var expense = {
        id: Date.now(),
        name: expenseName,
        amount: expenseAmount,
        category: expenseCategory,
        date: expenseDate,
        notes: expenseNotes,
    };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses(expenses);
    expenseForm.reset();
    document.getElementById("expense-date").valueAsDate =
        new Date();
});
incomeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var incomeName = document.getElementById("income-name").value;
    var incomeAmount = parseFloat(document.getElementById("income-amount").value);
    var incomeDate = document.getElementById("income-date").value;
    var incomeNotes = document.getElementById("income-notes").value;
    var income = {
        id: Date.now(),
        name: incomeName,
        amount: incomeAmount,
        date: incomeDate,
        notes: incomeNotes,
    };
    incomes.push(income);
    localStorage.setItem("incomes", JSON.stringify(incomes));
    displayIncomes(incomes);
    incomeForm.reset();
    document.getElementById("income-date").valueAsDate =
        new Date();
});
expenseList.addEventListener("click", function (e) {
    var target = e.target;
    if (target instanceof HTMLElement) {
        if (target.classList.contains("delete-btn")) {
            var id_1 = parseInt(target.dataset.id);
            expenses = expenses.filter(function (expense) { return expense.id !== id_1; });
            localStorage.setItem("expenses", JSON.stringify(expenses));
            displayExpenses(expenses);
        }
    }
});
incomeList.addEventListener("click", function (e) {
    var target = e.target;
    if (target instanceof HTMLElement) {
        if (target.classList.contains("delete-btn")) {
            var id_2 = parseInt(target.dataset.id);
            incomes = incomes.filter(function (income) { return income.id !== id_2; });
            localStorage.setItem("incomes", JSON.stringify(incomes));
            displayIncomes(incomes);
        }
    }
});
categoryList.addEventListener("click", function (e) {
    var target = e.target;
    if (target instanceof HTMLElement) {
        if (target.classList.contains("delete-category-btn")) {
            var categoryId_1 = parseInt(target.dataset.id);
            categories = categories.filter(function (cat) { return cat.id !== categoryId_1; });
            localStorage.setItem("categories", JSON.stringify(categories));
            displayCategoriesList(categories);
        }
    }
});
function setDate() {
    var expenseDateElement = document.getElementById("expense-date");
    var incomeDateElement = document.getElementById("income-date");
    if (incomeDateElement instanceof HTMLInputElement) {
        incomeDateElement.valueAsDate = new Date();
    }
    if (expenseDateElement instanceof HTMLInputElement) {
        expenseDateElement.valueAsDate = new Date();
    }
}
function displayCategoriesDropdown(categories) {
    var categorySelect = document.getElementById("expense-category");
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(function (category) {
        // console.log(category);
        var option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}
function displayCategoriesList(categories) {
    var categoryList = document.getElementById("category-list");
    categoryList.innerHTML = "";
    categories.forEach(function (category) {
        var row = document.createElement("tr");
        row.innerHTML = "\n        <td>".concat(category.name, "</td>\n        <td>\n\n          <button class=\"delete-category-btn\" data-id=\"").concat(category.id, "\">Delete</button>\n        </td>\n      ");
        categoryList.appendChild(row);
    });
}
function displayExpenses(expenses) {
    expenseList.innerHTML = "";
    expenses.forEach(function (expense) {
        var row = document.createElement("tr");
        row.innerHTML = "\n                  <td>".concat(expense.name, "</td>\n                  <td>BDT ").concat(expense.amount.toFixed(2), "</td>\n                  <td>").concat(expense.category, "</td>\n                  <td>").concat(expense.date, "</td>\n                  <td>").concat(expense.notes, "</td>\n                  <td>\n                    <button class=\"delete-btn\" data-id=\"").concat(expense.id, "\">Delete</button>\n                </td>\n              ");
        expenseList.appendChild(row);
    });
}
function displayIncomes(incomes) {
    incomeList.innerHTML = "";
    incomes.forEach(function (income) {
        var row = document.createElement("tr");
        row.innerHTML = "\n                  <td>".concat(income.name, "</td>\n                  <td>BDT ").concat(income.amount.toFixed(2), "</td>\n                  <td>").concat(income.date, "</td>\n                  <td>").concat(income.notes, "</td>\n                  <td>\n                    <button class=\"delete-btn\" data-id=\"").concat(income.id, "\">Delete</button>\n                </td>\n              ");
        incomeList.appendChild(row);
    });
}
function checkLocalStorage() {
    if (!localStorage.getItem("expenses")) {
        console.log("Expenses does not exist");
        localStorage.setItem("expenses", JSON.stringify([]));
    }
    else {
        console.log("Expenses exists");
        var storedExpenses = JSON.parse(localStorage.getItem("expenses"));
        displayExpenses(storedExpenses);
    }
    if (!localStorage.getItem("incomes")) {
        console.log("Incomes does not exist");
        localStorage.setItem("incomes", JSON.stringify([]));
    }
    else {
        console.log("Incomes exists");
        var storedIncomes = JSON.parse(localStorage.getItem("incomes"));
        displayIncomes(storedIncomes);
    }
    if (!localStorage.getItem("categories")) {
        console.log("Categories does not exist");
        localStorage.setItem("categories", JSON.stringify([]));
    }
    else {
        console.log("Categories exists");
        var storedCaegories = JSON.parse(localStorage.getItem("categories"));
        displayCategoriesDropdown(storedCaegories);
        displayCategoriesList(storedCaegories);
    }
}
