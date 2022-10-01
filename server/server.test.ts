const request = require("supertest");
import { Request, Response } from "express";
const app = require("./index");

interface IResponse extends Response {
  _body: {
    userId: string;
    name: string;
    rating: string;
    genre: string;
    image: string;
    likes: [];
    _id: string;
    __v: number;
  };
}

describe("Test the root path", () => {
  test("It should respond to the GET method and get user", (done) => {
    request(app)
      .get("/api/users/113821008080613850752")
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("It should respond to the POST method and post a post", (done) => {
    request(app)
      .delete("/api/posts/post/delete/6335cbffd99c56b6919657c6")
      .then((response: Response) => {
        expect(response.statusCode).toBe(204);
        done();
      });
  });
});

describe("Posts", () => {
  test("It should be able to create posts and get posts and delete posts", (done) => {
    request(app)
      .post("/api/posts/")
      .send({
        name: "austin",
        rating: "5/5",
        genre: "Thriller",
        userId: "113821008080613850752",
        image: { base64: "200302002020" },
      })
      .then((response: IResponse) => {
        expect(response.statusCode).toBe(201);
        request(app)
          .get(`/api/posts/${response._body._id}`)
          .then((response: IResponse) => {
            expect(response.statusCode).toBe(200);
            request(app)
              .delete("/api/posts/post/delete/6335cbffd99c56b6919657c6")
              .then((response: Response) => {
                expect(response.statusCode).toBe(204);
                done();
              });
          });

        done();
      });
  });
});
