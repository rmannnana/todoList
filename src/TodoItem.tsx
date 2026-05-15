import { Trash } from "lucide-react"

type Todo = {
    id: number,
    text: string,
    completed: boolean
    priority: Priority
}

type Priority = 'Basse' | 'Moyenne' | 'Urgente'

type Props = {
    todo: Todo
    onDelete: (id: number) => void
    onToggleCompleted?: (id: number) => void
}
const TodoItem = ({ todo, onDelete, onToggleCompleted }: Props) => {
    return (
        <li className="p-3">
            <div className="flex justify-between items_center">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        checked={todo.completed}
                        onChange={() => onToggleCompleted && onToggleCompleted(todo.id)}
                    />
                    <span className="text-md font-bold">
                        <span>{todo.text}</span>
                    </span>
                    <span className={`text-md font-bold badge badge-sm badge-soft
                        ${todo.priority === 'Urgente' ? 'badge-error'
                            : todo.priority === 'Moyenne' ? 'badge-warning'
                                : 'badge-success'}
                    `}>
                        <span>{todo.priority}</span>
                    </span>
                </div>
                <button
                    className="btn btn-soft btn-error btn-sm"
                    onClick={() => onDelete(todo.id)}
                >
                    <Trash className="w-4 h-4" />
                </button>
            </div>

        </li>
    )
}

export default TodoItem