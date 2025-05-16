describe("App Text", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have correct App Title", () => {
    cy.get('[data-testid="app-title"]').should(
      "have.text",
      "Learn Automated Testing"
    );
  });

  it("should have correct Hero Title", () => {
    cy.get('[data-testid="hero-title"]').should(
      "have.text",
      "Let us learn automated web testing!"
    );
  });

  it("should display the Login Button", () => {
    cy.get('[data-testid="login-link"]')
      .should("exist")
      .and("have.text", "Log In")
      .and("have.attr", "href", "/login");
  });
});
