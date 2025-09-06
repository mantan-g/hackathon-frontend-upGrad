export interface Module {
  title: string;
  description: string;
  asset: any; // Mixed type from mongoose
}

export interface Course {
  title: string;
  description: string;
  module: Module[];
  overView: any; // Mixed type from mongoose
}

export interface Program {
  _id?: string;
  name: string;
  description: string;
  imgUrl: string; // base64 string
  courses: Course[];
  createdAt?: Date;
  updatedAt?: Date;
}
