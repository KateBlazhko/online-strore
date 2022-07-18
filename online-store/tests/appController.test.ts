import AppController from "../src/components/controller/appController";
import AppModel from "../src/components/model/appModel";
import AppState from "../src/components/model/appState";
import Loader from "../src/components/controller/loader";
import {
  mockOptions,
  mockDataState,
  mockData,
  mockonChange,
  mockFilterData,
  mockLoad,
} from "./__mocks__/data";

jest.mock("../src/components/model/appState", () => {
  return {
    default: jest.fn().mockImplementationOnce(() => {
      return {
        dataState: mockDataState,
        onChange: mockonChange,
      };
    }),
  };
});

jest.mock("../src/components/model/appModel", () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        data: mockData,
        filterData: mockFilterData,
      };
    }),
  };
});

jest.mock("../src/components/controller/loader");

describe("AppController", () => {
  const mockState = new AppState();
  const mockModel = new AppModel();
  const controller = new AppController(mockState, mockModel);

  beforeEach(() => {
    (AppModel as unknown as jest.Mock).mockClear();
    (AppState as unknown as jest.Mock).mockClear();
  });

  afterEach(() => {
    mockState.dataState = mockDataState;
  });

  describe("getData", () => {
    it("should call Loader.load in AppController.getData", () => {
      Loader.load = mockLoad;

      AppController.getData("mockLink", () => {});
      expect(mockLoad).toHaveBeenCalled();
    });

    it("should call AppController.getData with given args", () => {
      const mockGetData = jest.spyOn(AppController, "getData");

      const callback = jest.fn();
      AppController.getData("link", callback);

      expect(mockGetData).toHaveBeenCalledWith("link", callback);
    });
  });

  describe("addInCart", () => {
    it("should add item to cart in controller.addInCart", () => {
      const mockCountInCart = 10;
      const mockCart = {
        id: 1,
      };
      controller["countInCart"] = mockCountInCart;
      controller["cart"] = mockCart;
      const result = controller.addInCart("id", 2);
      expect(controller["cart"]).toEqual({
        id: 2,
      });
      expect(result).toBeTruthy();
    });

    it('should return  "The cart is full" in controller.addInCart', () => {
      const mockCountInCart = 20;
      const mockCart = {
        id: 1,
      };
      controller["countInCart"] = mockCountInCart;
      controller["cart"] = mockCart;
      const result = controller.addInCart("id", 2);
      expect(result).toBe("The cart is full");
    });

    it('should return  "Unavailable count" in controller.addInCart', () => {
      const mockCountInCart = 10;
      const mockCart = {
        id: 2,
      };
      controller["countInCart"] = mockCountInCart;
      controller["cart"] = mockCart;
      const result = controller.addInCart("id", 2);
      expect(result).toBe("Unavailable count");
    });
  });

  describe("removeFromCart", () => {
    it("should remove from cart in controller.removeFromCart", () => {
      const mockCountInCart = 10;
      const mockCart = {
        id: 2,
      };
      controller["countInCart"] = mockCountInCart;
      controller["cart"] = mockCart;
      const result = controller.removeFromCart("id");
      expect(result).toBe(8);
      expect(controller["cart"]).toEqual({});
      expect(mockState).toMatchSnapshot();
    });

    it("should not remove from cart in controller.removeFromCart", () => {
      const mockCountInCart = 10;
      const mockCart = {
        id: 2,
      };
      controller["countInCart"] = mockCountInCart;
      controller["cart"] = mockCart;
      const result = controller.removeFromCart("id1");
      expect(result).toBe(10);
      expect(controller["cart"]).toEqual(mockCart);
    });
  });

  describe("getParamCart", () => {
    it("should return parameters", () => {
      const result = controller.getParamCart();
      expect(result).toBeDefined();
    });
  });

  describe("onReset", () => {
    it("should delete filters from datastate.filter", () => {
      expect(mockState.dataState).toMatchSnapshot();
      controller.onReset();
      expect(mockState.dataState.filter).toEqual({});
    });
  });

  describe("onResetAll", () => {
    it("should delete filters, sorter, cart from datastate", () => {
      expect(mockState.dataState).toMatchSnapshot();
      controller.onResetAll();
      expect(mockState.dataState).toEqual({
        sorter: {},
        filter: {},
        cart: {},
        search: "",
      });
    });
  });

  describe("getParamSorter", () => {
    it("should return changed parameters for sorter", () => {
      controller["options"] = mockOptions;
      const result = controller.getParamSorter();
      expect(result).toEqual({ parameter: true });
    });

    it("should return unchanged parameters for sorter", () => {
      controller["sorter"] = {};
      controller["options"] = mockOptions;
      const result = controller.getParamSorter();
      expect(result).toEqual(mockOptions.paramSorter);
    });
  });

  describe("onSorterChange", () => {
    it("should change dataState.sorter", () => {
      controller.onSorterChange("newParameter");
      expect(mockState.dataState.sorter).toEqual({ newParameter: true });
    });
  });

  describe("getParamInputRange", () => {
    it("should change min, max in paramInputRange", () => {
      const newParameters = [
        {
          filter: "Price",
          id: "price",
          step: "1",
          min: "500",
          max: "1300",
          value: { left: "min", right: "max" },
        },
      ];
      const result = controller.getParamInputRange();
      expect(result).toEqual(newParameters);
    });

    it("should change value in paramInputRange when it has in dataState.filter", () => {
      controller["filter"] = { price: { left: "600", right: "1000" } };
      const newParameters = [
        {
          filter: "Price",
          id: "price",
          step: "1",
          min: "500",
          max: "1300",
          value: { left: "600", right: "1000" },
        },
      ];
      const result = controller.getParamInputRange();
      expect(result).toEqual(newParameters);
    });

    it("should return undefined when options === null", () => {
      controller["options"] = null;
      const result = controller.getParamInputRange();
      expect(result).toBeUndefined();
    });
  });

  describe("", () => {
    it("should ", () => {});
  });
});
