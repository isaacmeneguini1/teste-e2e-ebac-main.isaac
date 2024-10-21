/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
let fakeEmail;
let fakePassword;
import contaPage from '../support/page_objects/contaPage';
import produtosPage from '../support/page_objects/produtosPage';
import carrinhoPage from '../support/page_objects/carrinhoPage';
const dadosProdutos = require("../fixtures/produtos.json")
const dadosEndereco = require("../fixtures/endereco.json")

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Cadastro no site', () => {
        fakeEmail = faker.internet.email();
        fakePassword = faker.internet.password();
        cy.preCadastro(fakeEmail, fakePassword);
        cy.get('.woocommerce-MyAccount-content > :nth-child(3)').should('contain', 'A partir do painel de controle de sua conta');
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.get('#username').type(fakeEmail);
        cy.get('#password').type(fakePassword, { log: false });
        cy.get('.woocommerce-form > .button').click();
        cy.get('.woocommerce-MyAccount-content > :nth-child(3)').should('contain', 'A partir do painel de controle de sua conta');
        for (const produto of dadosProdutos) {
            contaPage.acessarProdutos()
            produtosPage.inserirProduto(produto.produto, produto.tamanho, produto.cor, produto.quantidade)
        }

        carrinhoPage.navegarCarrinho()
        cy.finalizarCompra(

            dadosEndereco[0].nome,
            dadosEndereco[0].sobrenome,
            dadosEndereco[0].empresa,
            dadosEndereco[0].pais,
            dadosEndereco[0].endereco,
            dadosEndereco[0].numero,
            dadosEndereco[0].cidade,
            dadosEndereco[0].estado,
            dadosEndereco[0].cep,
            dadosEndereco[0].telefone,
            dadosEndereco[0].email,
            dadosEndereco[0].info
        )
        cy.get(".woocommerce-notice").should(
            "contain","Obrigado. Seu pedido foi recebido.")
    });


})