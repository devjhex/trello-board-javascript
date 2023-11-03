export default class trelloAPI{

    static getItems(columnId){
        const column = read().find(column => column.id === columnId);

        if(!column){
            return [];
            //here you would throw a new error.
        }

        return column.items;

    }

    static InsertItem(columnId, content){
        const data = read();
        const column = data.find(column => column.id === columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),
            content
        }

        if(!column) {
            throw new Error("Column does not exist");
        }

        column.items.push(item);

        save(data);

        return item;
    }

    static updateItem(itemId, newProps){
        const data = read();
        const [item, currentColumn] = (()=>{
           for(const column of data){
            const item = column.items.find((item)=>item.id === itemId);

            if(item){
                return [item, column];
            }
           } 
        })();

       if(!item){
        throw new Error('Item not found');
       }

       item.content = newProps.content === undefined ? item.content : newProps.content;

     //update column and position
      if(newProps.targetColumnId !== undefined && newProps.targetPosition !== undefined){
        const targetColumn = data.find((column)=> column.id === newProps.targetColumnId);

        if(!targetColumn){
            throw new Error("Target Column not found");
        }
       
        //Delete the item from it's current column
        currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

        //Add the new item to the new postion
        targetColumn.items.splice(newProps.targetPosition,0, item);
      } 
      
      save(data);

    }

    static deleteItem(itemId){
        const data = read();

        for(let column of data){
            const item = column.items.find((item)=>item.id === itemId);

            if (item) {
                column.items.splice(column.items.indexOf(item), 1);
            }
        }

        save(data);
    }


}

function read(){

    const json = localStorage.getItem("trello-data");

    if (!json) {
        return [
            {
                id:1,
                items:[]
            },
            {
                id:2,
                items:[]
            },
            {
                id:3,
                items:[]
            }
        ];
    }

        return JSON.parse(json);

}

function save(data){
    localStorage.setItem('trello-data', JSON.stringify(data));
}

let trelloDAta = [
    {
        id:1,
        items:[
           {
            id:72714,
            content:'Edit Video 🤷‍♂️🤷'
           },
           {
            id:72715,
            content:'Eat some food 🤷‍♂️🤷'
           }
        ]
    },
    {
        id:2,
        items:[
            {
                id:72716,
                content:'Go with the boys'
               },
               {
                id:72717,
                content:'Chillisize with them all.'
               }
        ]
    },
    {
        id:3,
        items:[
            {
                id:72718,
                content:'Go and see Joan before the exams end.'
               },
               {
                id:72719,
                content:'Have lunch with her too.'
               }
        ]
    }
];

/* localStorage.setItem('trello-data', JSON.stringify(trelloDAta)); */

