import Loader from "../src/components/controller/loader";

describe("errorHandler", () => {
  it("should return error with statusText when ok === false", () => {
    const responsiveFalse = {
      ok: false,
      redirected: false,
      status: 404,
      statusText: "Not Found",
    };

    expect.assertions(1);
    try {
      Loader["errorHandler"](responsiveFalse as Response);
    } catch (e: unknown) {
      if (e instanceof Error)
        expect(e.message).toBe(responsiveFalse.statusText);
    }
  });

  it("should return responsive when ok === true", () => {
    const responsiveTrue = {
      ok: true,
      redirected: false,
      status: 200,
      statusText: "OK",
    };

    const result = Loader["errorHandler"](responsiveTrue as Response);
    expect(result).toEqual(responsiveTrue);
  });
});
