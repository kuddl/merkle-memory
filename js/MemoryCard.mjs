export default class MemoryCard extends HTMLElement {
  static get observedAttributes() {
    return ["image", "backside-image", "open", "size"];
  }

  constructor() {
    super();

    // Get attrs
    const backImage =
      this.getAttribute("backside-image") || "img/backside/backside1.svg";
    const image = this.getAttribute("image");
    const isOpen = this.hasAttribute("open");
    const size = this.getAttribute("size") || "150px";

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create child elements
    const card = document.createElement("div");
    card.setAttribute("id", "card");
    card.setAttribute("class", "memory-card");

    const board = document.createElement("div");
    board.setAttribute("id", "board");
    board.setAttribute("class", "flip-card");
    if (isOpen) {
      board.classList.add("open");
    }

    const front = document.createElement("div");
    front.setAttribute("id", "front");
    front.setAttribute("class", "flip-card__front");

    const back = document.createElement("div");
    back.setAttribute("id", "back");
    back.setAttribute("class", "flip-card__back");

    const style = document.createElement("style");
    style.textContent = `
      .memory-card {
        display: block;
        min-width: 150px;
        min-height: 150px;
        width: ${size};
        height: ${size};
        perspective: 1000px;
      }

      .flip-card {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }

      .memory-card:hover .flip-card,
      .open {
        transform: rotateY(180deg);
      }

      .flip-card__front, .flip-card__back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
      }

      .flip-card__front {
        background-color: dodgerblue;
        background-image: url(${image});
        background-position: center;
        background-size: cover;
        transform: rotateY(180deg);
      }

      .flip-card__back {
        background-image: url(${backImage});
        background-position: center;
        background-size: cover;
      }
      `;

    // Assemble MemoryCard
    shadow.appendChild(style);
    shadow.appendChild(card);
    card.appendChild(board);
    board.appendChild(front);
    board.appendChild(back);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "image":
        this.shadowRoot.getElementById(
          "front"
        ).style.backgroundImage = `url(${newValue})`;
        break;
      case "backside-image":
        this.shadowRoot.getElementById(
          "back"
        ).style.backgroundImage = `url(${newValue})`;
        break;
      case "size":
        this.shadowRoot.getElementById("card").style.width = newValue;
        this.shadowRoot.getElementById("card").style.height = newValue;
        break;
      case "open":
        if (newValue !== null) {
          this.shadowRoot.getElementById("board").classList.add("open");
        } else {
          this.shadowRoot.getElementById("board").classList.remove("open");
        }
        break;
      default:
        break;
    }
  }
}

customElements.define("memory-card", MemoryCard);
