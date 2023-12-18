import trelloAPI from "../api/trelloAPI.js";
import DropZone from "./DropZone.js";

export default class Item {
    constructor(id, content){
        const bottomDropZone = DropZone.createDropZone('betweenZone');

        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector('.trello-item-content');
        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;

        //saves the current state of the content
        this.content = content;

        this.elements.root.appendChild(bottomDropZone);

        const onBlur = ()=>{
            const newContent = this.elements.input.textContent.trim();

            if (newContent === this.content) {
             return;   
            }

            this.content = newContent;

            trelloAPI.updateItem(id, {
                content:this.content,
            });

        }

        //add the blur listener to fire when focus is lost
        this.elements.input.addEventListener("blur", onBlur);

        //double click feature for deletion of an item
        this.elements.root.addEventListener("dblclick",()=>{
            const check = confirm("Are you sure you want to delete this item?");

            if(check){
                trelloAPI.deleteItem(id);

                this.elements.input.removeEventListener('blur',onBlur);

                this.elements.root.parentElement.removeChild(this.elements.root);

            }
        });

        //the drag and drop event listeners
        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData('text/plain', id);
        });
        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        });

    }

    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(
            ` <article class="flex p-[1rem] flex-col gap-[.75rem] items-start bg-white rounded-[.25rem] shadow relative z-20 trello-item cursor-pointer" draggable="true">

            <div class="flex gap-[.5rem]">
                 <!-- !flag component -->
                  <span class="py-[.125rem] px-[.5rem]  rounded-[.125rem] bg-[#FFA775] text-[#622808] text-[.6rem]">high priority</span>
     
                 <!-- !End of flag component -->
            </div>
             <div class='trello-item-content p-2' contenteditable></div>
     
           
     
             <!-- !Date component -->
             <span class="flex items-center gap-[.4rem] text-[#646570] font-[600] text-[.6rem]">
                 <img src="./images/calendar.svg" alt="calendar">
                 Jan 20th, 2022
     
             </span>
             <!-- !end of date component -->
     
               
           
         </article>`
        ).children[0];
    }
}