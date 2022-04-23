// const titles = [
//     {title: 'The Five Orange Pips', subtitle: 'A delivery of innocous letter followed by death'},
//     {title: 'A Study in Scarlet', subtitle: 'Dr. John Watson meets Mr. Sherlock Holmes'},
//     {title: 'The Hound of the Baskervilles', subtitle: 'A mysterious hound terrifies a town'}
// ]

class BlogCard extends HTMLElement{
    static get observedAttributes(){
        return ['title', 'subtitle', 'cover'];
    }
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback(){
        this.render();
    }

   attributeChangedCallback(attrName, oldValue, newValue){
    if(oldValue !== newValue){
        this[attrName] = newValue;
    }
   }
    render(){
        const {shadowRoot} = this;
        const templateNode = document.getElementById('card-template');

        shadowRoot.innerHTML='';
        if(templateNode){
           const instance = document.importNode(templateNode.content, true);
           instance.querySelector('.title').innerHTML = this['title'];
           instance.querySelector('.subtitle').innerHTML = this['subtitle'];
           instance.querySelector('.cover').src = this['cover'];
           shadowRoot.appendChild(instance);
        }
        else{
            shadowRoot.innerHTML = '<p>Shadow Root Failed. Please Try later.</p>';
        }
    }
}
customElements.define('blog-card', BlogCard);

debugger;
document.querySelector("blog-card").remove();