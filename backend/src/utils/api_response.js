// this is the format which will help me to send the data in a structured manner

class ApiResponse {
  constructor(statusCode, data, massage = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.massage = massage;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
