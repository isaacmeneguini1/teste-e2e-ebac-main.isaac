class navegarCarrinho {

    navegarCarrinho() {
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()
        cy.get('.checkout-button').click()
    }

}


export default new navegarCarrinho()