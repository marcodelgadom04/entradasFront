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
  const config = {
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method !== "DELETE") {
    config.data = params;
  }

  await axios(config)
    .then((response) => {
      res = response.data;
      if (method !== "GET") {
        showAlert("Operación realizada con éxito", "success");
      }
      setTimeout(() => {
        // window.location.reload();
      }, 2000);
    })
    .catch((error) => {
      let desc = "";
      res = error.response.data;
      if (error.response.data.error) {
        error.response.data.error.map((err) => {
          desc = desc + " " + err;
        });
      }
      showAlert(desc, "error");
    });
  return res;
};

export const confirmation = async (name, url, redir) => {
  const alert = Swal.mixin({ buttonsStyling: true });
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
        sendRequest("DELETE", "", url)
          .then((response) => {
            showAlert("Se elimino correctamente", response);
            // Maneja la respuesta aquí. Por ejemplo, puedes redirigir al usuario:
            setTimeout(() => {
                window.location.href = redir;
            }, 2000);
          })
          .catch((error) => {
            // Maneja los errores aquí. Por ejemplo, puedes mostrar una alerta:
            showAlert("Ocurrió un error al eliminar la entrada", error);
          });
      }
    });
};

export default showAlert;
