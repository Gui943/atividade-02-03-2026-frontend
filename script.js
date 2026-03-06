function calcularTotal(){
    const checkboxes = document.querySelectorAll('.item-produto input[type="checkbox"]');
    const qtds = document.querySelectorAll('.qtd-produto');

    let total = 0;

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const valor = parseFloat(checkbox.value);
            const qtd = parseInt(qtds[index].value);
            total += valor * qtd;
        }
    });

    document.getElementById('valor-total').innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const checkboxes = document.querySelectorAll('.item-produto input[type="checkbox"]');
const qtds = document.querySelectorAll('.qtd-produto');

checkboxes.forEach(cb => cb.addEventListener('change', calcularTotal));
qtds.forEach(qtd => qtd.addEventListener('change', calcularTotal));


calcularTotal();



let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarCarrinho(nome, preco) {

    const produto = {
        nome: nome,
        preco: preco
    };

    carrinho.push(produto);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarCarrinho();
}

function atualizarCarrinho() {

    let contador = document.getElementById("contador-carrinho");

    contador.innerText = carrinho.length;

}
