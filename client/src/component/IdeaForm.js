import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";
class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._ideaList = new IdeaList();
  }

  addEventListener() {
    this._ideaForm.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !this._ideaForm.elements.text.value ||
        !this._ideaForm.elements.tag.value ||
        !this._ideaForm.elements.username.value
      ) {
        alert("Please enter all the fields");
        return;
      }

      //save username local storage
      localStorage.setItem("username", this._ideaForm.elements.username.value);

      const idea = {
        text: this._ideaForm.elements.text.value,
        tag: this._ideaForm.elements.tag.value,
        username: this._ideaForm.elements.username.value,
      };

      //adding new idea to the server
      const newidea = await IdeasApi.createIdeas(idea);

      //adding idea to the list
      this._ideaList.addIdeasToList(newidea.data.data);

      //clear fields
      this._ideaForm.elements.text.value = "";
      this._ideaForm.elements.tag.value = "";
      this._ideaForm.elements.username.value = "";
      
      //to autofill the username
      this.render();

      document.dispatchEvent(new Event("closemodal"));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    this._formModal.innerHTML = `<form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value = "${localStorage.getItem("username")? localStorage.getItem("username") : ""}"/>
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>`;

    this._ideaForm = document.querySelector("#idea-form");
    this.addEventListener();
  }
}

export default IdeaForm;
