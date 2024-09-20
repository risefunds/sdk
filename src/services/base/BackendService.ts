import fetch from 'cross-fetch';
import { injectable } from 'inversify';
import urlcat from 'urlcat';
import { IFormBuilderInitialValueType } from '../../types';

@injectable()
export class BackendService {
  externalApi?: string;
  getAuthorization?: () => Promise<{ uid: string; jwt?: string } | undefined>;
  internalSecret?: string;
  noHooks = false;

  private async authorization(): Promise<{ uid: string; jwt?: string }> {
    if (!this.getAuthorization) throw new Error('Authorization not resolved');
    const authorized = await this.getAuthorization();
    if (!authorized) throw new Error('User is not authorized. Please login.');

    return authorized;
  }

  private async parseResponse<T>(response: Response) {
    if (response.ok) {
      const data: T = await response.json();

      return data;
    } else {
      const data: { message: string } = await response.json();
      throw new Error(data.message);
    }
  }

  async request<T>(
    path: string,
    data: IFormBuilderInitialValueType = {},
    authorized = true
  ): Promise<T> {
    let extraHeaders = {};
    if (authorized) {
      const { jwt, uid } = await this.authorization();
      extraHeaders = {
        ...extraHeaders,
        Authorization: `Bearer ${jwt}`,
      };

      if (this.internalSecret) {
        extraHeaders = {
          ...extraHeaders,
          'gd-secret': this.internalSecret,
          'gd-uid': uid,
        };
      } else {
        if (!jwt) throw new Error('Token Error');
      }
    }

    if (!this.externalApi) throw new Error('V2URL not resolved');
    console.log(this.externalApi);
    const response = await fetch(urlcat(this.externalApi, path), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...extraHeaders,
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    return this.parseResponse<T>(response);
  }
}
