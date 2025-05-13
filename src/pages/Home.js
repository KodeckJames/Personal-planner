import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
// import { loadVanta } from "./vantaBackground";
//Components
import SmoothieCard from "../components/SmoothieCard";
// window.addEventListener("DOMContentLoaded", loadVanta);
// Add this to the div to implement it: id="vanta-bg" style={{ width: "100vw", height: "100vh" }}
const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at');

  const handleDelete = (id)=>{
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm=> sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .order(orderBy, { ascending: false })
      
      
      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        console.log(error);
        
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    }
    fetchSmoothies();
  }, [orderBy])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p className="order-text-color">Order by:</p>
            <button onClick={()=>setOrderBy('created_at')}>Time created </button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Priority</button>
            <span className="order-text-color">{orderBy}</span>
          </div>
          <div className="smoothie-grid">
          {smoothies.map(smoothie => (
            <SmoothieCard
              key={smoothie.id}
              smoothie={smoothie}
              onDelete={handleDelete}
            />
          ))}
         </div>
        </div>
      )}
    </div>
  )
}

export default Home