import yargs from 'yargs';

import { Config } from './models';

export class ConfigService implements Config {
  public inputFilePath: string = '';
  public outputFilePath: string = '';
  public insertAAA: boolean = false;

  public init(): void {
    const res = yargs(process.argv)
      .option('in', {
        alias: 'i',
        demandOption: true,
        describe: 'Input file path',
        type: 'string',
      })
      .option('out', {
        alias: 'o',
        demandOption: true,
        describe: 'Input file path',
        type: 'string',
      })
      .help()
      .argv;

    this.inputFilePath = res.in as string;
    this.outputFilePath = res.out as string;
  }

}
