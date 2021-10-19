/// <reference types="Cypress" />

describe('Testes de API do Barriga Rect', () => {
    let TOKEN;

    before(() => {
        cy.getToken('beiujeffer@hotmail.com', '91150510')
        .then(token => {
            TOKEN = token
        })
    })

    it('1- Criando uma conta', () => {
            cy.request({
            url: 'contas',
            method: 'POST',
            failOnStatusCode: true,
            headers: { Authorization: `JWT ${TOKEN}`},
            body: {
               nome: "Conta para Teste API"
            }
        }).as('responseCriarConta')

        cy.get('@responseCriarConta').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta para Teste API')
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