import { JsonRpcRequest, JsonRpcResponse } from "./json-rpc";

export interface GetTipAccountsRequest extends JsonRpcRequest<"getTipAccounts", void> { }

export interface GetTipAccountsResponse extends JsonRpcResponse<string[]> { }