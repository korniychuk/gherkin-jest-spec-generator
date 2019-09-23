import yargs from 'yargs';

export class App {
  protected inputFilePath?: string;
  protected outputFilePath?: string;

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

    this.inputFilePath = res.i as string;
    this.outputFilePath = res.out as string;

  }

}
