export default class ClientAuthError {
  #ip: IpAddress;
  #userAgent: string;
  #failedAuth = 0;
  constructor(
    ip: IpAddress,
    userAgent: string
  ){
    this.#ip = ip;
    this.#userAgent = userAgent;
  }
}

export class IpAddress {
  #ip: string;
  #regex = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  constructor(ip: string){
    this.#ip = ip;
    this.#validator();
  }

  #validator(){
    if(!this.#regex.test(this.#ip))
      throw new TypeError("Endereço IP inválido");
  }

  get ip (){
    return this.#ip;
  }
}