// document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4863 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //DOM Elements
  const imageCard = document.querySelector('#image_card')
  
  let i = 0

  //Event Listeners


  function handleLike() {
    i += 1
    const likesCount = imageCard.querySelector("#likes")
    likesCount.innerText = `Likes: ${i}`
    // fetchImage().then(data => {
    //   likesCount.innerText = `${data.likes_count}`
    // })
    newLikeObj = {
      
    }
    postLike()
  }

  //Render Image
  function renderImage(imageObj) {
    // const image = imageCard.querySelector("img")
    imageCard.innerHTML = `
    <img src="${imageObj.url}" id="image" data-id="${imageObj.id}"/>
    <h4 id="name">${imageObj.name}</h4>
    <span>Likes:
      <span id="likes">${imageObj.likes_count}</span>
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
    return fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(res => res.json())
  }
  //Post Like
  function postLike(data) {
    fetch(`https://randopic.herokuapp.com/likes/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        'Accept': 'application/json'
      },
      body: JSON.stringify()
    })
  }

  //Initialize and render
  fetchImage().then(renderImage)
// })
