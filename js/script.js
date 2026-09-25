$(document).ready(function () {
  $(".reveal").each(function (i) {
    $(this).delay(i * 120).animate({ opacity: 1 }, 500).css("transform", "translateY(0)");
  });

  const form = $("#contactForm");
  const mensaje = $("#mensaje");
  const contador = $("#contador");
  const medioFeedback = $("#medioFeedback");
  const alerta = $("#alerta");

  mensaje.on("input", function () { contador.text($(this).val().length); });

  form.on("submit", function (e) {
    e.preventDefault();
    let valido = true;
    const nombre = $("#nombre"), correo = $("#correo"), telefono = $("#telefono");
    const asunto = $("#asunto"), terminos = $("#terminos");

    function validarCampo(elemento, condicion) {
      elemento.toggleClass("is-invalid", !condicion).toggleClass("is-valid", condicion);
      if (!condicion) valido = false;
    }

    validarCampo(nombre, nombre[0].checkValidity());
    validarCampo(correo, correo[0].checkValidity());
    validarCampo(telefono, telefono.val().trim() === "" || telefono[0].checkValidity());
    validarCampo(asunto, asunto[0].checkValidity());
    validarCampo(mensaje, mensaje[0].checkValidity());
    validarCampo(terminos, terminos[0].checkValidity());

    const medioSeleccionado = $('input[name="medio"]:checked').length > 0;
    medioFeedback.prop("hidden", medioSeleccionado);
    $('input[name="medio"]').toggleClass("is-invalid", !medioSeleccionado);
    if (!medioSeleccionado) valido = false;

    if (valido) {
      alerta.removeClass("d-none alert-danger").addClass("alert-success").html('<i class="bi bi-check-circle me-2"></i><strong>Formulario validado.</strong> Tus datos son correctos y están listos para ser enviados.');
    } else {
      alerta.removeClass("d-none alert-success").addClass("alert-danger").html('<i class="bi bi-exclamation-triangle me-2"></i><strong>Revisa el formulario.</strong> Corrige los campos marcados antes de continuar.');
    }
    alerta.hide().fadeIn();
  });

  form.on("input change", "input, textarea, select", function () {
    if (this.checkValidity()) $(this).removeClass("is-invalid").addClass("is-valid");
    else $(this).removeClass("is-valid");
  });

  $('input[name="medio"]').on("change", function () {
    medioFeedback.prop("hidden", true);
    $('input[name="medio"]').removeClass("is-invalid").addClass("is-valid");
  });

  form.on("reset", function () {
    setTimeout(function () {
      $(".is-valid,.is-invalid").removeClass("is-valid is-invalid");
      $("#alerta").addClass("d-none").text("");
      contador.text("0");
      medioFeedback.prop("hidden", true);
    }, 0);
  });
});