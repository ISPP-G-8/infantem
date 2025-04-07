import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const TermsConditionsModal = ({
  visible,
  onClose
}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const gs = require("../static/styles/globalStyles");

  const termsContent = `

  TÉRMINOS Y CONDICIONES LEGALES

  1. ACEPTACIÓN DE LOS TÉRMINOS
  Al acceder o utilizar la aplicación Infantem ("la App"), el usuario acepta cumplir con estos Términos y Condiciones y con nuestra Política de Privacidad. Si no está de acuerdo con alguna de las disposiciones de estos términos, debe abstenerse de usar la App.

  2. OBJETO
  Infantem es una aplicación móvil diseñada para asistir a padres y madres en el seguimiento de la alimentación, el crecimiento y los hitos de desarrollo de sus hijos. La App incluye, entre otras funcionalidades, recomendaciones de recetas personalizadas, detección de alergias e intolerancias alimentarias, un marketplace de productos recomendados, y un sistema de seguimiento de hitos del desarrollo.

  3. FUNCIONALIDADES DE LA APLICACIÓN
  3.1 Recomendaciones Personalizadas de Recetas
  La App recomienda recetas y menús basados en la edad del bebé y los alimentos que puede ir introduciendo a su dieta. Las recomendaciones se ajustan según las preferencias del usuario, incluyendo alergias o intolerancias alimentarias.

  3.2 Detección de Alergias e Intolerancias
  La aplicación proporciona un sistema de preguntas para ayudar a los padres a detectar posibles alergias o intolerancias a alimentos. En caso de sospecha de alergia o intolerancia, la App recomienda una consulta médica para confirmar el diagnóstico.

  3.3 Registro de Alimentación
  La App permite a los usuarios registrar las comidas de sus hijos, llevando un seguimiento de los alimentos introducidos y proporcionando recomendaciones adicionales basadas en la dieta del bebé.

  3.4 Marketplace
  El Marketplace de la App redirige a los usuarios a plataformas de terceros para adquirir productos recomendados, tales como alimentos o accesorios para el bebé. Los productos serán proporcionados por empresas afiliadas, y los usuarios deberán seguir sus términos y condiciones al realizar compras.

  3.5 Calendario y Recordatorios Inteligentes
  La App incluye un calendario interactivo donde los usuarios pueden marcar las recetas y objetivos de su bebé. Además, la App enviará recordatorios inteligentes sobre los hitos y las tareas relacionadas con la alimentación y el crecimiento del bebé.

  3.6 Seguimiento del Crecimiento
  La App realiza un seguimiento del crecimiento del bebé, utilizando percentiles de peso, altura y otros indicadores. Esta información no constituye un diagnóstico médico.

  3.7 Hitos de Desarrollo
  Los usuarios pueden registrar y realizar un seguimiento de los hitos del desarrollo de su bebé, como el inicio de la marcha o el habla, basándose en un sistema de hitos predefinidos y personalizables.

  3.8 Diferenciación entre Plan Básico y Premium
  La App ofrece dos modalidades de uso:

  - Plan Básico: Incluye funcionalidades esenciales como la detección de alergias, recetas generales y acceso al Marketplace.

  - Plan Premium: Amplía estas funciones con recetas personalizadas, seguimiento detallado de la salud y desarrollo del bebé, y recordatorios inteligentes. Tiene un coste de 4,99€ al mes.

  4. USO DE LA APLICACIÓN
  4.1 Requisitos de Edad
  El usuario debe ser mayor de 18 años para utilizar la App. En el caso de usuarios menores de 18 años, la App solo debe ser utilizada con la supervisión de un adulto responsable.

  4.2 Información proporcionada por el usuario
  Para utilizar ciertas funcionalidades de la App, como las recomendaciones de recetas o el seguimiento de alergias, el usuario deberá proporcionar información personal sobre su bebé, incluidos datos de salud como alergias e intolerancias alimentarias, así como información de crecimiento.

  4.3 Responsabilidad del Usuario
  El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso a la App y de toda la actividad realizada bajo su cuenta. El usuario se compromete a no utilizar la App con fines ilegales o no autorizados.

  5. PROTECCIÓN DE DATOS
  5.1 Tratamiento de Datos Personales
  En cumplimiento con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), Infantem se compromete a proteger la privacidad de los datos personales de los usuarios.

  Los datos personales proporcionados por los usuarios, como los relacionados con la salud del bebé, serán procesados exclusivamente para los fines de proporcionar las funcionalidades de la App, como el seguimiento del crecimiento, la personalización de recetas, y la detección de alergias.

  5.2 Consentimiento
  Al usar la App, el usuario consiente el tratamiento de sus datos personales conforme a nuestra Política de Privacidad. El usuario podrá retirar este consentimiento en cualquier momento, aunque la retirada del consentimiento podría impedir el uso de algunas funcionalidades de la App.

  5.3 Compartición de Datos
  La información personal proporcionada por los usuarios solo será compartida con empresas afiliadas en el contexto del Marketplace, y con profesionales médicos en el caso de que se realice una consulta a través de la App, conforme a las leyes de protección de datos vigentes.

  6. EXONERACIÓN DE RESPONSABILIDAD
  6.1 Exactitud de la Información
  La información y recomendaciones proporcionadas por la App son generadas de acuerdo con datos estadísticos y algoritmos basados en la edad y los datos de salud introducidos por el usuario. Sin embargo, Infantem no garantiza que dicha información sea exacta, completa o esté libre de errores. Las recomendaciones de recetas, el seguimiento de alergias y el crecimiento del bebé no sustituyen el consejo médico profesional.

  6.2 Limitación de Responsabilidad
  Infantem no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso de la aplicación, incluyendo, pero no limitado a, pérdidas de datos, daños a dispositivos móviles, o la incapacidad para acceder a la App.

  6.3 Salud del Bebé
  Infantem no se hace responsable de las consecuencias derivadas del uso de las recomendaciones de la App, especialmente en lo que respecta a la salud del bebé. Cualquier cambio en la dieta o el seguimiento de salud debe ser supervisado por un profesional médico.

  7. PROPIEDAD INTELECTUAL
  Todos los derechos de propiedad intelectual relacionados con la aplicación Infantem, incluyendo el código, diseño, logotipos, textos, imágenes y otros elementos, pertenecen al G8 de ISPP 2025. Está prohibida la reproducción, distribución, comunicación pública o transformación de cualquier elemento de la aplicación sin la autorización expresa de los titulares de los derechos.

  8. SUSCRIPCIÓN Y CANCELACIÓN
  8.1 Suscripción Premium
  Las suscripciones al plan Premium se realizan mensualmente y se renuevan de forma automática hasta que el usuario decida cancelarlas.

  8.2 Procedimiento de Cancelación
  La cancelación de la suscripción Premium se podrá realizar en cualquier momento a través de la opción disponible en el perfil del usuario. Cuando se cancela la suscripción, esta dejará de tener efecto cuando termine el periodo mensual ya pagado.

  8.3 Política de Reembolsos
  No existe política de reembolsos de ningún tipo para las suscripciones Premium.

  9. ACUERDO DEL NIVEL DE SERVICIO

  Este Acuerdo de Nivel de Servicio (SLA) establece los compromisos de disponibilidad, soporte y calidad del servicio proporcionado por Infantem, la aplicación inteligente para la alimentación de bebés. Este acuerdo es aplicable a todos los usuarios registrados que utilizan la aplicación.

  El objetivo de este SLA es garantizar un servicio confiable y de alta calidad, definiendo estándares de desempeño, tiempos de respuesta y mecanismos de compensación en caso de incumplimiento.

  9.1 Definiciones

  - Proveedor: Infantem y sus operadores.
  - Usuario: Cualquier persona que haya registrado una cuenta y utilice la aplicación.
  - Cliente: Cualquier persona que haya obtenido el plan Premium de la aplicación.
  - Tiempo de actividad (Uptime): Porcentaje de tiempo en el que el servicio opera correctamente.
  - Tiempo de respuesta: Tiempo máximo en el que el equipo de soporte responde a una incidencia reportada.
  - Tiempo de resolución: Periodo estimado para solucionar una incidencia reportada.
  - Mantenimiento programado: Periodos planificados de inactividad para actualizaciones o mejoras del sistema.
  - Incidencia: Cualquier problema o interrupción en el servicio que afecte a los usuarios.
  - Escalamiento: Procedimiento mediante el cual una incidencia se eleva a niveles superiores de soporte si no puede resolverse en un nivel inferior.

  9.2 Nivel de Servicio

  9.2.1 Disponibilidad

  - Infantem garantiza una disponibilidad del servicio del 99.9% mensual.
  - En caso de incumplimiento de este nivel, se aplicarán compensaciones según la sección 6.
  - No se considerará incumplimiento del SLA si la indisponibilidad se debe a fuerza mayor o causas ajenas al proveedor.
  - Infantem implementará sistemas de resolución de incidencias como plan de contingencia a los posibles fallos del sistema.

  9.2.2 Tiempos de Respuesta y Resolución

  - Crítica: Fallo total del servicio, afectando a todos los usuarios. Tiempo de Respuesta: 2 horas. Tiempo de Respuesta: 4 horas.
  - Alta: Funcionalidad esencial afectada, impactando a la mayoría de los usuarios. Tiempo de Respuesta: 4 horas. Tiempo de Respuesta: 10 horas.
  - Media: Funcionalidad no esencial afectada, afectando a algunos usuarios. Tiempo de Respuesta: 8 horas. Tiempo de Respuesta: 22 horas.
  - Baja: Errores menores o consultas generales. Tiempo de Respuesta: 24 horas. Tiempo de Respuesta: 60 horas

  Las incidencias de nivel Crítico y Alta recibirán prioridad y serán escaladas de inmediato al equipo de soporte avanzado.

  9.3 Soporte Técnico

  - El servicio de atención al cliente se hará mediante el correo de contacto especificado arriba, con los tiempos de respuesta descritos en el punto 3.2 en caso de incidencias con la app; si se trata de dudas por el uso de la app u otros asuntos, el tiempo de respuesta aproximado será de entre 24 y 48 horas.
  - Contacto: ispp.g8@gmail.com o formulario en la app.
  - El soporte se ofrece en español e inglés.
  - Los usuarios con suscripción Premium recibirán atención prioritaria.

  9.4 Mantenimiento Programado

  - Se notificará con 48 horas de anticipación.
  - Se programará en horarios de menor uso.
  - Infantem realizará mantenimientos para mejorar la seguridad, rendimiento y estabilidad del servicio.
  - Durante el mantenimiento, algunos o todos los servicios pueden estar temporalmente limitados.


  9.5 Penalizaciones y Compensaciones

  Si Infantem no cumple con el _99.9%_ de disponibilidad, los usuarios afectados podrán solicitar:

  - Usuarios Premium: Una extensión gratuita de su suscripción Premium proporcional al tiempo de inactividad.
  - Usuarios gratuitos: Un cupón de descuento para la suscripción Premium en futuras renovaciones.

  9.6 Escalamiento de Incidencias

  Si un usuario considera que una incidencia no ha sido resuelta dentro de los plazos establecidos, puede solicitar un escalamiento del problema. Los niveles de escalamiento incluyen:

  1. Soporte General.
  2. Soporte Técnico Avanzado.
  3. Equipo de Ingeniería y Desarrollo.
  4. Dirección Técnica.

  Cada nivel de escalamiento tendrá un plazo adicional de 12 horas para revisar el problema y ofrecer una solución viable.

  9.7 Exclusiones del SLA

  Este SLA no cubre interrupciones causadas por:

  - Factores fuera del control de Infantem (fuerza mayor, fallos de terceros, etc.).
  - Uso indebido de la aplicación.
  - Mantenimientos programados anunciados previamente.
  - Problemas derivados de hardware o software del usuario.

  9.8 Modificaciones y Vigencia

  - Este SLA puede ser modificado con previo aviso por correo a los usuarios.
  - Infantem se reserva el derecho de actualizar los términos del SLA para reflejar mejoras en el servicio.
  - Su vigencia comienza en la fecha de aceptación por parte del usuario.

  [Fecha de última actualización del ANS: 02/04/2025]

  10. TERMINACIÓN DEL SERVICIO
  Infantem podría cancelar el plan de un usuario o todo su acceso al sistema si se detecta cualquier uso indebido en la App, incluyendo pero no limitándose a: intentos de vulneración de la seguridad, suplantación de identidad, uso con fines comerciales no autorizados, o cualquier actividad que contravenga estos Términos y Condiciones.

  11. INFORMACIÓN DEL PROVEEDOR
  - Dirección: Escuela Técnica Superior de Ingeniería Informática, Avenida Reina Mercedes, Universidad de Sevilla.
  - Contacto: ispp.g8@gmail.com

  12. MODIFICACIONES
  Infantem se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento, sin necesidad de aviso previo. Cualquier cambio será publicado en esta página y entrará en vigor inmediatamente después de su publicación. El uso continuado de la App después de dicha publicación constituye la aceptación de los nuevos términos.

  13. LEY APLICABLE Y JURISDICCIÓN
  Estos Términos y Condiciones se regirán e interpretarán de acuerdo con la legislación española. Cualquier disputa derivada del uso de la App será resuelta ante los tribunales competentes de Sevilla, España.

  14. CONTACTO
  Si tiene alguna pregunta sobre estos Términos y Condiciones, puede ponerse en contacto con nosotros a través de la dirección de correo electrónico: soporte@infantem.com.
  `;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={gs.centeredView}>
        <View style={gs.modalView}>
          <Text style={gs.modalTitle}>Términos y condiciones</Text>

          <ScrollView style={gs.scrollView}>
            <Text style={gs.termsText}>
              {termsContent}
            </Text>
          </ScrollView>

          <View style={gs.buttonContainer}>
            <TouchableOpacity
              style={[gs.button, gs.buttonClose]}
              onPress={onClose}
            >
              <Text style={gs.buttonTextStyle}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default TermsConditionsModal;
