import { JsonRpcRequest, JsonRpcResponse } from "./json-rpc";
import { SlotContext } from "./slot-context";

export interface GetInflightBundleStatusesRequest extends JsonRpcRequest<"getInflightBundleStatuses", string[][]> { }

export module GetInflightBundleStatusesRequest {
  export function create(bundleIds: string[]): GetInflightBundleStatusesRequest {
    return JsonRpcRequest.create("getInflightBundleStatuses", [bundleIds]);
  }
}

export enum InflightBundleStatus {
  Invalid = "Invalid",
  Pending = "Pending",
  Failed = "Failed",
  Landed = "Landed",
}

interface InflightBundleInfo {
  bundle_id: string;
  status: InflightBundleStatus;
  landed_slot: number | null;
}

export interface GetInflightBundleStatusesResponseResult {
  context: SlotContext;
  value: InflightBundleInfo[] | null;
}

export interface GetInflightBundleStatusesResponse extends JsonRpcResponse<GetInflightBundleStatusesResponseResult> { }