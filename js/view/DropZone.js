import trelloAPI from "../api/trelloAPI.js";

export default class DropZone{
    static createDropZone(dest){
        const range = document.createRange();

        range.selectNode(document.body);

        const dropzone = range.createContextualFragment(
            `<div class='dropzone ${dest}'></div>`
        ).children[0];

        dropzone.addEventListener("dragover", e => {
            e.preventDefault();

            dropzone.classList.add('dropzone--active');
        });

        dropzone.addEventListener('dragleave', e =>{
            dropzone.classList.remove('dropzone--active');
        })

        dropzone.addEventListener("drop", e => {
            e.preventDefault();
            dropzone.classList.remove('dropzone--active');

            const columnElement = dropzone.closest('.trello-column');

            const columnId = Number(columnElement.dataset.id);

            // console.log(columnElement, columnId);

            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".dropzone"));
            const droppedIndex = dropZonesInColumn.indexOf(dropzone);
             
            const itemId = Number(e.dataTransfer.getData('text/plain'));

            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);

            const insertAfter = dropzone.parentElement.classList.contains('trello-item') ? dropzone.parentElement : dropzone;
             
            if(droppedItemElement.contains(dropzone)){
                return;
            }

            insertAfter.after(droppedItemElement);

            trelloAPI.updateItem(itemId, {
                targetColumnId:columnId,
                targetPosition:droppedIndex
            });


            console.log(itemId);

        })

        return dropzone;
    }
}