import { useEffect, useState } from "react"

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

  useEffect(() => {
    /// Sauvegardons les todos dans le localStorage à chaque fois que la liste de todos change
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  /// Fonction pour ajouter une nouvelle tâche

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
  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 padding-5 rounded-2xl">
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
      </div>
    </div>
  )
}

export default App
