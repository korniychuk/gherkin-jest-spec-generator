import { Config } from './models';

export class ConfigService implements Config {
  public inputFilePath: string = '';
  public outputFilePath: string = '';
  public insertAAA: boolean = false;
}
