import { AppService } from './app.service';

class AppDebug extends AppService {
}

describe(AppService.name, () => {
  let service: AppDebug;

  beforeEach(() => {
    service = new AppDebug();
  });

  it('Should', () => {
    expect(0).toBe(0);
  });
});
