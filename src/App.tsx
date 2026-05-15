import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import { Construction } from "lucide-react"

type Todo = {
  id: number,
  text: string,
  completed: boolean
  priority: Priority
}

type Priority = 'Basse' | 'Moyenne' | 'Urgente'

function App() {
  /// Variable pour stocker la valeur de l'input et la priorité sélectionnée
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState<Priority>('Moyenne')

  /// Récup les todos sauvegardés dans le localStorage, s'il y en a, sinon on initialise avec un tableau vide
  const savedTodos = localStorage.getItem('todos')
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  /// Valeur du filtre de tâches, par défaut on affiche toutes les tâches
  const [filter, setFilter] = useState<Priority | 'Tous'>('Tous')

  /// Stockage des tâche éffectuée
  const selectedTodos = todos.filter((todo) => todo.completed)

  useEffect(() => {
    /// Sauvegardons les todos dans le localStorage à chaque fois que la liste de todos change
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  /// Fonction pour ajouter une nouvelle tâche à la liste des tâches
  function addTodo() {
    /// Vérifions d'abord que l'input n'est pas vide, sinon on ne fait rien
    if (input.trim() === '') return

    /// Créons un nouvel objet Todo avec les informations nécessaires
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority
    }
    /// Et maintenant, ajoutons cette nouvelle tâche à notre liste de tâches en utilisant la fonction setTodos
    setTodos([...todos, newTodo])
    setInput('')
    console.log(newTodo)
  }

  /// Fonction pour supprimer une tâche de la liste des tâches
  function deleteTodo(id: number) {
    /// Filtrons la liste des tâches pour ne garder que celles qui n'ont pas l'id de la tâche à supprimer
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  /// Fonction pour marquer une tâche comme complétée ou non complétée
  function toggleCompleted(id: number) {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    }))
  }

  /// Variable pour stocker les tâches filtrées en fonction de la priorité sélectionnée
  let filteredTodos: Todo[] = []

  if (filter === 'Tous') {
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter)
  }

  const totalCount = todos.length
  const urgentCount = todos.filter((todo) => todo.priority === 'Urgente').length
  const mediumCount = todos.filter((todo) => todo.priority === 'Moyenne').length
  const lowCount = todos.filter((todo) => todo.priority === 'Basse').length

  return (
    <div className="flex justify-center ">
      <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-4 rounded-lg">
        <div className="flex gap-4">
          <input
            id="5"
            type="text"
            placeholder="Ajouter une nouvelle tâche..."
            className="input w-full"
            value={input}
            /// Pour mettre à jour la valeur de l'input à chaque fois que l'utilisateur tape quelque chose
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            name=""
            id="4"
            className="select w-full"
            value={priority}
            /// Pour mettre à jour la valeur de la priorité à chaque fois que l'utilisateur sélectionne une option
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button
            className="btn btn-primary"
            onClick={addTodo}
          >
            Ajouter
          </button>
        </div>
        <div className="space-y-2 flex-1 h-fit">
          {/* Affichons les tâches filtrées en fonction de la priorité sélectionnée */}
          <div className="flex flex-wrap gap-4">
            <button
              className={`btn btn-soft ${filter === 'Tous' ? 'btn-primary' : ''}`}
              onClick={() => setFilter("Tous")}
            >
              Tous ({totalCount})
            </button>
            <button
              className={`btn btn-soft ${filter === 'Urgente' ? 'btn-primary' : ''}`}
              onClick={() => setFilter("Urgente")}
            >
              Urgente ({urgentCount})
            </button>
            <button
              className={`btn btn-soft ${filter === 'Moyenne' ? 'btn-primary' : ''}`}
              onClick={() => setFilter("Moyenne")}
            >
              Moyenne ({mediumCount})
            </button>
            <button
              className={`btn btn-soft ${filter === 'Basse' ? 'btn-primary' : ''}`}
              onClick={() => setFilter("Basse")}
            >
              Basse ({lowCount})
            </button>
          </div>

          {filteredTodos.length > 0 ? (
            <ul
              className="divide-y divide-primary/20"
            >
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem todo={todo} onDelete={deleteTodo} onToggleCompleted={toggleCompleted} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col p-5 justify-center items-center">
              <div>
                <Construction strokeWidth={2} className="w-16 h-16 text-primary" />
              </div>
              <p className="text-lg font-semibold mt-4">Aucune tâche trouvée</p>
              <p className="text-gray-500">Ajoutez une nouvelle tâche pour commencer.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default App
