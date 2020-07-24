export default interface IJobProvider {
  execute(key: string, data: string): Promise<void>;
}
