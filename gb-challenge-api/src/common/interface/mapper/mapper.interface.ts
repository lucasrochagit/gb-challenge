export interface IMapper<Source, Target> {
  serialize(target: Target): Source;
  deserialize(source: Source): Target;
}
