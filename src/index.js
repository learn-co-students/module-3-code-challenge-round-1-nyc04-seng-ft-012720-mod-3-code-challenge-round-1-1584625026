document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
/**STARTER VARIABLES**/

  let imageId = 4869 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/4869`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

//***DOM ELEMENTS ***/
  const nameDiv = document.getElementById('name')
  const likesDiv = document.getElementById('likes')
  const likeBtn = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')
  const commentList = document.getElementById('comments')
  const image = document.getElementById('image')

/**Fetches**/
  fetch(imageURL)
  .then(res => res.json())
  .then(json => renderImage(json))

/**Event Listeners **/
  //add listener to enable users to like and/or comment - stretch to delete comment
  commentForm.addEventListener('submit',addComment)
  likeBtn.addEventListener('click', likeImage)

/** Rendering **/

//IMAGE- get image from json fetch, and display on page
  function renderImage(json){
    image.src = json.url 
    nameDiv.innerText = json.name 
    likesDiv.innerText = json.like_count
    image.dataset.id = json.id 
    commentList.innerHTML = json.comments.map((comment) => `<li>${comment.content}</li>`).join(" ")
 }

 //COMMENTS
 //Attempted to create the delete button to render next to each comment. However have been unsuccessful
  function renderComments(comments){
    return comments.forEach(comment => {
      const commentLi = document.createElement('li')
      const deleteButton = document.createElement('button')
      commentLi.id = `comment-${comment.id}`
      deleteButton.dataset.id = comment.id
      deleteButton.innerText = 'DELETE'
      deleteButton.addEventListener('click', removeComment)
      commentLi.innerText = comment.content
      commentLi.append(deleteButton)
      commentList.append(commentLi)
    })
  }

 //LIKE IMAGE(Post Request)-json post request to update number of likes pass in url variable fo fetch data
  function likeImage(){
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({image_id: image.dataset.id})
    })
    .then(res => res.json())
    likesDiv.innerText = parseInt(likes.innerText) + 1
  }

//MAKE COMMENTS(Post Request)- allow user to add as many comments as they would like-stretch delete button or create delete function??
function addComment(event){
  event.preventDefault()
  fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: image.dataset.id,
      content: document.getElementById('comment_input').value
    })
  })
  .then(res => res.json())
  comments.innerHTML = comments.innerHTML = `<li>${document.getElementById('comment_input').value}</li>`
  document.getElementById('comment_input').value = ""
}

//DELETE COMMENTS
//I added this after the function below. Not really understanding
  function deleteComment(commentId){
    return fetch(`${commentsURL}/${commentId}`, {
      method: 'DELETE'
    })
  }
  function removeComment(event){
    const commentId = event.target.dataset.id
    const commentItem = document.getElementById(`comment-${commentId}`)

    commentItem.hidden = true
    return deleteComment(commentId)
  }

})