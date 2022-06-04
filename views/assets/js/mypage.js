function checkPw() {

    if(document.getElementById('regpass').value !='' && document.getElementById('regpass2').value!=''){
        if(document.getElementById('regpass').value==document.getElementById('regpass2').value){
            document.getElementById('pwstat').innerHTML= "비밀번호가 일치합니다.";
            document.getElementById('pwstat').style.color='#b5b5ff';
            document.getElementById('pwstat').style.display='block';
        }
        else{
            document.getElementById('pwstat').innerHTML="비밀번호가 일치하지 않습니다.";
            document.getElementById('pwstat').style.color='#ff8f8f';
            document.getElementById('pwstat').style.display='block';
        }
    }
}
	
	/* 로그인 이벤트 */
	const login = () => {

        var userId = document.getElementById("logid").value;
        var userPw = document.getElementById("logpass").value;

        let response = fetch(`/login/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            user_pw: userPw
        })
    }).then((res) => {
        if (res.status === 200) {
            location.href = "/";
        }else{
            return res.json();
        }
    }).then((data) => {
        alert(data.message);
    })
};

/* 회원가입 이벤트 */
const signup = () => {

    var userId = document.getElementById("regid").value;
    var userPw = document.getElementById("regpass").value;
    var userPw2 = document.getElementById("regpass2").value;
    var userMail = document.getElementById("regmail").value;
    var userName = document.getElementById("regname").value;
    
    if(!userId || !userPw || !userPw2 || !userName || !userMail ){
        alert('모든 값을 입력해주세요.');
        return false;
    }

    if(userPw !='' && userPw2 !=''){
        if(userPw != userPw2){
            alert('비밀번호와 비밀번호 확인 부분이 일치하지 않습니다.');
            return false;
        }
    }

    if(userPw != userPw2){
        alert('비밀번호와 비밀번호 확인값이 맞지 않습니다.');
        return false;
    }

    fetch(`/login/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            user_pw: userPw,
            user_name: userName,
            user_email: userMail
        })
    // if(response.ok){
    //     location.href = "/users/login";
    // }else{
    //     alert('회원가입에 실패하였습니다.');
    // }
    }).then((res) => {
        console.log(res)
        if (res.status == 200) {
            location.href = "/login";
        }else{
            return res.json();
        }
    }).then((data) => {
        alert(data.message);
    })
};
