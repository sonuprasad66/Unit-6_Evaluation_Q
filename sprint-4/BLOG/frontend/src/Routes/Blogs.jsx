import React, { useEffect, useState } from 'react'
let token = localStorage.getItem("token") || "";
const Blogs = () => {
  const [newBlog,setNewBlog]=useState({title:"",category:"",author:"",content:""})
  const [blogs, setBlogs] = useState([]);

const handleChange=(e)=>{
  const {name,value}=e.target;
  setNewBlog({...newBlog,[name]:value})
}

  const getBlogs = () => {

    fetch("https://peaceful-plateau-56875.herokuapp.com/blogs", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setBlogs(res.data)

      })
      .catch(err => console.log(err))
  }

  //delete request

  useEffect(() => {
    getBlogs()
  }, []);

console.log(blogs)
  //add new todo
  const addBlog = () => {
    // console.log("added")
    fetch(`https://peaceful-plateau-56875.herokuapp.com/blogs/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(newBlog)
    })
      .then(res => res.json())
      .then(res => { getBlogs() })
      .catch(err => { console.log("there", err) })

  }


  // const handleToggle = (id, status) => {
  //   status = status ? false : true;
  //   fetch(`https://peaceful-plateau-56875.herokuapp.com/${id}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
  //     body: JSON.stringify({ status })
  //   })
  //     .then(res => res.json())
  //     .then(res => { get() })
  //     .catch(err => { console.log("there", err) })

  // }
  // const handleDelete = (id) => {
  //   fetch(`https://peaceful-plateau-56875.herokuapp.com/blogs/${id}`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
  //     // body:JSON.stringify({status})
  //   })
  //     .then(res => res.json())
  //     .then(res => { 
  //       console.log(res)
  //       getTodos()
  //      })
  //     .catch(err => { console.log("there", err) })

  // }

  return (
    <div>
      <h2>crate blog</h2>
      <div>
        <input onChange={handleChange} name="title" type="text" placeholder='title'/>
        <input onChange={handleChange} name="category" type="text" placeholder='category'/>
        <input onChange={handleChange} name="author" type="text" placeholder='author'/>
        <input onChange={handleChange} name="content" type="text" placeholder='content'/>
        <button onClick={addBlog}>post blog</button>
      </div>
      {
        blogs && blogs.map(el=>{
          return (<div>

          </div>)
        })
      }
    </div>
  )
}

export default Blogs