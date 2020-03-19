
  let imageId = 4876

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

firstrender()

function firstrender(){
fetch(imageURL)
  .then(response => response.json())
  .then(renderOneImage)
}

imageCont = document.querySelector("#image_card")
likeSlot = imageCont.querySelector("#likes")


function renderOneImage(image){
  imageSlot = imageCont.querySelector("#image")
  imageSlot.src = image.url  

  titleSlot = imageCont.querySelector("#name")
  titleSlot.textContent = image.name

  likeSlot.textContent = image.like_count

  renderAllComments(image)

}
commentSlot = imageCont.querySelector("#comments")

function renderAllComments(image){
  const comments = [...image.comments]
  commentextractor(comments)
  function commentextractor(comments) {
    for (var i = 0; i < comments.length;i++){
      outerLi = document.createElement("li")
      outerLi.textContent = (comments[i].content)
      commentSlot.append(outerLi)
    }
  }

}

const likebtn = document.querySelector("#like_button")
likebtn.addEventListener("click",addLike)



function addLike(event){
  event.preventDefault()
  let newlikes = parseInt(likeSlot.textContent) + 1
  likeSlot.textContent = newlikes

    fetch(`https://randopic.herokuapp.com/likes`, {
      method: `POST`,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_id: imageId,
        like_count: newlikes}),
    })

}

Form = document.querySelector("#comment_form")
document.addEventListener("submit",handleFormSubmit)

function handleFormSubmit(event){
  event.preventDefault()

  const newcom = Form["comment"].value
  newLi = document.createElement("li")
  newLi.textContent = newcom

  commentSlot.append(newLi)

  Form.reset()

  fetch(`https://randopic.herokuapp.com/comments`, {
      method: `POST`,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_id: imageId,
        content: newcom})
    })
    renderAllComments
}

