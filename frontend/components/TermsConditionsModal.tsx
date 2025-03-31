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

  7. MODIFICACIONES
  Infantem se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento, sin necesidad de aviso previo. Cualquier cambio será publicado en esta página y entrará en vigor inmediatamente después de su publicación. El uso continuado de la App después de dicha publicación constituye la aceptación de los nuevos términos.

  8. LEY APLICABLE Y JURISDICCIÓN
  Estos Términos y Condiciones se regirán e interpretarán de acuerdo con la legislación española. Cualquier disputa derivada del uso de la App será resuelta ante los tribunales competentes de Sevilla, España.

  9. CONTACTO  
  Si tiene alguna pregunta sobre estos Términos y Condiciones, puede ponerse en contacto con nosotros a través de la dirección de correo electrónico: soporte@infantem.com.
`
    ;

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
