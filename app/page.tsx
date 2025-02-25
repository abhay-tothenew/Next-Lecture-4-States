import Link from "next/link";

export default function Home() {
  return(
    <div className="p-6 max-w-2xl mx-auto text-center items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-center border-b-2">Hello World</h1>
      <div style={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Link href = "/useReducer" className="text-blue-500 hover:text-blue-600">
        Go to use reducer
      </Link>
      <Link href = "/redux" className="text-blue-500 hover:text-blue-600">
        Go to redux
      </Link>
      </div>
    </div>
  )
}