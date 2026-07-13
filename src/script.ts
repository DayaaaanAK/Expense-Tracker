interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  notes: string;
}

interface Income {
  id: number;
  name: string;
  amount: number;
  date: string;
  notes: string;
}

interface Category {
  id: number;
  name: string;
}

setDate();

const expenseForm = document.getElementById("expense-form") as HTMLFormElement;
const expenseList = document.getElementById(
  "expense-list",
) as HTMLTableSectionElement;

const incomeForm = document.getElementById("income-form") as HTMLFormElement;
const incomeList = document.getElementById(
  "income-list",
) as HTMLTableSectionElement;

const categoryForm = document.getElementById(
  "category-form",
) as HTMLFormElement;
const categoryList = document.getElementById(
  "category-list",
) as HTMLTableSectionElement;
const categoryModal = document.querySelector(
  ".category-modal",
) as HTMLDivElement;

const toggleCategoryBtn = document.getElementById(
  "toggle-category",
) as HTMLButtonElement;
const toggleExpenseBtn = document.getElementById(
  "toggle-expense",
) as HTMLButtonElement;
const toggleIncomeBtn = document.getElementById(
  "toggle-income",
) as HTMLButtonElement;

const expenseSearchInput = document.getElementById(
  "expense-search",
) as HTMLInputElement;
const incomeSearchInput = document.getElementById(
  "income-search",
) as HTMLInputElement;

checkLocalStorage();

let expensesJSON = localStorage.getItem("expenses");
let expenses: Expense[] = expensesJSON ? JSON.parse(expensesJSON) : [];

let incomesJSON = localStorage.getItem("incomes");
let incomes: Income[] = incomesJSON ? JSON.parse(incomesJSON) : [];

let categoriesJSON = localStorage.getItem("categories");
let categories: Category[] = categoriesJSON ? JSON.parse(categoriesJSON) : [];

let expenseSearchTimer: number;

expenseSearchInput.addEventListener("input", (e) => {
  e.preventDefault();

  clearTimeout(expenseSearchTimer);

  expenseSearchTimer = setTimeout(() => {
    const searchTerm = expenseSearchInput.value.toLowerCase();
    console.log(searchTerm);

    let filteredExpenses: Expense[] = expenses.filter((expense) =>
      expense.notes.toLowerCase().includes(searchTerm),
    );
    displayExpenses(filteredExpenses);
  }, 500);
});

let incomeSearchTimer: number;

incomeSearchInput.addEventListener("input", (e) => {
  e.preventDefault();

  clearTimeout(incomeSearchTimer);

  incomeSearchTimer = setTimeout(() => {
    const searchTerm = incomeSearchInput.value.toLowerCase();
    let filteredIncomes: Income[] = incomes.filter((income) =>
      income.notes.toLowerCase().includes(searchTerm),
    );
    displayIncomes(filteredIncomes);
  }, 500);
});

toggleExpenseBtn.addEventListener("click", () => {
  const expenseContainer = document.querySelector(".expense-container");
  const incomeContainer = document.querySelector(".income-container");

  if (expenseContainer instanceof HTMLDivElement) {
    expenseContainer.style.display = "block";
  }
  if (incomeContainer instanceof HTMLDivElement) {
    incomeContainer.style.display = "none";
  }

  toggleExpenseBtn.disabled = true;
  toggleIncomeBtn.disabled = false;
});

