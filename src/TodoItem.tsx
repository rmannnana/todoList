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
}
const TodoItem = ({ todo }: Props) => {
    return (
        <li className="p-3">
            <div className="flex justify-between items_center">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
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
                    className="btn btn-soft btn-error btn-sm">
                    <Trash className="w-4 h-4" />
                </button>
            </div>

        </li>
    )
}

export default TodoItem