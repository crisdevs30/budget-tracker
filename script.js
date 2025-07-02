let total = 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const totalEl = document.getElementById("total");
const form = document.getElementById("entryForm");
const history = document.getElementById("history");

function updateTotal() {
  total = transactions.reduce((acc, item) => acc + item.amount, 0);
  totalEl.textContent = total.toFixed(2);
}

function renderHistory() {
  history.innerHTML = "";
  transactions.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = item.amount < 0 ? "expense" : "income";
    li.textContent = `${item.desc} - $${item.amount.toFixed(2)} [${item.category}]`;
    history.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!desc || isNaN(amount)) return;

  const transaction = { desc, amount, category };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  form.reset();
  updateTotal();
  renderHistory();
});

updateTotal();
renderHistory();
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((reg) => console.log('✅ Service Worker registered!', reg))
    .catch((err) => console.error('❌ Service Worker registration failed:', err));
}
