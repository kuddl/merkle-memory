export default class MemoryCard extends HTMLElement {
  static get observedAttributes() {
    return ["image", "backside-image", "open"];
  }

  constructor() {
    super();

    const backImage =
      this.getAttribute("backside-image") || "images/logocard.jpg";
    const image = this.getAttribute("image");
    const open = this.hasAttribute("open");
    const size = this.getAttribute("size") || "300px";

    const shadow = this.attachShadow({ mode: "open" });
    const card = document.createElement("div");
    card.setAttribute("class", "memory-card");

    const board = document.createElement("div");
    card.setAttribute("id", "board");
    board.setAttribute("class", "flip-card");
    if (open === true) {
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

        .memory-card:hover .flip-card , .open {
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
          background-image: url(${backImage});
          background-position: center;
          background-size: cover;
          color: black;
        }

        .flip-card__back {
          background-color: dodgerblue;
          background-image: url(${image});
          color: white;
          transform: rotateY(180deg);
        }
        `;

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
          "back"
        ).style.backgroundImage = `url(${newValue})`;
        break;
      case "backside-image":
        this.shadowRoot.getElementById(
          "front"
        ).style.backgroundImage = `url(${newValue})`;
        break;
      case "open":
        if (newValue === "true") {
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
