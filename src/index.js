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
commentForm.addEventListener('submit',addComment)
likeBtn.addEventListener('click', likeImage)
/** Rendering **/

//IMAGE
  function renderImage(json){
    image.src = json.url 
    nameDiv.innerText = json.name 
    likesDiv.innerText = json.like_count
    image.dataset.id = json.id 
    commentList.innerHTML = json.comments.map((comment) => `<li>${comment.content}</li>`).join(" ")
 }

 //LIKE IMAGE(Post Request)
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

//MAKE COMMENTS(Post Request)
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

})