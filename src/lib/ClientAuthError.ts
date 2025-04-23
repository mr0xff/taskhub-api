export default class ClientAuthError {
  #clients:HTTPClient[] = [];

  add(client: HTTPClient){
    if(!this.#find(client))
      this.#clients.push(client);
  }

  #find(client: HTTPClient){
    const foundedClient = this.#clients.find(props => props.ip === client.ip);
    if(!!foundedClient)
      foundedClient.run();
    return !!foundedClient;
  }
}

export class HTTPClient {
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
    if(typeof this.#userAgent !== typeof "string")
      throw new TypeError("tipo invalido para o userAgent");
  }

  run(){
    if(this.#failedAuth >= 3){
      this.#sleep();
      throw new Error("tentativas excedida, tente mais tarde");
    }
    
    this.#failedAuth++;

    console.log(this.#failedAuth);
  }

  #sleep(){
    if(!this.#isSleeping)
      this.#isSleeping = true;
      setTimeout(()=>{
        this.#failedAuth = 0;
        this.#isSleeping = false;
      }, 1000*30);
  }

  get ip(){
    return this.#ip.ip;
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