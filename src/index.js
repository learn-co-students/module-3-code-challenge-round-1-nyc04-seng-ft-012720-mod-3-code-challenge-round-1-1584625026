document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4865 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

function imageURL() {
    return fetch("https://randopic.herokuapp.com/images/${imageId}")
      .then(r => r.json())
}

function likeURl() {
    return fetch("https://randopic.herokuapp.com/likes/")
    .then(r => r.json())
}

function commentsURL() {
    return fetch("https://randopic.herokuapp.com/comments/")
    .then(r => r.json())
}


function renderImageContainer(image) {
  const detailCon = document.querySelector("#container")
    detailCon.innerHTML = `
    <img src="${image.url" data-id="${image.id}">
    <h4 id="name">Title of image goes here</h4>
    <span>Likes:
      <span id="likes">Likes Go Here</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    `


})
