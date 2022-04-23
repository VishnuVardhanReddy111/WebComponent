class BlogModal extends HTMLElement{
    static get observedAttributes(){
        return ['open','title', 'subtitle', 'synopsis', 'cover'];
    }
    constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.close = new CustomEvent('close',{
        bubbles: true,
        cancelable: false,
        detail: {
            open: false
        }
    })
}
connectedCallback(){
    this.render();
}
attributeChangedCallback(attrName, oldValue, newValue){
    if(attrName !== 'open' && oldValue !== newValue){
        this[attrName] = newValue;
    }else if(attrName === 'open'){
        this[attrName] = this.hasAttribute(attrName);
    }
    this.render();
}

render(){
    const {shadowRoot} = this;
    const templateNode = document.getElementById('modal-template');
    const loading = [
        {transform: 'rotate(0deg)'},
        {transform: 'rotate(360deg)'},
    ];
    const loadingTiming = {
        duration: 3000,
        iterations: 50
    }
    shadowRoot.innerHTML = '';
    if(templateNode){
        const instance = document.importNode(templateNode.content, true);
        const close = instance.querySelector('.close');
        const wrapper = instance.querySelector('.wrapper');
        const title =  instance.querySelector('.title');
        const subtitle =  instance.querySelector('.subtitle');
        const cover =  instance.querySelector('.cover');
        const synopsis =  instance.querySelector('.synopsis');
        const loader = instance.querySelector('.loader');
        const loadAnimation = loader.animate(loading, loadingTiming);
        const closeEvent = this.close;
        close.onclick = function(){
            this.dispatchEvent(closeEvent);
        }
        shadowRoot.addEventListener('close', () => {
            wrapper.classList.remove('open');
            this['open'] = false;
        })
        if(this['open'] == true){
            instance.querySelector('.wrapper').classList.add('open');
        }
        loadAnimation.play();
        let blogModal = this;
        setTimeout(() => {
            loadAnimation.finish();
            loader.classList.add('close');
            title.innerHTML = blogModal['title'];
            subtitle.innerHTML = blogModal['subtitle'];
            cover.src = blogModal['cover'];
            synopsis.innerHTML = blogModal['synopsis'];
        }, 3000);
       
        shadowRoot.appendChild(instance);
    }
    else{
        shadowRoot.innerHTML = '<p>Shadow Root Failed. Please Try later.</p>';
    }
}
}
customElements.define('blog-modal', BlogModal);