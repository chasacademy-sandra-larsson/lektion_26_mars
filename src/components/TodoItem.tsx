import type {Todo} from "./../types/Todo"




//Alt 1: TodoItem({todo}: {todo: Todo})

// Alt 2:
// type TodoItemProps = {
//     todo: Todo
// }
//function TodoItem({todo}: TodoItemsProps) 

// Alt 3 
//function TodoItem(props: TodoItemsProps)

// eller interface istället för type!

type TodoItemProps = {
    todo: Todo,
    onComplete: (id: string) => void,
    onDelete: (id: string) => void
}

function TodoItem({todo, onComplete, onDelete}: TodoItemProps) {


    const handleCompleted = () => {
        onComplete(todo.id)

    }

    const handleDelete = () => {
        onDelete(todo.id)
    }


    return(
        <li>
            <input type="checkbox" onChange={handleCompleted}/>
            <span>{todo.text}</span>
            <button onClick={handleDelete}>Delete</button>
        </li>
    )
}

export default TodoItem