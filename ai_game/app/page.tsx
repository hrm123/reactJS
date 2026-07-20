"use client";

import { useState } from "react";
import { Avatar } from "@/components/Avatar";
import { generateCharacter } from "@/lib/seededRandom";

export default function Home() {
  const [name, setName] = useState("Jo the Wanderer");
  const character = generateCharacter(name);

  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Procedural Avatar Maker</h1>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-center mb-6">
          <Avatar name={name} />
        </div>

        <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-64">
          {JSON.stringify(character, null, 2)}
        </pre>
      </div>
    </main>
  );
}
