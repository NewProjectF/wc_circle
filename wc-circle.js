// Crea una clase para el elemento titulo
class circle extends HTMLElement {

    constructor() {

        // Llamar siempre a super primero en el constructor
        super();

        // Crear una shadow root
        var shadowRoot = this.attachShadow({ mode: 'open' });


        // -- CREACION DE ELEMENTOS --
        // Crear seccion
        var section = document.createElement('section');
        section.setAttribute('id', 'wc_circle');
        // Crear div
        var div = document.createElement('div');
        div.setAttribute('class', 'circle');
        // Crear video
        var video = document.createElement('video');
        video.src = "wc_circle/utiles/video.mp4";
        video.autoplay = true;
        video.muted = true;

        section.innerHTML = '<svg><filter id="wavy"><feTurbulence x="0" y="0" baseFrequency="0.009" numOctaves="5" seed="2"><animate attributeName="baseFrequency" dur="60s" values="0.02;0.005;0.02" repeatCount="indefinite"></animate></feTurbulence><feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap></filter></svg>';


        // -- INSERCCION DE ELEMENTOS --
        div.appendChild(video);
        section.appendChild(div);


        // -- CREACION DE ESTILOS EXTERNOS --
        // Aplicar estilos reset externos al shadow dom
        const linkElemReset = document.createElement('link');
        linkElemReset.setAttribute('rel', 'stylesheet');
        linkElemReset.setAttribute('href', 'wc_circle/css/estilos_por_defecto.css');
        // Aplicar estilos personalizados externos al shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'wc_circle/css/estilos.css');


        // adjuntar los elementos creados al shadow DOM
        shadowRoot.appendChild(linkElemReset);
        shadowRoot.appendChild(linkElem);
        shadowRoot.appendChild(section);

    }

    // Se ejecuta cada vez que el elemento se agrega al DOM
    connectedCallback() {

        // Nombre por defecto en caso de no tener
        if (!this.hasAttribute('video')) { this.video = "wc_circle/utiles/video.mp4"; }
        if (!this.hasAttribute('background')) { this.background = "black"; }
        if (!this.hasAttribute('height')) { this.height = "100"; }
        if (!this.hasAttribute('width')) { this.width = "100"; }
        if (!this.hasAttribute('wc-border')) { this.wcBorder = "20"; }
        if (!this.hasAttribute('position-fire')) { this.positionFire = "30"; }

    }

    // Se especifican los atributos observados para que "attributeChangedCallback" funcione
    static get observedAttributes() {
        return ['video', 'background', 'height', 'width', 'wc-border', 'position-fire'];
    }

    // Se ejecuta cada vez que uno de los atributos del elemento cambia de alguna manera
    // Produce cambios dependiendo de los atributos utilizados en la etiqueta
    attributeChangedCallback(attrName, oldVal, newVal) {

        var shadowRoot = this.shadowRoot;

        switch (attrName) {
            case "video":
                var video = shadowRoot.querySelector('video');
                video.src = newVal;
                break;
            case "background":
                shadowRoot.getElementById('wc_circle').style.background = newVal;
                break;
            case "height":
                shadowRoot.getElementById('wc_circle').style.minHeight = newVal + "vh";
                break;
            case "width":
                shadowRoot.getElementById('wc_circle').style.width = newVal + "em";
                break;
            case "wc-border":
                var border = shadowRoot.querySelector(".circle");
                border.style.setProperty("--size-border", newVal + "px solid #fff");
                break;
            case "position-fire":
                var positionFire = shadowRoot.querySelector("svg filter feDisplacementMap");
                positionFire.setAttribute('scale', newVal);
                break;
        }

    }

    //Getter
    get video() {
        return this.hasAttribute('video');
    }
    get background() {
        return this.hasAttribute('background');
    }
    get height() {
        return this.hasAttribute('height');
    }
    get width() {
        return this.hasAttribute('width');
    }
    get wcBorder() {
        return this.hasAttribute('wc-border');
    }
    get positionFire() {
        return this.hasAttribute('position-fire');
    }

    //Setter
    set video(val) {
        if (val) {
            this.setAttribute('video', val);
        } else {
            this.removeAttribute('video');
        }
    }
    set background(val) {
        if (val) {
            this.setAttribute('background', val);
        } else {
            this.removeAttribute('background');
        }
    }
    set height(val) {
        if (val) {
            this.setAttribute('height', val);
        } else {
            this.removeAttribute('height');
        }
    }
    set width(val) {
        if (val) {
            this.setAttribute('width', val);
        } else {
            this.removeAttribute('width');
        }
    }
    set wcBorder(val) {
        if (val) {
            this.setAttribute('wc-border', val);
        } else {
            this.removeAttribute('wc-border');
        }
    }
    set positionFire(val) {
        if (val) {
            this.setAttribute('position-fire', val);
        } else {
            this.removeAttribute('position-fire');
        }
    }

}

// Definir el nuevo elemento
customElements.define("wc-circle", circle);