toggleIncomeBtn.addEventListener("click", () => {
  const expenseContainer = document.querySelector(".expense-container");
  const incomeContainer = document.querySelector(".income-container");

  if (expenseContainer instanceof HTMLDivElement) {
    expenseContainer.style.display = "none";
  }
  if (incomeContainer instanceof HTMLDivElement) {
    incomeContainer.style.display = "block";
  }

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

  const categoryName = (
    document.getElementById("category-name") as HTMLInputElement
  ).value;

  const category: Category = {
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

  const expenseName = (
    document.getElementById("expense-name") as HTMLInputElement
  ).value;
  const expenseAmount = parseFloat(
    (document.getElementById("expense-amount") as HTMLInputElement).value,
  );
  const expenseCategory = (
    document.getElementById("expense-category") as HTMLSelectElement
  ).value;
  const expenseDate = (
    document.getElementById("expense-date") as HTMLInputElement
  ).value;
  const expenseNotes = (
    document.getElementById("expense-notes") as HTMLTextAreaElement
  ).value;

  const expense: Expense = {
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

  (document.getElementById("expense-date") as HTMLInputElement).valueAsDate =
    new Date();
});

incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const incomeName = (
    document.getElementById("income-name") as HTMLInputElement
  ).value;
  const incomeAmount = parseFloat(
    (document.getElementById("income-amount") as HTMLInputElement).value,
  );
  const incomeDate = (
    document.getElementById("income-date") as HTMLInputElement
  ).value;
  const incomeNotes = (
    document.getElementById("income-notes") as HTMLTextAreaElement
  ).value;

  const income: Income = {
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

  (document.getElementById("income-date") as HTMLInputElement).valueAsDate =
    new Date();
});

expenseList.addEventListener("click", (e) => {
  const target = e.target;

  if (target instanceof HTMLElement) {
    if (target.classList.contains("delete-btn")) {
      const id = parseInt(target.dataset.id!);

      expenses = expenses.filter((expense) => expense.id !== id);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      displayExpenses(expenses);
    }
  }
});

incomeList.addEventListener("click", (e) => {
  const target = e.target;

  if (target instanceof HTMLElement) {
    if (target.classList.contains("delete-btn")) {
      const id = parseInt(target.dataset.id!);

      incomes = incomes.filter((income) => income.id !== id);
      localStorage.setItem("incomes", JSON.stringify(incomes));
      displayIncomes(incomes);
    }
  }
});

categoryList.addEventListener("click", (e) => {
  const target = e.target;

  if (target instanceof HTMLElement) {
    if (target.classList.contains("delete-category-btn")) {
      const categoryId = parseInt(target.dataset.id!);

      categories = categories.filter((cat) => cat.id !== categoryId);
      localStorage.setItem("categories", JSON.stringify(categories));
      displayCategoriesList(categories);
    }
  }
});

function setDate(): void {
  const expenseDateElement = document.getElementById("expense-date");
  const incomeDateElement = document.getElementById("income-date");

  if (incomeDateElement instanceof HTMLInputElement) {
    incomeDateElement.valueAsDate = new Date();
  }
  if (expenseDateElement instanceof HTMLInputElement) {
    expenseDateElement.valueAsDate = new Date();
  }
}

function displayCategoriesDropdown(categories: Category[]) {
  const categorySelect = document.getElementById(
    "expense-category",
  ) as HTMLSelectElement;
  categorySelect.innerHTML = '<option value="">Select Category</option>';
  categories.forEach((category) => {
    // console.log(category);
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

function displayCategoriesList(categories: Category[]) {
  const categoryList = document.getElementById(
    "category-list",
  ) as HTMLTableSectionElement;
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

function displayExpenses(expenses: Expense[]) {
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

function displayIncomes(incomes: Income[]) {
  incomeList.innerHTML = "";
  incomes.forEach((income) => {
    const row = document.createElement("tr");

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

function checkLocalStorage(): void {
  if (!localStorage.getItem("expenses")) {
    console.log("Expenses does not exist");
    localStorage.setItem("expenses", JSON.stringify([]));
  } else {
    console.log("Expenses exists");
    const storedExpenses: Expense[] = JSON.parse(
      localStorage.getItem("expenses")!,
    );
    displayExpenses(storedExpenses);
  }

  if (!localStorage.getItem("incomes")) {
    console.log("Incomes does not exist");
    localStorage.setItem("incomes", JSON.stringify([]));
  } else {
    console.log("Incomes exists");
    const storedIncomes: Income[] = JSON.parse(
      localStorage.getItem("incomes")!,
    );
    displayIncomes(storedIncomes);
  }

  if (!localStorage.getItem("categories")) {
    console.log("Categories does not exist");
    localStorage.setItem("categories", JSON.stringify([]));
  } else {
    console.log("Categories exists");
    const storedCaegories: Category[] = JSON.parse(
      localStorage.getItem("categories")!,
    );
    displayCategoriesDropdown(storedCaegories);
    displayCategoriesList(storedCaegories);
  }
} 