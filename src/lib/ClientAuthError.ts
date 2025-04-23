export default class ClientAuthError {
  #ip: IpAddress;
  #userAgent: string;
  #failedAuth = 0;
  #isSleeping = false;

  constructor(
    ip: IpAddress,
    userAgent: string
  ){
    this.#ip = ip;
    this.#userAgent = userAgent;
    this.#validator();
  }
  
  #validator(){
    if(!(this.#ip instanceof IpAddress))
      throw new TypeError("tipo invalido para o endereço de IP");
    if(typeof this.#userAgent !== typeof String())
      throw new TypeError("tipo invalido para o userAgent");
  }

  run(){
    if(this.#failedAuth >= 3){
      this.#sleep();
      throw new Error("tentativas excedida, tente mais tarde");
    }
    
  }

  #sleep(){
    if(!this.#isSleeping)
      setTimeout(()=>{
        this.#failedAuth = 0;
        this.#isSleeping = true;
      }, 1000*30);
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