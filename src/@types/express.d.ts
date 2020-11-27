declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    office: {
      id: string;
    };
  }
}
