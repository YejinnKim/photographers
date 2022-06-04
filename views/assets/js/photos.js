
function imageUpload(){
    const formData = new FormData();
    const photos = document.querySelector('#uploadFile');
    var imgCode = new Date().getTime().toString(36);

    // console.log(imgCode);

    formData.append('imageCode', imgCode);
    for (let i = 0; i < photos.files.length; i++) {
        // console.log(photos.files[i]);
        formData.append(`photos_` + i, photos.files[i]);
    }

    // FormData의 값 확인  
    for (var value of formData.values()) {
        console.log(value);
    }

    fetch('/photos/write/imageUpload', {
    method: 'POST',
    body: formData,
    })
    .then((response) => response.json())
    .then((result) => {
    console.log('성공:', result);
    })
    .catch((error) => {
    console.error('실패:', error);
    });
}
