// function checkLocalStorage() {
//   if (!localStorage.getItem("expenses")) {
//     console.log("Expenses does not exist");
//     localStorage.setItem("expenses", JSON.stringify([]));
//   } else {
//     console.log("Expenses exists");
//     displayExpenses(JSON.parse(localStorage.getItem("expenses")));
//   }

//   if (!localStorage.getItem("categories")) {
//     console.log("Categories does not exist");
//     localStorage.setItem("categories", JSON.stringify([]));
//   } else {
//     console.log("Categories exists");
//     displayCategoriesDropdown(JSON.parse(localStorage.getItem("categories")));
//     displayCategoriesList(JSON.parse(localStorage.getItem("categories")));
//   }
// }

// function displayCategoriesDropdown(categories) {
//   const categorySelect = document.getElementById("expense-category");
//   categorySelect.innerHTML = '<option value="">Select Category</option>';
//   categories.forEach((category) => {
//     console.log(category);
//     const option = document.createElement("option");
//     option.value = category.name;
//     option.textContent = category.name;
//     categorySelect.appendChild(option);
//   });
// }

// function displayCategoriesList(categories) {
//   const categoryList = document.getElementById("category-list");
//   categoryList.innerHTML = "";
//   categories.forEach((category) => {
//     const row = document.createElement("tr");

//     row.innerHTML = `
//         <td>${category.name}</td>
//         <td>
//           <button class="delete-category-btn" data-category="${category.id}">Delete</button>
//         </td>
//       `;
//     categoryList.appendChild(row);
//   });
// }

// function displayExpenses(expenses) {
//   expenseList.innerHTML = "";
//   expenses.forEach((expense) => {
//     const row = document.createElement("tr");

//     row.innerHTML = `
//                   <td>${expense.name}</td>
//                   <td>BDT ${expense.amount.toFixed(2)}</td>
//                   <td>${expense.category}</td>
//                   <td>${expense.date}</td>
//                   <td>${expense.notes}</td>
//                   <td>
//                     <button class="delete-btn" data-id="${expense.id}">Delete</button>
//                 </td>
//               `;

//     expenseList.appendChild(row);
//   });
// }

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("expense-date").valueAsDate = new Date();

  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const categoryForm = document.getElementById("category-form");
  const categoryList = document.getElementById("category-list");

  checkLocalStorage();

  let expenses = JSON.parse(localStorage.getItem("expenses"));
  let categories = JSON.parse(localStorage.getItem("categories"));

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

  expenseList.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    expenses = expenses.filter((expense) => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses(expenses);
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
      console.log(category);
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

  function checkLocalStorage() {
    if (!localStorage.getItem("expenses")) {
      console.log("Expenses does not exist");
      localStorage.setItem("expenses", JSON.stringify([]));
    } else {
      console.log("Expenses exists");
      displayExpenses(JSON.parse(localStorage.getItem("expenses")));
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
});
