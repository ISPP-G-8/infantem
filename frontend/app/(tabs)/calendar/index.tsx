import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, ScrollView, ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import { useAuth } from "../../../context/AuthContext";

const gs = require("../../../static/styles/globalStyles");

const CalendarTab = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>(new Date().toISOString().split("T")[0]); // Estado para el mes visible
  const [events, setEvents] = useState<{ [key: string]: { [babyId: string]: string[] } }>({});
  const [babies, setBabies] = useState<{ [babyId: string]: string }>({}); // Estado para almacenar los nombres de los bebés
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // Manejar la selección de un día en el calendario
  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setCurrentMonth(day.dateString); // Actualizar el mes visible al mes del día seleccionado
  };

  // Obtener los eventos del calendario desde el backend
  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);

      if (!token) {
        console.error("No se encontró el token JWT");
        return;
      }

      // Obtener el mes y año actuales
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
      const year = currentDate.getFullYear();

      const response = await fetch(`${apiUrl}/api/v1/calendar?month=${month}&year=${year}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token JWT en las cabeceras
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los eventos del calendario");
      }

      const data = await response.json();

      // Transformar los datos en un formato adecuado para el marcado del calendario
      const transformedEvents: { [key: string]: { [babyId: string]: string[] } } = {};
      data.forEach((calendar: any) => {
        Object.keys(calendar.events).forEach((date) => {
          // Convertir la fecha del backend al formato YYYY-MM-DD
          const formattedDate = new Date(date).toISOString().split("T")[0];
          if (!transformedEvents[formattedDate]) {
            transformedEvents[formattedDate] = {};
          }
          if (!transformedEvents[formattedDate][calendar.babyId]) {
            transformedEvents[formattedDate][calendar.babyId] = [];
          }
          transformedEvents[formattedDate][calendar.babyId] = [
            ...transformedEvents[formattedDate][calendar.babyId],
            ...calendar.events[date],
          ];
        });
      });

      setEvents(transformedEvents);
    } catch (error) {
      console.error("Error al obtener los eventos del calendario:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener los nombres de los bebés desde el backend
  const fetchBabies = async () => {
    try {
      if (!token) {
        console.error("No se encontró el token JWT");
        return;
      }

      const response = await fetch(`${apiUrl}/api/v1/baby`, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token JWT en las cabeceras
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos de los bebés");
      }

      const data = await response.json();

      // Transformar los datos en un formato adecuado para el estado
      const babyMap: { [babyId: string]: string } = {};
      data.forEach((baby: any) => {
        babyMap[baby.id] = baby.name;
      });

      setBabies(babyMap);
    } catch (error) {
      console.error("Error al obtener los datos de los bebés:", error);
    }
  };

  // Obtener los eventos del calendario y los nombres de los bebés cuando se tenga el token JWT
  useEffect(() => {
    if (token) {
      fetchCalendarEvents();
      fetchBabies();
    }
  }, [token]);

  // Renderizar el componente del calendario
  const renderCalendar = () => (
    <View style={[gs.card, { maxWidth:600, padding: 10 }]}>
      <Calendar
        current={currentMonth} // Establecer el mes visible
        onDayPress={handleDayPress}
        markedDates={{
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = {
              marked: true,
              selected: date === selectedDate,
              selectedColor: "#00adf5",
            };
            return acc;
          }, {} as { [key: string]: any }),
          ...(selectedDate
            ? {
                [selectedDate]: {
                  selected: true,
                  selectedColor: "#00adf5",
                  customStyles: {
                    text: {
                      color: "#003366", // Azul oscuro para el día seleccionado
                    },
                  },
                },
              }
            : {}),
        }}
        theme={{
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#003366", // Azul oscuro para el texto del día seleccionado
          todayTextColor: "#00adf5",
          arrowColor: "#00adf5",
          textDayFontWeight: "bold",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "bold",
        }}
        
        onMonthChange={(month) => {
          setCurrentMonth(month.dateString); // Actualizar el mes visible cuando el usuario cambia de mes
        }}
      />
    </View>
  );

  // Renderizar la información del día seleccionado
  const renderSelectedDateInfo = () => (
    <View style={[gs.card, { maxWidth:600, padding: 10 }]}>
      {selectedDate ? (
        <View>
          <Text style={[gs.headerText, { textAlign: "center",color:"#1565C0" }]}>Eventos del día {selectedDate}:</Text>
          {events[selectedDate] ? (
            Object.keys(events[selectedDate]).map((babyId) => (
              <View key={babyId} style={{ marginTop: 10 }}>
                <Text style={[gs.bodyText, { fontWeight: "bold",color:"#1565C0",marginRight: 30 }]}>
                  {babies[babyId] || `Bebé desconocido (${babyId})`}:
                </Text>
                {events[selectedDate][babyId].map((event, index) => (
                  <Text key={index} style={[gs.bodyText, { textAlign: "center",color:"#1565C0" }]}>
                    - {event}
                  </Text>
                ))}
                
              </View>
            ))
          ) : (
            <Text style={[gs.bodyText, { textAlign: "center",color:"#1565C0" }]}>No hay eventos para el día seleccionado.</Text>
          )}
        </View>
      ) : (
        <Text style={[gs.bodyText, { textAlign: "center",color:"#1565C0" }]}>Selecciona un día para ver información</Text>
      )}
    </View>
  );

  // Renderizar el contenido principal
  const renderContent = () => (
    <ImageBackground
      style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#E3F2FD" }}
      imageStyle={{ resizeMode: "cover", opacity: 0.9 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
      <Text style={{ color: "#1565C0", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
      Calendario</Text>
        <Text style={[gs.bodyText, { textAlign: "center",color:"#1565C0" }]}>Selecciona una fecha para ver información</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#00adf5" />
        ) : (
          <>
            {renderCalendar()}
            {renderSelectedDateInfo()}
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );

  return renderContent();
};

export default CalendarTab;



