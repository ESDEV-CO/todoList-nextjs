import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "@/components/TodoItems";

function getTodos() {
  return prisma.todo.findMany()
}
async function toggleTodo(id: string, completed: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { completed } })
  // console.log(id, completed);

}

export default async function Home() {
  const todos = await getTodos()
  // await prisma.todo.create({ data: { title: 'test', completed: false } })
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="ol-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  )
}