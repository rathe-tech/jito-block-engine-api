import bs58 from "bs58";
import { VersionedTransaction } from "@solana/web3.js";
import { JsonRpcRequest, JsonRpcResponse } from "./json-rpc";

export interface SendBundleRequest extends JsonRpcRequest<"sendBundle", string[][]> { }

export module SendBundleRequest {
  export function fromVersionedTransactions(transactions: VersionedTransaction[]): SendBundleRequest {
    const bs58transactions = transactions.map(t => bs58.encode(t.serialize()));
    return fromTransactionHashes(bs58transactions);
  }

  export function fromTransactionHashes(hashes: string[]): SendBundleRequest {
    return JsonRpcRequest.create("sendBundle", [hashes]);
  }
}

export interface SendBundleResponse extends JsonRpcResponse<string> { }