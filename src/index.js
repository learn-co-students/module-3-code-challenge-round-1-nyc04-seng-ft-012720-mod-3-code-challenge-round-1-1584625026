document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4868
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const card = document.getElementById("image_card")
  const image = card.children[0]
  const title = card.children[1]
  const likes = card.children[2].children[0]
  const likeButton = card.children[3]
  const commentForm = card.children[4]
  const comments = card.children[5]

  function renderOneComment(commentObj){
    const commentLi = document.createElement('li')
    commentLi.dataset.id = commentObj.id
    commentLi.innerHTML = `
    ${commentObj.content}
    `
    comments.append(commentLi)
  }

  fetch(imageURL)
    .then(response => response.json()) //holy shit dude
    .then(response => {
      image.src = response.url
      title.innerText = response.name
      likes.innerText = response.like_count
      response.comments.forEach(renderOneComment)

})
  likeButton.addEventListener("click", addLike)
  function addLike(){
    likes.innerText ++
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    }) // Jesus christ these brackets are going to kill me
  }
  commentForm.addEventListener("submit", handleCommentSubmission)
  function handleCommentSubmission(event){
    event.preventDefault()
    const newComment = {
      content: event.target.comment_input.value,
      image_id: imageId
    }
    renderOneComment(newComment)
    fetch(commentsURL, {
      method: `POST`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)

    })


    // WORKING ON COMMENTS AT TIME OF FIRST COMMIT
  }

})