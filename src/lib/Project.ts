
interface ProjectIF {
  title: string;
  summary: string;
  tasks: unknown[];
  allowed_users: unknown[];
};

interface TaskIF {
  title: string;
  summary: string; 
  checkPoints: InstanceType<typeof CheckPoint>[];
  userPermissions: UserPermissionIF[];
};

interface UserPermissionIF {
  userId: string;
  grantedPermission: string;
};

interface CheckPointIF {
  description: string;
  isDone: boolean;
  times: {
    createAt: Date;
    updateAt: Date;
  };
  creator: string;
  responsible: string;
}

class UserPermission {}

class CheckPoint implements CheckPointIF {
  #description: string;
  #isDone: boolean;
  #times: { createAt: Date;  updateAt: Date };
  #creator: string;
  #responsible: string;

  constructor({
    description,
    isDone,
    creator,
    responsible,
    times
  }: CheckPointIF){
    this.#description = description;
    this.#isDone = isDone;
    this.#creator = creator;
    this.#times = times;
    this.#responsible = responsible;

    this.#validator();
  }

  #validator(){
    // validação de tipos em runtime ...
  }

  get description (){
    return this.#description;
  }

  get isDone (){
    return this.#isDone;
  }

  get creator (){
    return this.#creator;
  }

  get times (){
    return this.#times;
  }

  get responsible (){
    return this.#responsible;
  }
}

export class Task {
  #title: string;
  #summary: string;
  #checkPoints: InstanceType<typeof CheckPoint>[];
  
  constructor({
    title,
    summary,
    checkPoints
  }: TaskIF){
    this.#title = title;
    this.#summary = summary;
    this.#checkPoints = checkPoints;
  }

  get title (){
    return this.#title;
  }

  get summary (){
    return this.#summary;
  }

  get checkPoints (){
    return this.#checkPoints;
  }

  get progress (){
    const completedTasks = this.#checkPoints.map(props => props.isDone === true);
    
    return {
      procent: (completedTasks.length/this.#checkPoints.length)*100,
      completed: completedTasks.length,
      pending: this.#checkPoints.length - completedTasks.length
    }
  }
}

export default class Project {
  #title: string;
  #summary: string;
  #tasks: InstanceType<typeof Task>[];
  #allowedUsers!: unknown[];

  constructor(
    title: string,
    summary: string,
    tasks: InstanceType<typeof Task>[]
  ){
    this.#title = title;
    this.#summary = summary;
    this.#tasks = tasks;
  }

  get title (){
    return this.#title;
  }

  get summary (){
    return this.#summary;
  }

  get tasks (){
    return this.#tasks;
  } 

  get totalTasks (){
    return this.#tasks.length;
  }
}