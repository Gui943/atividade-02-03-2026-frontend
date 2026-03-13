const produtos = [
    {
    id: 1,
    nome: "Camiseta",
    preco: 49.90,
    descricao: "Descricao do item",
    imagem: "https://img.freepik.com/fotos-gratis/vista-da-geleira-a-noite_23-2151795222.jpg"
},
{
    id: 2,
    nome: "Tenis",
    preco: 100.00,
    descricao: "Descricao do item",
    imagem: "https://img.freepik.com/fotos-gratis/vista-da-geleira-a-noite_23-2151795222.jpg"
},
{
    id: 2,
    nome: "Calça",
    preco: 69.90,
    descricao: "Descricao do item",
    imagem: "https://img.freepik.com/fotos-gratis/vista-da-geleira-a-noite_23-2151795222.jpg"
},
];

function carregarProdutos(){
    const container = document.getElementById("lista-produtos");

    produtos.forEach(produto =>{

        const card =`
        <div class="col-md-4">
            <div class="card" style="width: 20rem;">
                <img src="${produto.imagem}" class="card-img-top">
                
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    
                    <p class="card-text">${produto.descricao}</p>
                    
                    <p class="card-text">R$ ${produto.preco}</p>

                    <input class="qtd-produto" type="number" value="1" min="1">

                    <div style="margin-top: 10px;">
                        <button class="btn btn-primary"
                        onclick="adicionarCarrinho('${produto.nome}', ${produto.preco})">
                        Add carrinho
                        </button>
                    </div>

                </div>
            </div>
        </div>`;

        container.innerHTML += card;
    });
}

carregarProdutos();