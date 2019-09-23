import yargs from 'yargs';

import { Config } from '../models/index';

export class ConfigService implements Config {
  public inputFilePath: string = '';
  public outputFilePath: string = '';
  public insertAAA: boolean = true;

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
        describe: 'Output file path',
        type: 'string',
      })
      .option('insert-aaa-comments', {
        alias: 'n',
        default: true,
        description: 'No insert Arrange-Act-Assert comments',
        demandOption: true,
        type: 'boolean',
      })
      .help()
      .argv;

    this.inputFilePath = res.in as string;
    this.outputFilePath = res.out as string;
    this.insertAAA = res.insertAaaComments as boolean;
  }

}
