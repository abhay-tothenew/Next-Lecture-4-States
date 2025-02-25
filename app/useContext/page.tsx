"use client"
import { useContext } from "react"
import { DataContext } from "../utils/context";


export default function UseContext() {

    const {
        products,
        loading,
        error
    } = useContext(DataContext);

    return (
        <div>
            <h1>UseContext Hook Usage</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id} style = {{
                        borderBottom: "1px solid #ccc",
                        padding: "10px",
                    }}>
                        <p><strong>{product.title}</strong></p>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </li>
                ))}
                </ul>
        </div>
    )
}