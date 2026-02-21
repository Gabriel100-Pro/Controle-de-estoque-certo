// Distribuição
new Chart(document.getElementById("graficoDistribuicao"), {
    type: "doughnut",
    data: {
        labels: ["Caixa Papelão", "Acrilico", "Suporte", "Outros"],
        datasets: [{
            data: [40, 30, 20, 10],
            backgroundColor: [
                "#4e73df",
                "#1cc88a",
                "#f6c23e",
                "#e74a3b"
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        }
    }
});


// Valor por Categoria
new Chart(document.getElementById("graficoValorCategoria"), {
    type: "bar",
    data: {
        labels: ["Caixa Papelão", "Acrilico", "Suporte", "Outros"],
        datasets: [{
            label: "Valor em R$",
            data: [25000, 15000, 8000, 5000]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


// Histórico
new Chart(document.getElementById("graficoHistorico"), {
    type: "line",
    data: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [{
            label: "Movimentações",
            data: [12, 19, 8, 15, 22, 9, 14],
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
});