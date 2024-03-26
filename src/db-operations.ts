import axios from "axios"
import type {Todo} from "./types/Todo"

// CREATE 
export const addTodo = async (todo: Todo) => {
    const response = await axios.post("http://localhost:3000/todos", todo)
    return response.data;
}

// READ 
export const getAllTodos = async () => {
    const response = await axios.get("http://localhost:3000/todos")
    return response.data;
}


// UPDATE 
export const updateTodo = async (todo: Todo) => {
    const response = await axios.put(`http://localhost:3000/todos/${todo.id}`, todo)
    return response.data;
}


// DELETE
export const deleteTodo = async (id: string) => {
    const response = await axios.delete(`http://localhost:3000/todos/${id}`)
    return response.data;
}
