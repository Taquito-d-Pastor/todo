console.log('Enlazado a JS')
const formulario = document.getElementById('formulario')
const ListaTareas = document.getElementById('Lista-Tareas')
const template = document.getElementById('template').content 
const fragment = document.createDocumentFragment()
// Las const son funciones 
let tareas = {}

document.addEventListener('DOMContentLoaded', () => {
    //console.log(formulario, ListaTareas, template)
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas')) // Pasar de texto plano a un item
    }
    // Se necesita pintar las tareas
    pintarTareas()
})

formulario.addEventListener('submit', e => {
    e.preventDefault()
    //console.log('evento', e)
    setTarea(e)
})

const setTarea = e => {
    const texto = e.target.querySelector('input').value
    console.log('text', texto)

    if(texto.trim() === ''){
        console.log('cadena vacia')
        return
    }
    const tarea = {
        id: Date.now(),
        texto,
        estado: false 
    }
    tareas[tarea.id] = tarea
    pintarTareas()
    formulario.reset()
    e.target.querySelector('input').focus()
}

const pintarTareas = () => 
{            
    localStorage.setItem('tareas', JSON.stringify(tareas))  // stringify es para pasar a texto plano
    if(Object.values(tareas.length === 0)){
        ListaTareas.innerHTML =                            // Pegar el codigo a HTML
        `
            <div class="alert alert-dark">
                Sin Tareas Pendientes
            </div>
        `
        return        
    }
    ListaTareas.innerHTML = ''
    Object.values(tareas).forEach( tarea => {
        //console.log('tarea', tarea)
        const clone = template.cloneNode(true)
        clone.querySelector('p').texContent = tarea.texto
        if(tarea.estado){
            clone.querySelectorAll('.fas') [0].classList.replace('fa-check-circle', 'fa-undo-all')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id

        fragment.appendChild(clone)
    })
    ListaTareas.appendChild(fragment)
}


// Timestep: Hora mundial