Cypress.Commands.add('preCadastro' , (email, password) => {
    cy.get('#reg_email').type(email)
    cy.get('#reg_password').type(password, { log: false })
    cy.get(':nth-child(4) > .button').click()
   })

Cypress.Commands.add('finalizarCompra' ,(nome, sobrenome, empresa, pais, endereco, numero, cidade, estado, cep, telefone, email,info)  => {
    cy.get('#billing_first_name').clear().type(nome)
    cy.get('#billing_last_name').clear().type(sobrenome)
    cy.get('#billing_company').clear().type(empresa)
    cy.get('#select2-billing_country-container').click().type(pais).get('[aria-selected="true"]').click()
    cy.get('#billing_address_1').clear().type(endereco)
    cy.get('#billing_address_2').clear().type(numero)
    cy.get('#billing_city').clear().type(cidade)
    cy.get('#select2-billing_state-container').click().type(estado + '{enter}')
    cy.get('#billing_postcode').clear().type(cep)
    cy.get('#billing_phone').clear().type(telefone)
    cy.get('#billing_email').clear().type(email)
    cy.get('#order_comments').clear().type(info)
    cy.get('#terms').click()
    cy.get('#place_order').click()
})