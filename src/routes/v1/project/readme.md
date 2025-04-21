Projecto - conjunto de actividades a realiazar, que está associado a um ou mais usuários

project = {
  title: string,
  summary: string,
  tasks: unknown[],
  ...
  users: id[]
}

task = {
  title: string,
  summary: string,
  progress: number,
  number poins: number,
  points: {
    description: string,
    isDone: bool,
    times: ...,
    createtor: id,
    lastModifier: id,
    responsible: id  -> o responsavel por comprir a tarefa (receber notificação para poder saber)
  }[],
  users_permissions: unknown[], somente usuário com acesso ao projecto podem receber privilegios ou permissções
}

permissions = [ creator, editor, viewer ]; 

permission = {
  name: string,
  description: string,
  id: string,
}

creator -> all privileages (apagar mover , alterar permissões )
editor -> mover, editar, marcar como feita, mudar o titulo etc,
viewer -> pode ler apenas