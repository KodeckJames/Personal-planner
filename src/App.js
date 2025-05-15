import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import supabase from "./config/supabaseClient"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={['google','github']} // optional
      />
    )
  }

  return (
    <BrowserRouter>
      <nav>
        <h1>My Todos</h1>
        <div className="order-by">
          <Link to="/">Home</Link>
          <Link to="/create">Create New Todo</Link>
          <button onClick={() => supabase.auth.signOut()} className="form button">Logout</button>
        </div>

      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
