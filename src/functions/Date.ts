export function setDate(): void {
  const expenseDateElement = document.getElementById("expense-date");
  const incomeDateElement = document.getElementById("income-date");

  if (incomeDateElement instanceof HTMLInputElement) {
    incomeDateElement.valueAsDate = new Date();
  }
  if (expenseDateElement instanceof HTMLInputElement) {
    expenseDateElement.valueAsDate = new Date();
  }
}