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
      // Uppdatera en todo från listan i frontend, todos (mappa igenom...och använd spread)
      const newTodos = todos.map((todo: Todo) => {
        if(todo.id === id) {
          todo.completed = !todo.completed
          // Synka till db för uppdaterade todos
        updateTodo(todo)
        }

        return todo
      })
      
    
      // Uppdatera state för todos
      setTodos(newTodos)


}

  const onDelete = (id: string) => {
    
     // Ta bort en todo från listan i frontend, todos
     const updatedTodos = todos.filter((todo) => todo.id !== id)

    // Synka till db för todos
    deleteTodo(id)

     // Uppdatera state för todos
     setTodos(updatedTodos)

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