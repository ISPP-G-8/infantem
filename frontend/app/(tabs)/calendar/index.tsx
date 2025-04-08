import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useAuth } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native"; // Importa el hook de navegación

const gs = require("../../../static/styles/globalStyles");

const CalendarTab = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]); // Inicializar con la fecha actual
  const [currentMonth, setCurrentMonth] = useState<string>(new Date().toISOString().split("T")[0]); // Estado para el mes visible
  const [events, setEvents] = useState<{ [key: string]: { [babyId: string]: string[] } }>({});
  const [monthGeneralInfo, setMonthGeneralInfo] = useState<{ [key: string]: { [babyId: string]: string[] } }>({});
  const [babies, setBabies] = useState<{ [babyId: string]: string }>({}); // Estado para almacenar los nombres de los bebés
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();
  const navigation = useNavigation(); // Obtén el objeto de navegación

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // Manejar la selección de un día en el calendario
  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    fetchDailyEvents(day.dateString); // Llamada para obtener los eventos del día seleccionado
  };

  // Obtener los eventos del calendario desde el backend
  const fetchDailyEvents = async (day: string) => {
    try {
      setLoading(true);

      if (!token) {
        console.error("No se encontró el token JWT");
        return;
      }

      const url = `${apiUrl}/api/v1/calendar/${day}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los eventos del día");
      }

      const data = await response.json();

      // Transformar los datos en un formato adecuado para el estado
      const transformedEvents: { [key: string]: { [babyId: string]: any } } = {};
      data.forEach((baby: any) => {
        if (!transformedEvents[day]) {
          transformedEvents[day] = {};
        }
        transformedEvents[day][baby.babyId] = {
          dreams: baby.dreams || [],
          diseases: baby.diseases || [],
          vaccines: baby.vaccines || [],
          intakes: baby.intakes || [],
          metrics: baby.metrics || [],
        };
      });

      setEvents((prevEvents) => ({ ...prevEvents, ...transformedEvents }));
    } catch (error) {
      console.error("Error al obtener los eventos del día:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyEvents = async (month: number, year: number) => {
    try {
      setLoading(true);
  
      if (!token) {
        console.error("No se encontró el token JWT");
        return;
      }
  
      const url = `${apiUrl}/api/v1/calendar?month=${month}&year=${year}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener los eventos del mes");
      }
  
      const data = await response.json();


      const auxiliarMap: { [key: string]: { [babyId: string]: string[] } } = {};
      // TODO: Here an interface/type of the baby is needed (TypeScript)
      data.forEach((baby) => {
        const babyId = baby.babyId;

        Object.entries(baby.events).forEach(([date, eventList]) => {
          if (!auxiliarMap[date]) {
            auxiliarMap[date] = {};
          }
          // Check ts too
          auxiliarMap[date][babyId] = eventList;
        });
      });
      setMonthGeneralInfo(auxiliarMap);


      const transformedEvents: { [key: string]: { [babyId: string]: any } } = {};
      data.forEach((event: any) => {
        const day = event.date; // Asegúrate de que `date` sea el formato YYYY-MM-DD
        if (!transformedEvents[day]) {
          transformedEvents[day] = {};
        }
        transformedEvents[day][event.babyId] = {
          dreams: event.dreams || [],
          diseases: event.diseases || [],
          vaccines: event.vaccines || [],
          intakes: event.intakes || [],
          metrics: event.metrics || [],
        };
      });

      setEvents(transformedEvents);

    } catch (error) {
      console.error("Error al obtener los eventos del mes:", error);
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
      fetchBabies(); // Cargar los datos de los bebés
      fetchDailyEvents(selectedDate); // Cargar los eventos del día actual
    }
  }, [token]);

  useEffect(() => {
  }, [events]);

  useEffect(() => {
    if (token) {
      const currentDate = new Date(currentMonth);
      const month = currentDate.getMonth() + 1; // Los meses en JavaScript son 0-indexados
      const year = currentDate.getFullYear();
      fetchMonthlyEvents(month, year); // Cargar los eventos del mes actual
    }
  }, [token, currentMonth]);

  const getEventIcons = (day: string) => {
    const dayEvents = monthGeneralInfo[day];
    if (!dayEvents) return null;

    const icons: string[] = [];

    const allEvents = Object.values(dayEvents).flat(); 

    if (allEvents.includes("Dream")) {
      icons.push("💤"); 
    }
    if (allEvents.includes("Disease")) {
      icons.push("🤒");
    }
    if (allEvents.includes("Vaccine")) {
      icons.push("💉"); 
    }
    if (allEvents.includes("Intake")) {
      icons.push("🍴");
    }
    if (allEvents.includes("Metric")) {
      icons.push("📏"); 
    }

    return icons.join(" ");
  };

  const navigateToBabyTab = () => {
    navigation.navigate("baby"); // Reemplaza "BabyTab" con el nombre exacto de la pestaña de bebés en tu configuración de navegación
  };

  // Renderizar el componente del calendario
  const renderCalendar = () => {
    const markedDates = {
      ...Object.keys(events).reduce((acc, date) => {
        acc[date] = {
          marked: true,
          selected: date === selectedDate,
          selectedColor: "#00adf5",
          customStyles: {
            container: {
              backgroundColor: "#E3F2FD", // Fondo del día
            },
            text: {
              color: "#003366", // Color del texto
            },
          },
          icon: getEventIcons(date), // Agregar los iconos descriptivos
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
                  color: "#003366",
                },
              },
            },
          }
        : {}),
    };


    return (
      <View style={[gs.card, { maxWidth: 600, padding: 10 }]}>
        <View style={{ flexDirection: "row", marginBottom: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#00adf5",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              marginLeft: 5,
              marginTop: 5,
            }}
            onPress={navigateToBabyTab} // Llama a la función de navegación
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Añadir metricas de tamaños</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#00adf5",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              marginLeft: 5,
              marginTop: 5,
            }}
            onPress={() => {
              navigation.navigate("addSleep"); // Navegar a la pestaña Sleep con la fecha seleccionada
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Añadir sueños</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#00adf5",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              marginLeft: 5,
              marginTop: 5,
            }}
            onPress={() => {
              // Navegar a la pestaña de creación de métricas de enfermedades
              navigateToDiseaseMetricsTab(); // Reemplaza con la función correspondiente
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Añadir enfermedades</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#00adf5",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              marginLeft: 5,
              marginTop: 5,
            }}
            onPress={() => {
              // Navegar a la pestaña de creación de métricas de vacunas
              navigateToVaccineMetricsTab(); // Reemplaza con la función correspondiente
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Añadir vacunas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#00adf5",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              marginLeft: 5,
              marginTop: 5,
            }}
            onPress={() => {
              // Navegar a la pestaña de creación de métricas de ingestas
              navigateToIntakeMetricsTab(); // Reemplaza con la función correspondiente
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Añadir ingestas</Text>
          </TouchableOpacity>
        </View>
        <Calendar
          current={currentMonth}
          onDayPress={handleDayPress}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#003366",
            todayTextColor: "#00adf5",
            arrowColor: "#00adf5",
            textDayFontWeight: "bold",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "bold",
          }}
          onMonthChange={(month) => {
            setCurrentMonth(month.dateString);
          }}
          renderHeader={(date) => (
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1565C0" }}>
              {date.toString("MMMM yyyy")}
            </Text>
          )}
          dayComponent={({ date, state }) => {
            const icons = getEventIcons(date.dateString); // Obtener los iconos para el día actual
            return (
              <TouchableOpacity
                onPress={() => handleDayPress({ dateString: date.dateString })}
                style={{ alignItems: "center" }}
              >
                <Text
                  style={{
                    color: state === "disabled" ? "gray" : "black",
                    fontWeight: date.dateString === selectedDate ? "bold" : "normal",
                  }}
                >
                  {date.day}
                </Text>
                {icons && (
                  <Text style={{ fontSize: 10, marginTop: 2 }}>{icons}</Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  // Renderizar la información del día seleccionado
  const renderSelectedDateInfo = () => {

    return (
      <View style={[gs.card, { maxWidth: 600, padding: 10 }]}>
        {selectedDate ? (
          <View>
            <Text style={[gs.headerText, { textAlign: "center", color: "#1565C0", marginBottom: 10 }]}>
              Información del día {selectedDate}:
            </Text>
            {events[selectedDate] ? (
              Object.keys(events[selectedDate]).map((babyId) => (
                <View key={babyId} style={{ marginTop: 20 }}>
                  {/* Nombre del bebé */}
                  <Text style={[gs.bodyText, { fontWeight: "bold", color: "#1565C0", fontSize: 18 }]}>
                    {babies[babyId] || `Bebé desconocido (${babyId})`}:

                  </Text>
                    {/* Sueños */}
                    {events[selectedDate][babyId].dreams.length > 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={[gs.bodyText, { fontWeight: "bold", marginBottom: 5 }]}>Sueños:</Text>
                      {events[selectedDate][babyId].dreams.map((dream: any, index: number) => {
                      // Convertir dateStart y dateEnd a objetos Date
                      const startDate = dream.dateStart ? new Date(dream.dateStart[0], dream.dateStart[1] - 1, ...dream.dateStart.slice(2)) : null;
                      const endDate = dream.dateEnd ? new Date(dream.dateEnd[0], dream.dateEnd[1] - 1, ...dream.dateEnd.slice(2)) : null;
                  
                        return (
                          <Text key={index} style={[gs.bodyText, { marginLeft: 10 }]}>
                            - Tipo: {dream.dreamType}, Despertadas: {dream.numWakeups}, Inicio:{" "}
                            {startDate ? startDate.toLocaleString() : "No especificado"}, Fin:{" "}
                            {endDate ? endDate.toLocaleString() : "No especificado"}
                          </Text>
                        );
                      })}
                    </View>
                  )}

                  {/* Enfermedades */}
                  {events[selectedDate][babyId].diseases.length > 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={[gs.bodyText, { fontWeight: "bold", marginBottom: 5 }]}>Enfermedades:</Text>
                      {events[selectedDate][babyId].diseases.map((disease: any, index: number) => (
                        <Text key={index} style={[gs.bodyText, { marginLeft: 10 }]}>
                          - {disease.name}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Vacunas */}
                  {events[selectedDate][babyId].vaccines.length > 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={[gs.bodyText, { fontWeight: "bold", marginBottom: 5 }]}>Vacunas:</Text>
                      {events[selectedDate][babyId].vaccines.map((vaccine: any, index: number) => (
                        <Text key={index} style={[gs.bodyText, { marginLeft: 10 }]}>
                          - {vaccine.type}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Intakes (Ingestas) */}
                  {events[selectedDate][babyId].intakes.length > 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={[gs.bodyText, { fontWeight: "bold", marginBottom: 5 }]}>Ingestas:</Text>
                      {events[selectedDate][babyId].intakes.map((intake: any, index: number) => (
                        <View key={index} style={{ marginLeft: 10 }}>
                          
                          <Text style={[gs.bodyText]}>
                            Recetas: {intake.recipeNames && intake.recipeNames.length > 0
                              ? intake.recipeNames.join(", ")
                              : "No especificadas"}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Métricas */}
                  {events[selectedDate][babyId].metrics.length > 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={[gs.bodyText, { fontWeight: "bold", marginBottom: 5 }]}>Métricas:</Text>
                      {events[selectedDate][babyId].metrics.map((metric: any, index: number) => (
                        <Text key={index} style={[gs.bodyText, { marginLeft: 10 }]}>
                          - Peso: {metric.weight} kg, Altura: {metric.height} cm, Perímetro cefálico: {metric.headCircumference} cm
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))
            ) : (
              <Text style={[gs.bodyText, { textAlign: "center", color: "#1565C0" }]}>
                No hay información para el día seleccionado.
              </Text>
            )}
          </View>
        ) : (
          <Text style={[gs.bodyText, { textAlign: "center", color: "#1565C0" }]}>
            Selecciona un día para ver información
          </Text>
        )}
      </View>
    );
  };

  // Renderizar el contenido principal
  const renderContent = () => (
    <ImageBackground
      style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#E3F2FD" }}
      imageStyle={{ resizeMode: "cover", opacity: 0.9 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 20 }}
      >
        <Text
          style={{
            color: "#1565C0",
            fontSize: 36,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Calendario
        </Text>
        <Text style={[gs.bodyText, { textAlign: "center", color: "#1565C0" }]}>
          Selecciona una fecha para ver información
        </Text>
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



