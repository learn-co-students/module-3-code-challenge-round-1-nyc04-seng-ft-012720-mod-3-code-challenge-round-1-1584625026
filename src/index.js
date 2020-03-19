// document.addEventListener('DOMContentLoaded', () => {})
let imageId = 4871 
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imageCard = document.getElementById("image_card")

// Step 1 - Get the Image Data
const fetchImage = () => {
    return fetch(imageURL)
        .then(response => response.json())
}

fetchImage()
    .then(imageData => renderImage(imageData))

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
         <!-- <li> for each comment goes here -->
         <li>${image.comments[0].content}</li>
    </ul>
    `
    // Step 2 - Like Feature (Frontend)
    document.getElementById("like_button").addEventListener("click", renderLike)
    // Step 4 - Comment Feature (Frontend)
    document.getElementById("comment_form").addEventListener("submit", renderForm)
}

// Step 3 - Like Feature (Backend)
const renderLike = (event) => {
    const likeCount = document.getElementById("likes")    
    likeCount.innerText = parseInt(likeCount.innerText) + 1
    
    fetch(likeURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({image_id: 4871})
    })
    .then(response => response.json())
}

// Step 4 - Comment Feature (Frontend)
const renderForm = (event) => {
    event.preventDefault()
    const commentsUl = document.getElementById("comments")
    
    const commentLi = document.createElement("li")
    commentLi.textContent = event.target["comment"].value
    
    commentsUl.append(commentLi)
