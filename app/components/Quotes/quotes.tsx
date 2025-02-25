"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuotes } from "../../redux-toolkit/slices/quotes";
import { RootState, AppDispatch } from "../../redux-toolkit/store";

export default function Quotes() {
  const dispatch = useDispatch<AppDispatch>();
  const { quotes, loading, error } = useSelector((state: RootState) => state.quotes);

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Quotes</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id} className="mt-4 border-b pb-2">
            <p className="italic">&quot;{quote.quote}&quot;</p>
            <p className="font-semibold">- {quote.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
