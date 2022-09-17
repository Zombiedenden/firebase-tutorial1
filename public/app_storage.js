document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
});

function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const horseRef = storageRef.child('horse.jpg');
    const file = files.item(0);
    const task = horseRef.put(file)

    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log("File available at", downloadURL);
        const url = downloadURL;
        document.querySelector("#imgUpload").setAttribute("src", url);
      });
};