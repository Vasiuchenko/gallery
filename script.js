window.onload =() => {
    console.log('app started');

    fetcH();
};

function fetcH() {
    let header = document.querySelector('.gallery__header'),
        content = document.querySelector('.gallery__content');

    for (let i = 1; i < 11; i++) {
        let promise, obj;

        promise = fetch(`https://jsonplaceholder.typicode.com/photos/${i}/`, {
            method: "GET",
            headers: { "Content-type": "application/json;charset=UTF-8" }
        })
        promise
            .then(res => res.json())
            .then(json => {
                obj = new Create(json),
                    obj.createDOM(header,content);
            })
            .catch(res => {
                console.error(res);
            });
    }
}

class Create {
    constructor(data) {
        this.render(data)
    }

    render(data) {
        for(let key in data) {
            this[key] = data[key];
        }
    }
    createDOM(elemHeader, elemContent) {
        let div = document.createElement('div'),
            title = document.createElement('p'),
            prewImg = document.createElement('img'),
            img = document.createElement('img');
            
        title.innerText = this.title;
        prewImg.setAttribute('src', `${this.thumbnailUrl}`);
        div.appendChild(title);
        div.appendChild(prewImg);
        elemHeader.appendChild(div);
        div.addEventListener('click', e => {
            elemContent.innerHTML = `<img src='${this.url}'/>`;
        })
        
    }
}