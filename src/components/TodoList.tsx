import {useState, useEffect} from "react"
import { v4 as uuid } from "uuid"
import {Todo} from "./../types/Todo"
import { addTodo, getAllTodos, updateTodo, deleteTodo } from "../db-operations"
import TodoItem from "./TodoItem"

function TodoList() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {

    const fetchTodos = async () => {
        const todos = await getAllTodos()
        console.log(todos)
        setTodos(todos)
    }
    fetchTodos()

  }, [])


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if(!input) {
        return
    }

    // Add todo - både uppdatera listan och vår db
    const newTodo: Todo = {
        id: uuid(),
        text: input,
        completed: false
    }

    // Spara till backend - Create POST request
    addTodo(newTodo)

    // Uppdatera state
    setTodos([...todos, newTodo])

    console.log(todos)


  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setInput(text)
  }

  const onComplete = (id: string) => {
        console.log(id)
  }

  const onDelete = (id: string) => {
     // Ta bort en todo från listan i frontend, todos

     // Uppdatera state för todos

     // Synka till db för todos


  }



  return(
    <div>
        <h1>TodoList</h1>
        <hr/>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a task"
                value={input}
                onChange={handleChange}
            />
            <button type="submit">Add todo</button>
        </form>
        <ul>
            {todos.map((todo: Todo) => {
                return (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onDelete={onDelete}
                      onComplete={onComplete}
                    />
                )
            })}
        </ul>
    </div>
  )
}

export default TodoList