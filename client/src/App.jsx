function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">KejaSmart Setup Complete! 🇰🇪</h1>
        <p className="text-slate-600">
          If this text is blue and the box has a shadow, Tailwind is working perfectly.
        </p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Ready to Build
        </button>
      </div>
    </div>
  )
}

export default App