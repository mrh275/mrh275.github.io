const toastBtn = document.querySelector(".show-toast"),
  toast = document.querySelector(".toast"),
  toastClose = document.querySelector(".toast-close"),
  toastProgress = document.querySelector(".toast-progress");

function sendMessage() {
  let data = {
    from_name: document.querySelector("#name").value,
    email_id: document.querySelector("#email").value,
    message: document.querySelector("#message").value,
  };

  let emailValidate = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (data.from_name.length < 3 || data.email_id === "" || data.message.length < 10) {
    if (data.from_name.length < 3) {
      document.querySelector(".invalid-name").innerHTML = "Please enter your name";
    } else {
      document.querySelector(".invalid-name").innerHTML = "";
    }
    if (data.email_id.match(emailValidate) == null) {
      document.querySelector(".invalid-email").innerHTML = "Please enter a valid email";
    } else {
      document.querySelector(".invalid-email").innerHTML = "";
    }
    if (data.message.length < 10) {
      document.querySelector(".invalid-message").innerHTML = "Please enter your message";
    } else {
      document.querySelector(".invalid-message").innerHTML = "";
    }
  } else {
    document.querySelector(".btn-send").innerHTML = `<i class="fa fa-spinner loading-send"></i>&nbsp; Sending...`;
    document.querySelector(".invalid-name").innerHTML = "";
    document.querySelector(".invalid-email").innerHTML = "";
    document.querySelector(".invalid-message").innerHTML = "";

    // Send message to gmail
    emailjs.send("service_zw3qqrg", "template_wsm67bd", data).then(function (res) {
      toast.classList.add("toast-active");
      toastProgress.classList.add("active");

      setTimeout(() => {
        toast.classList.remove("toast-active");
      }, 5000);

      setTimeout(() => {
        toastProgress.classList.remove("active");
      }, 5300);

      document.querySelector(".btn-send").innerHTML = `<i class="bx bx-paper-plane mr-1"></i>&nbsp; Send Message`;
      document.querySelector("#name").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#message").value = "";
    });
  }
}

toastClose.addEventListener("click", function () {
  toast.classList.remove("toast-active");
  setTimeout(() => {
    toastProgress.classList.remove("active");
  }, 300);
});
