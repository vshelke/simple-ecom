describe('add to cart', () => {
  it('visits for products', () => {
    cy.visit('http://localhost:3000')
    cy.contains('View Details').should('exist')
  })

  it('add to cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('button').contains('Add to Cart').click()
    cy.get(':nth-child(1) > .flex.gap-2 > .justify-between > .rounded-r-full').click()
    cy.get(':nth-child(1) > .flex.gap-2 > .justify-between > .rounded-r-full').click()
    cy.get(':nth-child(1) > .flex.gap-2 > .justify-between > .rounded-r-full').click()
    cy.get(':nth-child(1) > .flex.gap-2 > .justify-between > .rounded-l-full').click()
    cy.get(':nth-child(1) > .flex.gap-2 > .justify-between > .rounded-r-full').click()
    cy.get('[aria-haspopup="dialog"] > .justify-center').click()
    cy.contains('$439.80').should('exist')
  })

  it('clear the cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('button').contains('Add to Cart').click()
    cy.get(':nth-child(1) > .flex.gap-2 > .justify-between > .rounded-r-full').click()
    cy.get(':nth-child(1) > .flex.gap-2 > .justify-between > .rounded-r-full').click()
    cy.get(':nth-child(1) > .flex.gap-2 > .justify-between > .rounded-r-full').click()
    cy.get('[aria-haspopup="dialog"] > .justify-center').click()
    cy.contains('Clear Cart').click()
  })
})