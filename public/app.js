document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    // console.log(app);

    // const db = firebase.firestore();
    // const myPost = db.collection('posts').doc('firstpost');
    // myPost.onSnapshot(doc => {
    //         const data = doc.data();
    //         document.write(data.title + `<br>`);
    //         document.write(data.createdAt);
    //     });

    // myPost.onSnapshot(doc => {
    //         const data = doc.data();
    //         document.querySelector('#title').innerHTML = data.title;
    //     });

    const db = firebase.firestore();
    const productsRef = db.collection('products');
    const query = productsRef.orderBy('price', 'desc')
        .where('price', '>', 10)
        .limit(10);

    query.get()
        .then(products => {
            products.forEach(doc => {
                data = doc.data();
                document.write(`${data.name} at $${data.price} <br>`);
            })
        });
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user);
        })
        .catch(console.log);
}

// function updatePost(e) {
//     const db = firebase.firestore();
//     const myPost = db.collection('posts').doc('firstpost');
//     myPost.update({ title: e.target.value });
// }