import { LoadingManager } from "@/shared/lib/context/loading-context";

describe("LoadingManager", () => {
  let manager: LoadingManager;

  beforeEach(() => {
    manager = new LoadingManager();
  });

  it("should initialize with no loading states", () => {
    expect(manager.getIsAnythingLoading()).toBe(false);
  });

  it("should set a loading state and reflect it", () => {
    manager.set("test", true);
    expect(manager.getIsAnythingLoading()).toBe(true);
  });

  it("should return false if all states are false", () => {
    manager.set("test1", true);
    manager.set("test2", true);
    manager.set("test1", false);
    manager.set("test2", false);
    expect(manager.getIsAnythingLoading()).toBe(false);
  });

  it("should return true if at least one state is true", () => {
    manager.set("test1", false);
    manager.set("test2", true);
    expect(manager.getIsAnythingLoading()).toBe(true);
  });

  it("should notify subscribers when state changes", () => {
    const subscriber = jest.fn();
    manager.subscribe(subscriber);

    manager.set("test", true);
    expect(subscriber).toHaveBeenCalledTimes(1);

    manager.set("test", false);
    expect(subscriber).toHaveBeenCalledTimes(2);
  });
});
