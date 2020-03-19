document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4863 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //DOM Elements
  const imageCard = document.querySelector('#image_card')
  
  //Event Listeners
  document.addEventListener("submit", handleSubmit)

  function handleLike() {
    const likesCount = imageCard.querySelector("#likes")
    const currentLikes = parseInt(likesCount.innerText)
    likesCount.innerText = currentLikes + 1
    dataForLike = imageCard.childNodes[1].dataset.id
    postLike(dataForLike)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    comContent = form.comment_input.value
    comImage = imageCard.childNodes[1].dataset.id
    const newComObj = {
      content: comContent,
      image_id: comImage
    }
    renderComment(newComObj)
    postComment(newComObj)
    form.reset()
  }
  //Render Image
  function renderImage(imageObj) {
    // const image = imageCard.querySelector("img")
    imageCard.innerHTML = `
    <img src="${imageObj.url}" id="image" data-id="${imageObj.id}"/>
    <h4 id="name">${imageObj.name}</h4>
    <span>Likes:
      <span id="likes">${imageObj.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
    </ul>
    `
    const likeBtn = imageCard.querySelector("#like_button")
    likeBtn.addEventListener("click", handleLike)

    const commentsArr = imageObj.comments
    commentsArr.forEach(renderComment)
    // imageCard.append(image)
  }
  //Render Comments
  function renderComment(commentObj) {
    const commentBox = imageCard.querySelector('#comments')
    //id,content,image_id,created_at,updated_at
    const newComment = document.createElement("li")
    newComment.innerText = commentObj.content
    commentBox.append(newComment)
  }

  //Get Image
  function fetchImage() {
    return fetch(imageURL)
    .then(res => res.json())
  }
  //Post Like
  function postLike(data) {
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({image_id: (data)})
    })
  }
  //Post Comment
  function postComment(data) {
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  //Initialize and render
  fetchImage().then(renderImage)
})
