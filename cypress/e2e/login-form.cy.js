describe("Login Form", () => {
  beforeEach(function () {
    cy.visit("/login");
  });

  it("the login form should exist", () => {
    cy.get('[data-testid="email-input"]')
      .should("exist")
      .and("have.attr", "type", "email");

    cy.get('[data-testid="password-input"]')
      .should("exist")
      .and("have.attr", "type", "password");

    cy.get("button[type=submit]").should("exist");
  });

  //   it("should have focus on the email field", () => {
  //     cy.get('[data-testid="email-input"]').should("have.focus");
  //   });

  it("it should display an alert if the email and/or password is empty", () => {
    //cy.get('[data-testid="email-input"]').type("");
    //cy.get('[data-testid="password-input"]').type("");

    cy.get("button[type=submit]").click();

    cy.get('[data-testid="login-error"]')
      .should("exist")
      .and("have.text", "Email and password are required.");

    cy.url().should("contain", "/login");
  });

  it("it should display an alert if the email and/or password is invalid", () => {
    cy.get('[data-testid="email-input"]').type("iamkimdlopez@gmail.com");
    cy.get('[data-testid="password-input"]').type("123456");

    cy.get("button[type=submit]").click();

    cy.get('[data-testid="login-error"]')
      .should("exist")
      .and("have.text", "Invalid credentials.");

    // cy.get('[data-testid="login-error"]')
    //   .should("be.visible")
    //   .and("include", /invalid credentials/i);

    cy.url().should("contain", "/login");
  });

  it("it should hide the alert of the form is being filled in", () => {
    cy.get('[data-testid="email-input"]').type("iamkimdlopez@gmail.com");
    cy.get('[data-testid="password-input"]').type("123456");

    cy.get("button[type=submit]").click();

    cy.get('[data-testid="email-input"]')
      .clear()
      .type("iamkimdlopez@gmail.com");

    cy.get('[data-testid="login-error"]').should("not.exist");

    cy.url().should("contain", "/login");
  });

  it("it should redirect to Tasks Page on successful login", () => {
    cy.get('[data-testid="email-input"]').type("jeffkim@test.com");
    cy.get('[data-testid="password-input"]').type("@kimjep");

    cy.get("button[type=submit]").click();

    cy.get("button[type=submit]").should("be.disabled");

    cy.url().should("contain", "/tasks");
  });
});
