import { readFileSync } from 'node:fs';

export class Email{
  #email: string;
  #regexp = /^\S+@\S+\.\S+$/;

  constructor(email: string){
    this.#email = email;
    this.#validator();
  }
  
  #validator(){
    if (typeof this.#email !== typeof String())
      throw new TypeError("apenas string");

    if (!this.#regexp.test(this.#email))
      throw new Error("email inválido");
  }

  get email (){
    return this.#email;
  }
}

export class Password {
  #password:string;
  #policy = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  constructor(pass: string){
    this.#password = pass;
    this.#validator();
  }

  #validator(){
    if (typeof this.#password !== typeof String())
      throw new TypeError("apenas string");

    if (!this.#policy.test(this.#password))
      throw new Error("senha fraca");

    this.#ckeckWeak();
  }

  #ckeckWeak(){
    //banco de dados local ou serviço para checagem de senhas vazadas!

    const passList = (readFileSync('weaklist.txt')).toString().split('\n');
    
    if (passList.includes(this.#password))
      throw new Error("esta senha já foi vazada!");
  }

  get password (){
    return this.#password;
  }
}

export class Username {}

export class User {
  #email: Email;
  #secret: Password;

  constructor({ email, secret }: { email: Email; secret: Password }){
    this.#email = email;
    this.#secret = secret;
    this.#validator();
  }

  #validator(){
    if(!(this.#email instanceof Email))
      throw new TypeError("apenas email");
    
    if(!(this.#secret instanceof Password))
      throw new TypeError("apenas senhas validas e forte");
  }

  get email (){
    return this.#email.email;
  }

  get secret (){
    return this.#secret.password;
  }

  toJSON(){
    return {
      email: this.email,
      secret: this.secret
    }
  }
}

export type UserType = InstanceType<typeof User>;

export interface SignupUser extends  UserType {
  username: string;
  password: string; 
  confirmPassword: string;
} 