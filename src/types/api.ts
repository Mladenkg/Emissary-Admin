export interface CommonErrorResponse {
  message: string;
  errors: CommonErrorObject;
}

export interface CommonErrorObject {
  [field: string]: string[];
}
