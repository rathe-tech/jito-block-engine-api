import { JsonRpcRequest, JsonRpcResponse } from "./json-rpc";
import { SlotContext } from "./slot-context";

export interface GetBundleStatusesRequest extends JsonRpcRequest<"getBundleStatuses", string[][]> { }

export module GetBundleStatusesRequest {
  export function create(bundleIds: string[]): GetBundleStatusesRequest {
    return JsonRpcRequest.create("getBundleStatuses", [bundleIds]);
  }
}

export enum ConfirmationStatus {
  Processed = "processed",
  Confirmed = "confirmed",
  Finalized = "finalized",
}

export interface BundleInfo {
  bundle_id: string;
  transactions: string[];
  slot: number;
  confirmation_status: ConfirmationStatus;
  error?: any;
}

export interface GetBundleStatusesResponseResult {
  context: SlotContext;
  value: BundleInfo[];
}

export interface GetBundleStatusesResponse extends JsonRpcResponse<GetBundleStatusesResponseResult> { }