import React, { useState, useCallback } from 'react';
import {
    Modal,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';


const UploadImageModal = ({
    visible,
    onGalleryPress,
    onDeletePress,
    onClose
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const gs = require("../static/styles/globalStyles");

    const includeExtra = true;

    interface Action {
        title: string;
        type: 'capture' | 'library';
        options: CameraOptions | ImageLibraryOptions;
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={gs.centeredView}>
                <View style={gs.modalView}>
                    <Text style={gs.modalTitle}>Subir imagen</Text>
                    <View style={[gs.imageButtonsContainer, { marginBottom: 15 }]}>
                        <TouchableOpacity
                            style={gs.imageButton}
                            onPress={() => onGalleryPress()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none" /><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                            <Text style={gs.imageButtonTextStyle}>Galería</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={gs.imageDeleteButton}
                            onPress={() => onDeletePress()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0512"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                            <Text style={gs.imageDeleteButtonTextStyle}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={gs.buttonContainer}>
                        <TouchableOpacity
                            style={[gs.button, gs.buttonClose]}
                            onPress={onClose}
                        >
                            <Text style={gs.buttonTextStyle}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default UploadImageModal;
