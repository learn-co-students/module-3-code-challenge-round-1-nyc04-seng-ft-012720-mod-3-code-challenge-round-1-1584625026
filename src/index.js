// document.addEventListener('DOMContentLoaded', () => {})
let imageId = 4871 
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imageCard = document.getElementById("image_card")

// FETCHERS
const fetchImage = () => {
    return fetch(imageURL)
        .then(response => response.json())
}

const fetchLikes = (image) => {
    fetch(likeURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({image_id: image.id})
    })
    .then(response => response.json())
}

const fetchComments = (commentLi,image) => {
    fetch(commentsURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({image_id: image.id, content: commentLi.textContent})
    })
    .then(response => response.json())
}


// INITIAL FETCH
fetchImage()
    .then(imageData => renderImage(imageData))

// RENDER IMAGE
const renderImage = (image) => {
    imageCard.innerHTML = `        
    <img src="${image.url}" id="image" data-id="${image.id}"/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes">${image.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
    </ul>
    `
    image.comments.forEach(renderImageComment)

    // EVENT LISTENERS
    document.getElementById("like_button").addEventListener("click", () => {
        renderLike(image)
    })
    document.getElementById("comment_form").addEventListener("submit", event => {
        renderCommentForm(event, image)
    })
}


// RENDER HELPERS
// displays comments when loading page
const renderImageComment = (commentData) => {
    const commentsUl = document.getElementById("comments")
    const newCommentLi = document.createElement("li")
    newCommentLi.innerText = commentData.content
    commentsUl.append(newCommentLi)
}

const renderLike = (image) => {
    const likeCount = document.getElementById("likes")    
    likeCount.innerText = parseInt(likeCount.innerText) + 1
    fetchLikes(image)
}

// renders comment form and adds comment to commentsUl
const renderCommentForm = (event, image) => {
    event.preventDefault()
    const form = event.target
    const commentsUl = document.getElementById("comments")
    const commentLi = document.createElement("li")
    commentLi.textContent = form["comment"].value
    commentsUl.append(commentLi)
    fetchComments(commentLi, image)
    form.reset()
}