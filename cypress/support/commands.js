// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getToken', (user, pass) => {

    cy.request({
        url: 'signin',
        method: 'POST',
        failOnStatusCode: true,
        body: {
            email: user,
            redirecionar: false,
            senha: pass
        }
    }).then(response => {
        expect(response.status).to.be.eq(200)
        // cy.wrap(response).its('body.id').should('eq', 25541)
        // cy.wrap(response).its('body.nome').should('eq', 'Ben-Hur Jeffer')
        cy.wrap(response).its('body.token').should('not.be.empty')
})
.then(token => {
    return token
})
})

Cypress.Commands.add('resetarContas', () => {
    cy.getToken('beiujeffer@hotmail.com', '91150510').then(TOKEN => {
    cy.request({
        method: 'GET',
        url: 'reset',
        headers: { Authorization: `JWT ${TOKEN}`}
    })
})
})

Cypress.Commands.add('getContaByName', name => {
    cy.getToken('beiujeffer@hotmail.com', '91150510').then(TOKEN => {
    cy.request({
        method: 'GET',
        url: 'contas',
        headers: { Authorization: `JWT ${TOKEN}` },
        qs: {
            nome: name
        }
    }).then(res => {
        return res.body[0].id
    })
    })
})