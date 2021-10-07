export class ReadOnlySchema {
  id: string;
  created_at: Date;
  updated_at: Date;

  static toJSON() {
    return {
      transform: (_: any, ret: { id: any; _id: { toString: () => any; }; }) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    };
  }
}
