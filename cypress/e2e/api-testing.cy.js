describe("GET Tasks", () => {
  it("should get the list of tasks", () => {
    // y = f(x)
    // f(response)

    // JS objects 101
    // const task = {
    //     id: 1,
    //     title: 'Test',
    //     completed: false,
    // }

    const tasks = [{ id: 1, title: "test" }];

    cy.request("/api/tasks").then((response) => {
      //validate the status code
      expect(response.status).to.eq(200);

      // validate request body
      expect(response.body).to.have.length.greaterThan(0);

      // validate if item has id, title and completed
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("title");
      expect(response.body[0]).to.have.property("completed");

      // validate if completed is boolean
      expect(response.body[0].completed).to.be.a("boolean");

      // validate if id is number
      expect(response.body[0].id).to.be.a("number");
    });
  });

  it("should get the task with the given id", () => {
    cy.request("/api/tasks/1").then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property("id", 1);

      expect(response.body).to.have.property("title");

      expect(response.body).to.have.property("completed");
    });
  });

  it("should return a 404 if the task is not found", () => {
    cy.request({
      method: "GET",
      url: "/api/tasks/100",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);

      expect(response.body).to.have.property("name", "NotFoundError");
      expect(response.body).to.have.property("message", "Task not found");
    });
  });
});
