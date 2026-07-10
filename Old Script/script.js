// document.addEventListener("DOMContentLoaded", () => {
document.getElementById("expense-date").valueAsDate = new Date();
document.getElementById("income-date").valueAsDate = new Date();

const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");

const incomeForm = document.getElementById("income-form");
const incomeList = document.getElementById("income-list");

const categoryForm = document.getElementById("category-form");
const categoryList = document.getElementById("category-list");
const categoryModal = document.querySelector(".category-modal");

const toggleCategoryBtn = document.getElementById("toggle-category");
const toggleExpenseBtn = document.getElementById("toggle-expense");
const toggleIncomeBtn = document.getElementById("toggle-income");

const expenseSearchInput = document.getElementById("expense-search");
const incomeSearchInput = document.getElementById("income-search");

checkLocalStorage();

let expenses = JSON.parse(localStorage.getItem("expenses"));
let incomes = JSON.parse(localStorage.getItem("incomes"));
let categories = JSON.parse(localStorage.getItem("categories"));

let expenseSearchTimer;

expenseSearchInput.addEventListener("input", (e) => {
  e.preventDefault();

  clearTimeout(expenseSearchTimer);

  expenseSearchTimer = setTimeout(() => {
    const searchTerm = expenseSearchInput.value.toLowerCase();
    console.log(searchTerm);

    filteredExpenses = expenses.filter((expense) =>
      expense.notes.toLowerCase().includes(searchTerm),
    );
    displayExpenses(filteredExpenses);
  }, 500);
});

let incomeSearchTimer;

incomeSearchInput.addEventListener("input", (e) => {
  e.preventDefault();

  clearTimeout(incomeSearchTimer);

  incomeSearchTimer = setTimeout(() => {
    const searchTerm = incomeSearchInput.value.toLowerCase();
    filteredIncomes = incomes.filter((income) =>
      income.notes.toLowerCase().includes(searchTerm),
    );
    displayIncomes(filteredIncomes);
  }, 500);
});

toggleExpenseBtn.addEventListener("click", () => {
  document.querySelector(".expense-container").style.display = "block";
  document.querySelector(".income-container").style.display = "none";
  toggleExpenseBtn.disabled = true;
  toggleIncomeBtn.disabled = false;
});

toggleIncomeBtn.addEventListener("click", () => {
  document.querySelector(".expense-container").style.display = "none";
  document.querySelector(".income-container").style.display = "block";
  toggleExpenseBtn.disabled = false;
  toggleIncomeBtn.disabled = true;
});

toggleCategoryBtn.addEventListener("click", () => {
  categoryModal.classList.toggle("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === categoryModal) {
    categoryModal.classList.toggle("hidden");
  }
});

categoryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const categoryName = document.getElementById("category-name").value;

  const category = {
    id: Date.now(),
    name: categoryName,
  };

  categories.push(category);
  localStorage.setItem("categories", JSON.stringify(categories));
  displayCategoriesDropdown(categories);
  displayCategoriesList(categories);

  categoryForm.reset();
});

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const expenseName = document.getElementById("expense-name").value;
  const expenseAmount = parseFloat(
    document.getElementById("expense-amount").value,
  );
  const expenseCategory = document.getElementById("expense-category").value;
  const expenseDate = document.getElementById("expense-date").value;
  const expenseNotes = document.getElementById("expense-notes").value;

  const expense = {
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

  document.getElementById("expense-date").valueAsDate = new Date();
});

incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const incomeName = document.getElementById("income-name").value;
  const incomeAmount = parseFloat(
    document.getElementById("income-amount").value,
  );
  // const incomeCategory = document.getElementById("income-category").value;
  const incomeDate = document.getElementById("income-date").value;
  const incomeNotes = document.getElementById("income-notes").value;

  const income = {
    id: Date.now(),
    name: incomeName,
    amount: incomeAmount,
    // category: incomeCategory,
    date: incomeDate,
    notes: incomeNotes,
  };

  incomes.push(income);
  localStorage.setItem("incomes", JSON.stringify(incomes));
  displayIncomes(incomes);

  incomeForm.reset();

  document.getElementById("income-date").valueAsDate = new Date();
});

expenseList.addEventListener("click", (e) => {
  const id = parseInt(e.target.dataset.id);
  expenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses(expenses);
});

incomeList.addEventListener("click", (e) => {
  const id = parseInt(e.target.dataset.id);
  incomes = incomes.filter((income) => income.id !== id);
  localStorage.setItem("incomes", JSON.stringify(incomes));
  displayIncomes(incomes);
});

categoryList.addEventListener("click", (e) => {
  const categoryId = parseInt(e.target.dataset.id);
  categories = categories.filter((cat) => cat.id !== categoryId);
  localStorage.setItem("categories", JSON.stringify(categories));
  displayCategoriesList(categories);
});

function displayCategoriesDropdown(categories) {
  const categorySelect = document.getElementById("expense-category");
  categorySelect.innerHTML = '<option value="">Select Category</option>';
  categories.forEach((category) => {
    // console.log(category);
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

function displayCategoriesList(categories) {
  const categoryList = document.getElementById("category-list");
  categoryList.innerHTML = "";
  categories.forEach((category) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${category.name}</td>
        <td>
        
          <button class="delete-category-btn" data-id="${category.id}">Delete</button>
        </td>
      `;
    categoryList.appendChild(row);
  });
}

function displayExpenses(expenses) {
  expenseList.innerHTML = "";
  expenses.forEach((expense) => {
    const row = document.createElement("tr");

    row.innerHTML = `
                  <td>${expense.name}</td>
                  <td>BDT ${expense.amount.toFixed(2)}</td>
                  <td>${expense.category}</td>
                  <td>${expense.date}</td>
                  <td>${expense.notes}</td>
                  <td>  
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
              `;

    expenseList.appendChild(row);
  });
}

function displayIncomes(incomes) {
  incomeList.innerHTML = "";
  incomes.forEach((income) => {
    const row = document.createElement("tr");

    // <!-- <td>${income.category}</td> -->

    row.innerHTML = `
                  <td>${income.name}</td>
                  <td>BDT ${income.amount.toFixed(2)}</td>
                  <td>${income.date}</td>
                  <td>${income.notes}</td>
                  <td>  
                    <button class="delete-btn" data-id="${income.id}">Delete</button>
                </td>
              `;

    incomeList.appendChild(row);
  });
}

function checkLocalStorage() {
  if (!localStorage.getItem("expenses")) {
    console.log("Expenses does not exist");
    localStorage.setItem("expenses", JSON.stringify([]));
  } else {
    console.log("Expenses exists");
    displayExpenses(JSON.parse(localStorage.getItem("expenses")));
  }

  if (!localStorage.getItem("incomes")) {
    console.log("Incomes does not exist");
    localStorage.setItem("incomes", JSON.stringify([]));
  } else {
    console.log("Incomes exists");
    displayIncomes(JSON.parse(localStorage.getItem("incomes")));
  }

  if (!localStorage.getItem("categories")) {
    console.log("Categories does not exist");
    localStorage.setItem("categories", JSON.stringify([]));
  } else {
    console.log("Categories exists");
    displayCategoriesDropdown(JSON.parse(localStorage.getItem("categories")));
    displayCategoriesList(JSON.parse(localStorage.getItem("categories")));
  }
}
// });
