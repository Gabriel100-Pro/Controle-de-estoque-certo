const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const input = document.getElementById("quantidadeInput");
const totalProducts = document.querySelector(".total-products");
const btnAtualizar = document.getElementById("btnAtualizar");



menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
});


function loadPage(page, element) {

    // ✅ remove classes antigas sempre que trocar página
    content.classList.remove("dashboard-page", "cadastro-page");

    if (page === "dashboard") {

        content.classList.add("dashboard-page");

        content.innerHTML = `
            <div class="header">
                <h2>Dashboard</h2>

                <div class="header-cards">
                    <div class="cards">
                        <p>TOTAL DE PRODUTOS</p>
                        <span class="total-products">120</span>
                    </div>

                    <div class="cards">
                        <p>VALOR TOTAL EM ESTOQUE</p>
                        <span id="valorTotalEstoque">R$ 53.000</span>
                    </div>

                    <div class="cards">
                        <p>PRODUTOS EM ALERTA</p>
                        <span class="danger">5</span>
                    </div>

                    <div class="cards">
                        <p>MOVIMENTAÇÃO HOJE</p>
                        <span>12</span>
                    </div>
                </div>
            </div>

            <section class="section-grafic">
                <div class="main-grafic">
                    <div class="card grafico-card">
                        <p class="text-container">Distribuição de Estoque</p>
                        <div class="grafico">
                            <canvas id="graficoDistribuicao"></canvas>
                        </div>
                    </div>

                    <div class="card grafico-card">
                        <p class="text-container">Valor por Categoria</p>
                        <canvas id="graficoValorCategoria"></canvas>
                    </div>
                </div>

                <div class="card historico">
                    <p class="text-container">Histórico de Movimentação (Últimos 7 dias)</p>
                    <canvas id="graficoHistorico"></canvas>
                </div>
            </section>
        `;
        const valorTotalEstoque = document.getElementById("valorTotalEstoque");

        let valorSalvo = localStorage.getItem("valorTotalEstoque");

        if (valorSalvo) {
            valorTotalEstoque.textContent = `R$ ${parseFloat(valorSalvo).toFixed(2)}`;
        }

        const totalSpan = document.querySelector(".total-products");

        let totalSalvo = localStorage.getItem("totalProdutos");

        if (totalSalvo) {
            totalSpan.textContent = totalSalvo;
        }

        requestAnimationFrame(initCharts);
    }

    if (page === "cadastro") {

        content.classList.add("cadastro-page");

        content.innerHTML = `
            <div class="header">
                <h2>Cadastrar Produto</h2>
                <p>Preencha as informações abaixo para adicionar um novo item ao estoque.</p>
            </div>

            <div class="card cadastro-card">
                <h3>Informações Básicas</h3>
                <p class="text-card">Nome do Produto</p>
                <input type="text" placeholder="Ex: Caixa de Papelão" />
                <p class="text-card">Categoria</p>
                <select>
                    <option value="">Selecione</option>
                    <option value="caixa">Caixa</option>
                    <option value="acrilico">Acrílico</option>
                    <option value="suporte">Suporte</option>
                </select>
                    <div class="Information">
                        <h3>Informações de Estoque</h3>
                        <div class="Information-container">
                            <div class="Information-sons">

                                    <div class="Information-sons-one">
                                        <p class="text-card">Quantidade</p>
                                        <input type="number" placeholder="Ex: 100" id="quantidadeInput" />
                                        <button class="btn btn-primary" id="btnAtualizar">Atualizar</button>
                                    </div><!-- Information-sons-one -->


                                    <div class="Information-sons-two">
                                        <p class="text-card">Alerta</p>
                                        <input type="number" placeholder="Ex: 20" />
                                    </div><!-- Information-sons-two -->

                            </div><!-- Information-sons -->

                            <div class="Information-financial">
                                
                                    <div class="Information-sons">
                                    <div class="Information-sons-one">
                                        <p class="text-card">Preço de Custo</p>
                                        <input type="number" placeholder="Ex: 15.00" id="precoCustoInput"/>
                                        <button class="btn btn-primary" id="btnPrecoCusto">Atualizar</button>
                                    </div><!-- Information-sons-one -->

                                    <div class="Information-sons-two">
                                        <p class="text-card">Preço Venda</p>
                                        <input type="number"  placeholder="Ex: 25.00" />
                                    </div><!-- Information-sons-two -->

                                </div><!-- Information-sons -->
                            </div><!-- Information-financial -->
                        </div><!-- Information-container -->
                    </div><!-- Information -->
            </div><!-- cadastro-card -->
        `;
        const btnPrecoCusto = document.getElementById("btnPrecoCusto");

btnPrecoCusto.addEventListener("click", () => { 

    const precoCustoInput = document.getElementById("precoCustoInput");
    let valorPrecoCusto = parseFloat(precoCustoInput.value);

    if (isNaN(valorPrecoCusto)) {
        alert("Digite um preço válido");
        return;
    }

    // 🔥 pega total de produtos salvo
    let totalProdutos = parseInt(localStorage.getItem("totalProdutos")) || 120;

    // 🔥 multiplica
    let novoValorTotal = totalProdutos * valorPrecoCusto;

    // 🔥 salva
    localStorage.setItem("valorTotalEstoque", novoValorTotal);

    alert("Valor total do estoque atualizado!");

    precoCustoInput.value = "";
});



        

        const btnAtualizar = document.getElementById("btnAtualizar");

        btnAtualizar.addEventListener("click", () => {

            const input = document.getElementById("quantidadeInput");
            let valorDigitado = parseInt(input.value);

            if (isNaN(valorDigitado)) {
                alert("Digite um número válido");
                return;
            }

            // 🔥 Pega valor atual salvo
            let totalAtual = parseInt(localStorage.getItem("totalProdutos")) || 120;

            // 🔥 Soma
            let novoTotal = totalAtual + valorDigitado;

            // 🔥 Salva novamente
            localStorage.setItem("totalProdutos", novoTotal);

            alert("Quantidade atualizada!");

            input.value = "";
        });


    }






    // Remove active de todos


    function initCharts() {

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

        new Chart(document.getElementById("graficoHistorico"), {
            type: "line",
            data: {
                labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
                datasets: [{
                    label: "Movimentações",
                    data: [12, 19, 8, 15, 22, 9, 14],
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }

        });

    }

}

loadPage("dashboard");

