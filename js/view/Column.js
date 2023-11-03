import trelloAPI from "../api/trelloAPI.js";
import DropZone from "./DropZone.js";
import Item from "./item.js";

export default class Column {
    constructor(id, title){
        const topDropZone = DropZone.createDropZone('topZone');

        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector('.trello-title');
        this.elements.items = this.elements.root.querySelector(".trello-items");
        this.elements.addItem = this.elements.root.querySelector(".trello-add-item");


        this.elements.title.textContent = title;
        this.elements.root.dataset.id = id;

        this.elements.items.appendChild(topDropZone);

        this.elements.addItem.addEventListener('click', ()=>{
            const newItem = trelloAPI.InsertItem(id, '');

            this.renderItem(newItem);
        })

        trelloAPI.getItems(id).forEach(item=>{
            console.log(item);
            this.renderItem(item);
        })

    }

    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(
        `<section class="md:w-[27rem] py-[1.5rem] px-[1rem] w-11/12 h-max bg-[#DDDFE7] rounded-[.25rem] mx-auto md:mx-0 flex flex-col gap-[1rem] relative trello-column">
        <h1 class="font-[600] text-[1.3rem] trello-title"></h1>
  
       <div class="flex flex-col gap-[.75rem] trello-items">
       </div>

       <button class='trello-add-item bg-blue-500 text-white flex-none w-1/2  p-3 font-bold rounded-[.5rem] duration-[.5s] hover:bg-blue-600 hover:text-black'>+ Add</button>
    </section>`
        ).children[0];
    }

    renderItem(data){
        //todo create the item instance

        const item = new Item(data.id, data.content);

        this.elements.items.appendChild(item.elements.root);
    }
}