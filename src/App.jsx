import { useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinshed, setshowfinshed] = useState(true)

  const togglefinished=()=>{
setshowfinshed(!showfinshed)
  }

  useEffect(() => {
   
   let todostring=localStorage.getItem("todos")
   if(todostring){
let todos=JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
   }
  }, [])
  

  let savetols=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handledelete=(e,id)=>{
    let newtodos=todos.filter(item=>{
      return item.id!==id
    })

    settodos(newtodos)
    savetols()
  }
  const handleedit=(e,id)=>{
    let t=todos.filter(i=> i.id===id)
    settodo(t[0].todo)

    let newtodos=todos.filter(item=>{
      return item.id!==id
    })

    settodos(newtodos)
    savetols()
  }


  const handlechange = (e) => {
    settodo(e.target.value)
  }
  const handlesave = (e) => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    savetols()
  }
  const handlecheck = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })

    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    savetols()
  }

  return (
    <>
      <Navbar />
      <div className="container w-3/4 bg-blue-400 mx-auto mt-3 h-[80vh] p-3 rounded-2xl">
        <h1 className='font-bold text-white text-xl'>Todo List</h1>

        <div className='w-full text-center'>

          <div className='space-x-2'>
            <input type="search" value={todo} onChange={handlechange} className='w-1/2 rounded-full pl-2 outline-none' />
            <button onClick={handlesave} disabled={todo.length<=3} className='bg-blue-800 disabled:bg-blue-500 text-white rounded-full p-1 px-2 font-semibold hover:bg-blue-500'>Save</button>
          </div>
        </div>
        <div className='w-1/2 mx-auto my-2' >
     
<input type="checkbox" checked={showfinshed} onChange={togglefinished} id="show" />
<label htmlFor="show">Show Finished</label>
               
        </div>


        <div className="todolist md:w-1/2 mx-auto my-5">
        {todos.length===0 && <div className='text-white'>No Todos To Display</div> }
          {todos.map(item => {
            return (showfinshed || !item.isCompleted) && <div className="todos flex items-center justify-around mt-3" key={item.id}>
              <input type="checkbox" onChange={handlecheck} checked={item.isCompleted} name={item.id}/>
              <div className={item.isCompleted ? "line-through text-white w-1/2" : "text-white w-1/2"}>{item.todo}</div>
              <div className="buttons flex gap-3">
                <button className='bg-blue-600 hover:bg-blue-500 text-white rounded-full p-1 px-2 font-semibold' onClick={(e)=>{handleedit(e,item.id)}} ><FaEdit /></button>
                <button className='bg-blue-600 hover:bg-blue-500 text-white rounded-full p-1 px-2 font-semibold' onClick={(e)=>{handledelete(e,item.id)}}><AiFillDelete /></button>
              </div>
            </div>

          })}
        </div>

      </div>

    </>
  )
}

export default App
