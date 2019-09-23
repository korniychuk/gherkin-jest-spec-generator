import { EGKey } from './g-key.enum';

/**
 * Gherkin command
 */
export interface GCommonCommand {
  comment: string;
  indentationSize: number;
  key: EGKey;
}

export interface GRawCommand {
  comment: string;
  indentationSize: number;
  key: string;
}

export interface GDescribeCommand extends GCommonCommand {
  children: GDescribeCommand;
}


