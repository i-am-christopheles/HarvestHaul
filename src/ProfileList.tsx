import { useState, useEffect } from "react";
import type { Schema } from "../amplify/data/resource.ts";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function TodoList() {
    const [todos, setTodos] = useState<Schema["Producer"]["type"][]>([]);

    const fetchTodos = async () => {
        const { data: items, errors } = await client.models.Producer.list();
        console.log(errors)
        setTodos(items);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const createTodo = async () => {
        await client.models.Producer.create({
            name: window.prompt("Todo content?"),
        });

        fetchTodos();
    }

    return (
        <div>
            <button onClick={createTodo}>Add new todo</button>
            <ul>
                {todos.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                ))}
            </ul>
        </div>
    );
}