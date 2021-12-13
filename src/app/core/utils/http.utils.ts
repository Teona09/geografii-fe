import { HttpParams } from "@angular/common/http";

export class HttpUtils {
  static setParams(parameters: any, defaultValue: any): HttpParams {
    let params = new HttpParams();

    Object.keys(parameters).forEach((key) => {
      params = params.set(
        key,

        (parameters[key] ?? defaultValue[key]).toString()
      );
    });

    return params;
  }
}
