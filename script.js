const columns =document.querySelectorAll(".column_cards");
const cards = document.querySelectorAll(".card");

//elemento global do cards
let draggedcard;

//funcao para iniciar ao mover draggedCard
const dragStart = (Event)=>{
    draggedcard = Event.target;
    console.log(draggedcard);
    Event.dataTransfer.effectAllowed = `move`;
}

/*tira o bloqueio ao mover o cursor */
const dragOver = (Event)=>{
    Event.preventDefault()
}

//criar a selecao do css azul ao mover em outro card
const dragEnter = ({target})=>{
    if(target.classList.contains("column_cards")) {
        target.classList.add("colum_highlight")     
        }
    }

    //para nao selecionar as duas colunas ao mesmo tempo
    const dragLeave = ({target})=>{
        target.classList.remove("colum_highlight")
    }

    //para mover os cards de uma coluna a outra
    //e para nao colocar em cima do outro
    const drop= ({target})=>{
        if(target.classList.contains("column_cards")){
            target.classList.remove("column_highlight")
            target.append(draggedcard)
        }
    }

    /* para criar os cards*/
    const creatCard=({target})=>{
        if(!target.classList.contains("column_cards"))return;
        const card= document.createElement("section")

        card.className = "card";
        card.draggable = "true";
        card.contentEditable = "true";

        //quando nao estiver no card, nao seleionar
        card.addEventListener("focusout", ()=>{
            card.contentEditable= "false";
            if(!card.textContent) card.remove();
        })

        card.addEventListener("draggstart",dragStart);
        target.append(card);
        //para selecionar quando estiver no card
        card.focus();
    }

    //para receber cada elemento da lista, criar um evento ao mover
    cards.forEach((card)=>{
        card.addEventListener("dragstart", dragStart);

    });

    columns.forEach((columns)=>{

        columns.addEventListener("dragover", dragOver);
        columns.addEventListener("dragenter", dragEnter);
        columns.addEventListener("dragleave", dragLeave);
        columns.addEventListener("drop", drop);
        columns.addEventListener("dblclick", creatCard);

});
