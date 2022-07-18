import Loader from "../src/components/controller/loader"

describe("Loader", () => {
  it("method load should be defined", () => {
    expect(typeof Loader.load).toBe("function");
  });

  it("method load should be defined", () => {
    const loader = new Loader
    const loaderProto = Object.getPrototypeOf(loader);
    expect(typeof loaderProto.constructor.errorHandler).toBe("function");
  });
});