describe("Static Pages", () => {
  // test comment hey
  it("should visit the Welcome page at /", () => {
    cy.visit("/");
  });

  it("should visit the About page at /about", () => {
    cy.visit("/about");
  });

  it("should visit the Contact page at /contact", () => {
    cy.visit("/contact");
  });

  it("should visit the Login page at /login", () => {
    cy.visit("/login");
  });
});
