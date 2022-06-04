
function imageUpload(){
    const uploadFile = new FormData();
    var imgCode = new Date().getTime().toString(36);
    var src = document.getElementById("uploadImages");
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
        if(result.message === "success"){
            for(var i=0; i < result.fileInfo.length; i++){
                var img = document.createElement("img"); 
                img.src = "/img/uploadImages/" + result.fileInfo[i].filename;
                src.appendChild(img);
            }

            document.getElementById('img_code').value = imgCode;
            console.log(result.fileInfo);
        }
    })
    .catch((error) => {
    console.error('실패:', error);
    });
}


function writePhotos(){
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month  + '-' + day;   
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    var timeString = hours + ':' + minutes  + ':' + seconds;

    console.log(dateString);
    var category = document.getElementById("category");
    category = category.options[category.selectedIndex].value;

    var img_code = document.getElementById("img_code").value;
    var subject = document.getElementById("subject").value;
    var contents = document.getElementById("contents").value;

    var regdate = dateString + " " + timeString;
    console.log(regdate);
    
    if(!category || !subject || !contents){
        alert('모든 값을 입력해주세요.');
        return false;
    }

    if(!img_code){
        alert('사진을 선택해주세요.');
        return false;
    }

    fetch(`/photos/write`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            category: category,
            img_code: img_code,
            subject: subject,
            contents: contents,
            regdate: regdate
        })
        }).then((res) => {
            console.log(res)
            if (res.status == 200) {
                alert('등록되었습니다.');
                location.href = "/photos";
            }else{
                return res.json();
            }
        }).then((data) => {
            alert(data.message);
        })
}