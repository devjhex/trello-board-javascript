import Column from "./Column.js";

export default class Trello{
    constructor(root){
        this.root = root;
        
        
        Trello.columns().forEach(column => {
        //Create an instance column class
        const columnView = new Column (column.id, column.title);

        this.root.appendChild(columnView.elements.root);
        });

       
    
    }

   
    static columns(){
        return [
            {
                id:1,
                title:'To Do'
            },
            {
                id:2,
                title:'In progress'
            },
            {
                id:3,
                title:'Done'
            }
        ]
    }
}