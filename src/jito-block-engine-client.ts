import { SendBundleRequest, SendBundleResponse } from "./send-bundle";
import { GetBundleStatusesRequest, GetBundleStatusesResponse } from "./get-bundle-statuses";
import { GetInflightBundleStatusesRequest, GetInflightBundleStatusesResponse } from "./get-inflight-bundle-statuses";
import { GetTipAccountsRequest, GetTipAccountsResponse } from "./get-tip-accounts";
import { TipFloorResponse } from "./tips";

export class JitBlockEngineClient {
  #baseUrl: string;

  // Without ending slash.
  public constructor(baseUrl: string = "https://mainnet.block-engine.jito.wtf") {
    this.#baseUrl = baseUrl;
  }

  public async sendBundle(request: SendBundleRequest, signal?: AbortSignal): Promise<SendBundleResponse> {
    return await this.#post("api/v1/bundles", request, signal);
  }

  public async getBundleStatuses(request: GetBundleStatusesRequest, signal?: AbortSignal): Promise<GetBundleStatusesResponse> {
    return await this.#post("api/v1/bundles", request, signal);
  }

  public async getInflightBundleStatuses(request: GetInflightBundleStatusesRequest, signal?: AbortSignal): Promise<GetInflightBundleStatusesResponse> {
    return await this.#post("api/v1/bundles", request, signal);
  }

  public async getTipAccounts(request: GetTipAccountsRequest, signal?: AbortSignal): Promise<GetTipAccountsResponse> {
    return await this.#post("api/v1/bundles", request, signal);
  }

  public async getTipFloor(signal?: AbortSignal): Promise<TipFloorResponse> {
    return await this.#get("api/v1/bundles/tip_floor", signal);
  }

  async #post<TRequest, TResponse>(methodEndpoint: string, request: TRequest, signal?: AbortSignal): Promise<TResponse> {
    const response = await fetch(`${this.#baseUrl}/${methodEndpoint}`, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (response.status !== 200) {
      throw new Error(`Failed with ${response.status} ${response.statusText}`);
    }
    const model = await response.json();
    return model;
  }

  async #get<TResponse>(methodEndpoint: string, signal?: AbortSignal): Promise<TResponse> {
    const response = await fetch(`${this.#baseUrl}/${methodEndpoint}`, { signal });
    if (response.status !== 200) {
      throw new Error(`Failed with ${response.status} ${response.statusText}`);
    }
    return await response.json();
  }
}