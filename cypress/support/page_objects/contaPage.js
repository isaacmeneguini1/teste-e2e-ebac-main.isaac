class ContaPage {

    acessarProdutos() {
        cy.get('#primary-menu > .menu-item-629 > a').click()       

    }

}

export default new ContaPage()