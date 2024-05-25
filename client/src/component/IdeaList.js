import IdeasApi from "../services/ideasApi";
class IdeaList {
  constructor() {
    this._ideaList = document.querySelector("#idea-list");

    this._ideas = [];
    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  addEventListeners() {
    this._ideaList.addEventListener("click", (e) => {
      if(e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
        //console.log(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      //console.log(this._ideas);
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      //delete idea from server
      const res = await IdeasApi.deleteIdea(ideaId);

      //delete idea from ideaList
      //this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You cannot delete the resource");
      //console.log(error);
    }
  }

  addIdeasToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getClassTag(tag) {
    tag = tag.toLowerCase();
    let tagclass = "";
    if (this._validTags.has(tag)) {
      tagclass = `tag-${tag}`;
    } else {
      tagclass = "";
    }
    return tagclass;
  }

  render() {
    this._ideaList.innerHTML = this._ideas
      .map((idea) => {
        const tagclass = this.getClassTag(idea.tag);
        const deleteBtn = idea.username === localStorage.getItem("username") ? `<button class="delete"><i class="fas fa-times"></i></button>` : "";
        return `
        <div class="card" data-id="${idea._id}">
      ${deleteBtn}
      <h3>
        ${idea.text}
      </h3>
      <p class="tag ${tagclass}">${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>`;
      })
      .join("");
    this.addEventListeners();
  }
}

export default IdeaList;
