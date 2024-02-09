import axios from "axios";
import Swal from "sweetalert2";

export const showAlert = (msj, icon) => {
  Swal.fire({
    title: msj,
    icon: icon,
    buttonsStyling: true,
  });
};

export const sendRequest = async (method, params, url) => {
  let res;
  await axios({ method: method, url: url, data: params })
    .then((response) => {
      (res = response.data),
        method != "GET"
          ? showAlert("Operación realizada con éxito", "success")
          : "";
          setTimeout(() => {
            // window.location.reload();
          }, 2000);
    })
    .catch((error) => {
      let desc = "";
      res = error.response.data;
      error.response.data.error.map((err) => {
        desc = desc + " " + err;
      });
      showAlert(desc, "error");
    });
  return res;
};

export const confirmation = async (name, url, redir) => {
    const alert = Swal.mixin({buttonsStyling: true});
    alert
      .fire({
        title: `¿Estás seguro que deseas eliminar ${name}?`,
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        icon: "warning",
      })
      .then((result) => {
        if (result.isConfirmed) {
          sendRequest("DELETE", "", url);
          setTimeout(() => {
            // window.location.href = redir;
          }, 2000);
        }
      });
};

export default showAlert;
