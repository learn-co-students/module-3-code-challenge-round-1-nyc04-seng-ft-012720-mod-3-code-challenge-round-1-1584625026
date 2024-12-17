document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4882 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

//  --- GETTING REQUIRED PAGE ELEMENTS    SETTING ANY VARIABLES   ----- 

  const imageDiv = document.querySelector("#image_card")
  const imageTag = document.querySelector("#image")
  const imageName = document.querySelector("#name")
  const imageLikes = document.querySelector("#likes")
  const likeBtn = document.querySelector("#like_button")
  const newCommentForm = document.querySelector("#comment_form")
  const outerUl = document.querySelector("#comments")

//  --- INITIAL FETCH AND RENDERING   ----- 

  fetch(`${imageURL}`)
    .then((response) => {
     return response.json()
    })
    .then((imageData) => {
         imageTag.attributes.src.value = `${imageData.url}`
         imageTag.attributes[2].value = `${imageData.id}`
         imageName.textContent = `${imageData.name}`
         imageLikes.textContent = `${imageData.like_count}`
         imageDiv.append()
         const commentList = imageData.comments
         commentList.forEach((comment) => {
                     renderComment(comment)
         })
  })

//  --- ADDING EVENT LISTENERS ON PAGE ELEMENTS   ----- 

  likeBtn.addEventListener("click", (ev) => {
          let currentLikes = imageLikes.textContent
          currentLikes++
          debugger
          imageLikes.textContent = `${currentLikes}`
          const newLike = {
                    image_id: imageTag.attributes[2].value
                }
          fetch(`${likeURL}`, {
                method: 'POST', 
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                         },
                body: JSON.stringify(newLike)
          })
  })

  newCommentForm.addEventListener("submit", (ev) => {
          ev.preventDefault()
          const newComment = {
                 image_id: imageTag.attributes[2].value,
                 content: newCommentForm["comment"].value
                }
          fetch(`${commentsURL}`, {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                         },
                body: JSON.stringify(newComment)})
              .then(response => response.json())
              .then(newCommentData => renderComment(newCommentData))
          newCommentForm.reset()
  })

  function renderComment(comment) {
    const commentLi = document.createElement("li")
    commentLi.innerHTML = `
       ${comment.content} <button id="${comment.id}" class="delete_btn">Delete Me</button>
    ` 
    outerUl.append(commentLi)
    const deleteCommentBtn = commentLi.querySelector(".delete_btn")
    deleteCommentBtn.addEventListener("click", deleteComment)
  }

//   --------  DELETE FUNCTION  ------------

  function deleteComment(ev) {
        const badLi = ev.target.parentElement
        const noGoodComment = ev.target.id
        let errorMessage = "Something Went Very Wrong"
        let customMessage = "Comment Successfully Destroyed"
        fetch(`https://randopic.herokuapp.com/comments/${noGoodComment}`, {
               method: 'DELETE'})
              .then(response => {
                    if (response.ok) {
                        window.alert(`${customMessage}`)
                        badLi.remove()
                    } else {
                        window.alert(`${errorMessage}`)
                    }
              })
  }
})
