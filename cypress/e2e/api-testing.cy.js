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

// () => {} // -> f(x), x is nothing

// (response) => { } // f(x) , x = response

describe("POST Tasks API", () => {
  it("should create a new task", () => {
    cy.request("POST", "/api/tasks", { title: "New Task po" }).then(
      (response) => {
        expect(response.status).to.eq(201);
        expect(response.body.title).to.eq("New Task po");
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("completed", false);
      }
    );
  });

  it("should return 400 if title is missing", () => {
    cy.request({
      method: "POST",
      url: "/api/tasks",
      body: { title: "" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.eq("BadRequestError");
      expect(response.body.message).to.eq("Task title is required.");
    });
  });
});

describe("PATCH Tasks API", () => {
  it("should update the task with the given id", () => {
    cy.request("PATCH", "/api/tasks/2", { title: "Learn API Testing" }).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("Learn API Testing");
      }
    );
  });

  it("should return 400 if title is missing", () => {
    cy.request({
      method: "PATCH",
      url: "/api/tasks/2",
      body: { title: "" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.eq("BadRequestError");
      expect(response.body.message).to.eq("Task title is required.");
    });
  });

  it("should return 400 if completed has invalid value", () => {
    cy.request({
      method: "PATCH",
      url: "/api/tasks/2",
      body: { completed: "maybe" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.eq("BadRequestError");
      expect(response.body.message).to.eq("Invalid value for completed.");
    });
  });

  it("should return a 404 if the task is not found", () => {
    cy.request({
      method: "PATCH",
      url: "/api/tasks/100",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);

      expect(response.body).to.have.property("name", "NotFoundError");
      expect(response.body).to.have.property("message", "Task not found");
    });
  });
});
