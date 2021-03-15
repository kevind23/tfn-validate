import { ResultDTO, TfnValidationService } from './TfnValidationService';

test("fetches data", async () => {
  const service = new TfnValidationService("endpointUrl");
  const mockResponse = {
    json: () => Promise.resolve(mockSuccess),
  } as any;
  const mockSuccess: ResultDTO = {
    result: true,
    error: "",
  };
  jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(mockResponse));
  const result = await service.isTaxFileNumberValid(1234);
  expect(result).toBe(true);
  const expectedUrl = "endpointUrl/1234";
  expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });
});

test("handles errors", async () => {
  const service = new TfnValidationService("endpointUrl");
  jest.spyOn(global, "fetch").mockReturnValue(Promise.reject("some error"));
  expect.assertions(1);
  await expect(service.isTaxFileNumberValid(1234)).rejects.toBe(
    "Could not load results from the server."
  );
});

test("returns error from server", async () => {
  const service = new TfnValidationService("endpointUrl");
  const mockResponse = {
    json: () => Promise.resolve(mockFailure),
  } as any;
  const mockFailure: ResultDTO = {
    result: false,
    error: "some error",
  };
  jest.spyOn(global, "fetch").mockReturnValue(Promise.resolve(mockResponse));
  expect.assertions(1);
  await expect(service.isTaxFileNumberValid(1234)).rejects.toBe("some error");
});
