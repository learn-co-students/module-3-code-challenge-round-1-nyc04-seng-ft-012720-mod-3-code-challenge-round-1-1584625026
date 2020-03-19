// Application State
let imageId = 4864 //Enter the id from the fetched image here

// DOM Elements
const pageImage = document.querySelector('#image')
const pageLike = document.querySelector("#likes")
const pageComments = document.querySelector("#comments")

// const commentsURL = `https://randopic.herokuapp.com/comments/`

// Event Listeners
pageImage.addEventListener("click", e => {
  // const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  
})

pageLike.addEventListener("click", e => {
  // const likeURL = `https://randopic.herokuapp.com/likes/`
  
})

// Render Helpers


// Initial Fetch
fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(r => r.json())

// document.addEventListener('DOMContentLoaded', () => {
//   console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
// })