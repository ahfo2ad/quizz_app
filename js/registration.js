window.addEventListener('load', function () {

    // select all inputs 
    txtusername = this.document.getElementById('txtusername');
    // txtusername.focus();
    spanusername = this.document.getElementById('spanusername');
    txtusername.addEventListener('blur', function () {
        /*console.log("Blure user Name");*/
        if (!isuserNameValid(txtusername.value)) {
            txtusername.focus();
            txtusername.select();
            spanusername.style.display = 'block';
            // display span 
        } else {
            spanusername.style.display = 'none';
        }
    });//end of blure for username
    // select all spans 

    // check userpass
    txtuserpass = this.document.getElementById('txtuserpass');
    spanuserpass = this.document.getElementById('spanuserpass');
    txtuserpass.addEventListener('blur', function () {
        if (!isuserpassValid(txtuserpass.value)) {
            txtuserpass.focus();
            txtuserpass.select();
            spanuserpass.style.display = "block";
        } else {
            spanuserpass.style.display = "none";
        }
    });

    //check confirm password
    txtuserpass2 = this.document.getElementById('txtuserpass2');
    spanuserpass2 = this.document.getElementById('spanuserpass2');
    txtuserpass2.addEventListener("blur", function () {
        if (txtuserpass2.value !== txtuserpass.value) {
            txtuserpass2.focus();
            txtuserpass2.select();
            spanuserpass2.style.display = "block";
        }
        else {
            spanuserpass2.style.display = "none";
        }
    });

    // check useremail
    txtuseremail = this.document.getElementById('txtuseremail');
    spanuseremail = this.document.getElementById('spanuseremail');
    txtuseremail.addEventListener('blur', function () {
        if (!isuseremailvalid(txtuseremail.value)) {
            txtuseremail.focus();
            txtuseremail.select();
            spanuseremail.style.display = "block";
        } else {
            spanuseremail.style.display = "none";
        }

    });

    // check gender
    // let genderSelected = document.querySelectorAll( 'input[name="gender"]');
    let genderSelected = document.getElementsByName('gender');
    console.log(genderSelected);
    spanusergender = this.document.getElementById('spanusergender');
    // genderSelected.addEventListener('change', function () {
    //     if(genderSelected[0].checked == false && genderSelected[1].checked == false) {
    //         spanusergender.style.display = "block";
    //     }
    //     else {
    //         spanusergender.style.display = "none";
    //     }
    // });

    // register submit event
    this.document.forms[0].addEventListener('submit', function (data) {
        
        if (!(isuserNameValid(txtusername.value) && isuserpassValid(txtuserpass.value) 
            && isuseremailvalid(txtuseremail.value) && isuserpassValid(txtuserpass2.value) 
            && txtuserpass.value === txtuserpass2.value && genderSelected[0].checked == true || genderSelected[1].checked == true)) {

            // preven default 
            data.preventDefault();

                // showing spans on submitting
            if(spanusername.style.display == 'block') {
                spanusername.style.display = 'none';
            }
            else {
                spanusername.style.display = 'block';
            }
            if(spanuserpass.style.display == 'none') {
                spanuserpass.style.display = 'block';
            }
            else {
                spanuserpass.style.display = 'block';
            }
            if(spanuserpass2.style.display == 'none') {
                spanuserpass2.style.display = 'block';
            }
            else {
                spanuserpass2.style.display = 'block';
            }
            if(spanuseremail.style.display == 'none') {
                spanuseremail.style.display = 'block';
            }
            else {
                spanuseremail.style.display = 'block';
            }
            if(genderSelected[0].checked == false && genderSelected[1].checked == false) {
                spanusergender.style.display = 'block';
            }
            else if (genderSelected[0].checked == true || genderSelected[1].checked == true) {
                spanusergender.style.display = 'none';
            }
            else 
            {
                spanusergender.style.display = 'none';
            }
            // else {
            //     spanusername.style.display = 'block';
            // }
        }


    });//end of submit

    // register reset event
    this.document.forms[0].addEventListener('reset', function (data) {
        if (!confirm("Are You Sure To Clear Form ?")) {
            data.preventDefault();
        }

    });//end of reset


});//end of load
function isuserNameValid(un) {
    // pattern : letters small or capital length :  4,8
    var usernamepattern = /^[a-zA-Z]{4,8}$/;
    return un.match(usernamepattern);// null | object
}
function isuserpassValid(up) {
    // pattern : letters small or capital length :  4,8
    //var userpasswordpattern = /^[1-9]{5,7}$/;
    //return up.match(userpasswordpattern);// null | object
    return up.match(/^[1-9]{5,7}$/);
}
function isuseremailvalid(ue) {
    return ue.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
}