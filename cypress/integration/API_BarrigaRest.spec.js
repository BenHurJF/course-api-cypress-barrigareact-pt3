/// <reference types="Cypress" />

describe('Testes de API do Barriga Rect', () => {
    let TOKEN;

    before(() => {
        cy.getToken('beiujeffer@hotmail.com', '91150510')
        .then(token => {
            TOKEN = token
        })
        cy.resetarContas()
    })

    beforeEach(() => {
        
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
            expect(res.status).to.be.equal(201) //Created
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta para Teste API')
        })
    })

    it('2- Alterando uma conta', () => {
         cy.request({
             method: 'GET',
             url: 'contas',
             headers: { Authorization: `JWT ${TOKEN}` },
             qs: {
                 nome: 'Conta para Teste API'
             }
         }).then(res => {
            cy.request({
            method: 'PUT',
            url: `contas/${res.body[0].id}`,
            failOnStatusCode: false,
            headers: { Authorization: `JWT ${TOKEN}` },
            body: {
                nome: 'EDITANDO CONTA PELO API'
            }
        }).as('response')
         })
        cy.get('@response').its('status').should('be.eq', 200) // OK
        
    })

    it('3- Tentando criar conta com nome já cadastrado', () => {
        cy.request({
            url: 'contas',
            method: 'POST',
            failOnStatusCode: false,
            headers: { Authorization: `JWT ${TOKEN}`},
            body: {
               nome: "Conta mesmo nome"
            }
        }).as('responseCriarConta')

        cy.get('@responseCriarConta').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it.only('4- criando transação', () => {
        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {
           cy.request({
            method: 'POST',
            url: 'transacoes',
            // failOnStatusCode: false,
            headers: { Authorization: `JWT ${TOKEN}` },
            body: {
                conta_id: contaId,
                data_pagamento: '30/10/2021',
                data_transacao: '25/10/2021',
                descricao: "TESTE",
                envolvido: "EU",
                status: true,
                tipo: "REC",
                valor: "30022"
            }
        }).as('resTransacao')
    })
    cy.get('@resTransacao').its('status').should('be.equal', 201)
    cy.get('@resTransacao').its('body.valor').should('exist')

    })

    it('5- Validando saldo', () => {
        
    })
})