import App from '../src/components/app/app'
import AppController from "../src/components/controller/appController";
import AppState from "../src/components/model/appState";
import AppModel from "../src/components/model/appModel";
import {  mockDataState,  mockonChange } from "./__mocks__/data";

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

jest.mock('../src/components/controller/appController')
jest.mock('../src/components/model/appModel')

const mockGetData = jest
  .spyOn(AppController, 'getData')
  .mockImplementation(() => 'some-get-data');

const app = new App(new AppState)

describe('constructor', () => {

  it('should call new AppController', () => {
    expect((AppController as unknown  as jest.Mock).mock.calls.length).toEqual(1)
  })

  it('should call new AppModel', () => {
    expect((AppModel as unknown  as jest.Mock).mock.calls.length).toEqual(1)
  })
})

describe('start', () => {
  it('should call static method AppController', () => {
    app.start()
  
    expect(mockGetData).toHaveBeenCalledTimes(2)

  })
})