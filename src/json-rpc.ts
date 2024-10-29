export interface JsonRpcEntity {
  jsonrpc: "2.0";
  id: number;
}

export interface JsonRpcRequest<TMethod, TParams> extends JsonRpcEntity {
  method: TMethod;
  params: TParams;
}

export module JsonRpcRequest {
  function randomId() {
    return Math.floor((Math.floor(Math.random() * 1_000_000)));
  }

  export function create<TMethod extends string, TParams>(
    method: TMethod,
    params: TParams,
    id?: number,
  ): JsonRpcRequest<TMethod, TParams> {
    return {
      jsonrpc: "2.0",
      id: id ?? randomId(),
      method,
      params,
    };
  }
}

export interface JsonRpcError {
  code: number;
  message: string;
}

export interface JsonRpcResponse<TResult> extends JsonRpcEntity {
  result?: TResult;
  error?: JsonRpcError;
}

export module JsonRpcResponse {
  export function tryGetResult<TResult>(response: JsonRpcResponse<TResult>): TResult {
    const { result, error } = response;
    if (error) { throw error; }
    return result!;
  }
}