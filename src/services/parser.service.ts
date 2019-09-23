import { GRawCommand } from '../models/g-command';
import { Config } from '../models';

export class ParserService {

  public constructor(
    private $config: Config,
  ) {}

  public parse(commandAsStr: string | any): GRawCommand {
    const regExp = new RegExp(`^(?<indentation>(?:${this.$config.indentation})*)(?<keyName>[A-Z]*):\\s*(?<comment>.*?)$`);

    const res = commandAsStr.match(regExp);
    if (!res) return;
    const { indentation, keyName, comment } = res.groups;

    const indentationSize = (indentation.match(new RegExp(this.$config.indentation, 'g')) || []).length;
    const key = keyName.toLocaleLowerCase().trim();
    if (!key || !comment) return;

    return { indentationSize, key, comment };
  }

}
