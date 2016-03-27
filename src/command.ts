export interface Command {
  commandText: string;

  onCommand(event: any, parameter: string, options: any) : void;
}