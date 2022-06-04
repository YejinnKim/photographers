
function imageUpload(){
    const uploadFile = new FormData();
    // const photos = document.querySelector('#uploadFile');
    var imgCode = new Date().getTime().toString(36);
    const photos = document.querySelector('input[type="file"][multiple]');
   
    // uploadFile.append(`uploadFile`, photos.files);

    for (let i = 0; i < photos.files.length; i++) {
        uploadFile.append('uploadFile', photos.files[i])
    }

    uploadFile.append('imageCode', imgCode);

    console.log(uploadFile);
    // console.log(uploadFile);
    // FormData의 값 확인  
    // for (var value of uploadFile.values()) {
    //     console.log(value);
    // }

    fetch('/photos/write/imageUpload', {
    method: 'POST',
    body: uploadFile,
    })
    .then((response) => response.json())
    .then((result) => {
    console.log('성공:', result);
    })
    .catch((error) => {
    console.error('실패:', error);
    });
}
