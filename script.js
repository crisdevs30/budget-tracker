let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const balanceDisplay = document.getElementById("balance");
const savingsDisplay = document.getElementById("savings");

function updateDisplay() {
  list.innerHTML = "";
  let balance = 0;

  transactions.forEach((tx, index) => {
    const item = document.createElement("li");
    item.textContent = `${tx.name}: $${tx.amount}`;
    list.appendChild(item);

    balance += parseFloat(tx.amount);
  });

  balanceDisplay.textContent = `$${balance.toFixed(2)}`;
  savingsDisplay.textContent = `$${balance.toFixed(2)}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (name === "" || isNaN(amount)) {
    alert("Please enter a valid name and amount.");
    return;
  }

  transactions.push({ name, amount });
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateDisplay();

  // Reset form
  nameInput.value = "";
  amountInput.value = "";
});

updateDisplay();
