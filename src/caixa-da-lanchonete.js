class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            cafe: 3.0,
            chantily: 1.5,
            suco: 6.2,
            sanduiche: 6.5,
            queijo: 2.0,
            salgado: 7.25,
            combo1: 9.5,
            combo2: 7.5,
        };
        this.metodosDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.metodosDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;
        let produtos = [];

        for (let item of itens) {
            let [produto, quantidade] = item.split(',');
            let preco = this.cardapio[produto];

            if (!(produto in this.cardapio)) {
                return "Item inválido!";
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            produtos.push([produto, quantidade]);
            total += preco * quantidade;
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95; // desconto de 5%
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03; // acrescimo de 3%
        }

        return this.formataValor(total);
    }

    ehItemExtra(item) {
        if (item === 'chantily')
            return 1;
        if (item === 'queijo')
            return 2;
        return 0;
    }

    ehItemCombo(item) {
        return item === 'combo1' || item === 'combo2';
    }

    formataValor(valor) {
        return "R$ " + valor.toFixed(2).replace('.', ',');
    }
}

export { CaixaDaLanchonete };