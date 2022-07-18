import Loader from "../src/components/controller/loader";

describe("Loader", () => {
  it("method load should be defined", () => {
    expect(typeof Loader.load).toBe("function");
  });

  it("method load should be defined", () => {
    expect(typeof Loader["errorHandler"]).toBe("function");
  });
});
