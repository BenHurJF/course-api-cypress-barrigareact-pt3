/// <reference types="Cypress" />

describe('Testes de API do Barriga Rect', () => {
    before(() => {
        // cy.login()
    })

    it('1- Criando uma conta', () => {
        cy.request({
            method: 'POST',
            url: 'signin',
            failOnStatusCode: true,
            body: {
                email: "beiujeffer@hotmail.com",
                redirecionar: false,
                senha: "91150510"
            }
        }).then(response => {
            expect(response.status).to.be.eq(200)
            cy.wrap(response).its('body.id').should('eq', 25541)
            cy.wrap(response).its('body.nome').should('eq', 'Ben-Hur Jeffer')
            cy.wrap(response).its('body.token').should('not.be.empty')
        }).then(response => {
             
        })
    })

    it('2- Alterando uma conta', () => {
        
    })

    it('3- Tentando criar conta com nome já cadastrado', () => {
        
    })

    it('4- criando transação', () => {
        
    })

    it('5- Validando saldo', () => {
        
    })
})