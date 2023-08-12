class CaixaDaLanchonete {
    constructor() { // define os produtos e as formas de pagamento
        this.metodosDePagamento = ['dinheiro', 'credito', 'debito'];
        this.cardapio = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.metodosDePagamento.includes(metodoDePagamento)) { // forma de pagamento não listada
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) { // sem itens no pedido
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;
        let produtos = [];

        for (let item of itens) {
            let [produto, quantidade] = item.split(',');
            let preco = this.cardapio[produto];

            if (!(produto in this.cardapio)) { // item não listado
                return "Item inválido!";
            }

            if (quantidade <= 0) { // item sem quantidade
                return "Quantidade inválida!";
            }

            produtos.push({ produto, quantidade });
            total += preco * quantidade;
        }

        // verificação de principal + extra
        if (!this.verificaPedido(produtos))
            return "Item extra não pode ser pedido sem o principal";

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95; // desconto de 5%
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03; // acrescimo de 3%
        }

        return this.formataValor(total);
    }

    formataValor(valor) {
        return "R$ " + valor.toFixed(2).replace('.', ',');
    }

    possuiExtra(itens) {
        for (let i = 0; i < itens.length; i++) {
            let produto = itens[i].produto;
            if (this.ehItemExtra(produto) === 1 || this.ehItemExtra(produto) === 2)
                return true;
        }
        return false;
    }
    // se um item é um extra
    ehItemExtra(item) {
        if (item === 'chantily')
            return 1;
        if (item === 'queijo')
            return 2;
        return 0;
    }
    // verifica se o extra está acompanhado de seu principal
    verificaPedido(itens) {
        let possui_cafe = false;
        let possui_sanduiche = false;

        if (!this.possuiExtra(itens)) // verifica se existe algum item extra no pedido
            return true;

        for (let i = 0; i < itens.length; i++) { // verifica se o principal está incluso no pedido
            let produto = itens[i].produto;
            if (this.ehItemExtra(produto) === 1) {
                for (let j = 0; j < itens.length; j++) {
                    if (itens[j].produto === 'cafe')
                        possui_cafe = true;
                }
                if (!possui_cafe)
                    return false;
            }
            if (this.ehItemExtra(produto) === 2) {
                for (let j = 0; j < itens.length; j++) {
                    if (itens[j].produto === 'sanduiche')
                        possui_sanduiche = true;
                }
                if (!possui_sanduiche)
                    return false;
            }
        }
        return true;
    }
}

export { CaixaDaLanchonete };