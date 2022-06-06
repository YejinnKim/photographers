function imageUpload(){
    const uploadFile = new FormData();
    var imgCode = new Date().getTime().toString(36);
    var src = document.getElementById("uploadImages");
    const photos = document.querySelector('input[type="file"][multiple]');
    var rm = document.getElementById("main_img");
    if (rm.childNodes[1])
        rm.removeChild(rm.childNodes[1]);

    for (let i = 0; i < photos.files.length; i++) {
        uploadFile.append('uploadFile', photos.files[i])
    }

    uploadFile.append('imageCode', imgCode);

    console.log(uploadFile);

    fetch('/mypage/imageUpload', {
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
            console.log(result.fileInfo);
        }
    })
    .catch((error) => {
    console.error('실패:', error);
    });
}

function updateUser() {
    var userId = document.getElementById("user_id").value;
    var userPw = document.getElementById("password").value;
    var userPw2 = document.getElementById("password_check").value;
    var userMail = document.getElementById("user_email").value;
    var userName = document.getElementById("user_name").value;
    var userintro
    if (document.getElementById("message"))
        userintro = document.getElementById("message").value;
    
    if(!userId || !userPw || !userPw2 || !userName || !userMail){
        alert('모든 값을 입력해주세요.');
        return false;
    }
    if(userPw != userPw2){
        alert('비밀번호와 비밀번호 확인값이 맞지 않습니다.');
        return false;
    }

    fetch(`/mypage`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            user_pw: userPw,
            user_name: userName,
            user_email: userMail,
            user_intro: userintro
        })
    }).then((res) => {
        console.log(res)
        if (res.status == 200) {
            location.href = "/mypage";
        }else{
            return res.json();
        }
    }).then((data) => {
        alert(data.message);
    })
}