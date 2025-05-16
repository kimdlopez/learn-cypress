describe('Static Pages', () => {
  // test comment hey
  it('should visit the Welcome page at /', () => {
    cy.visit('https://learn-web-test.vercel.app')
  })

  it('should visit the About page at /about', () => {
    cy.visit('https://learn-web-test.vercel.app/about')
  })

  it('should visit the Contact page at /contact', () => {
    cy.visit('https://learn-web-test.vercel.app/contact')
  })

  it('should visit the Login page at /login', () => {
    cy.visit('https://learn-web-test.vercel.app/login')
  })
})