class Todo {

    id = 0;
    static nextId=0;
    constructor(text: string, status = "active"){
        this.id = ++Todo.nextId;
    }

}
