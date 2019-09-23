import { App } from './app';

class AppDebug extends App {
}

describe(App.name, () => {
  let service: AppDebug;

  beforeEach(() => {
    service = new AppDebug();
  });

  it('Should', () => {
    expect(0).toBe(0);
  });
});
